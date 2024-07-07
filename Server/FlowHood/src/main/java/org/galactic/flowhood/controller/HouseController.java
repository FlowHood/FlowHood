package org.galactic.flowhood.controller;

import jakarta.validation.Valid;
import org.apache.catalina.mapper.Mapper;
import org.galactic.flowhood.domain.dto.request.HouseReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.dto.response.HousesResDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.HouseService;
import org.galactic.flowhood.services.RoleService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.SystemRoles;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/house")
@CrossOrigin
public class HouseController {
    final
    HouseService houseService;

    final UserService userService;

    final RoleService roleService;

    public HouseController(HouseService houseService, UserService userService, RoleService roleService) {
        this.houseService = houseService;
        this.userService = userService;
        this.roleService = roleService;
    }

    //Admin only
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllHouses() {
        try {
            List<House> houses = houseService.getAllHouses();
            List<HousesResDTO> houseDTOs = houses.stream().map(HousesResDTO::fromEntity).toList();
            return GeneralResponse.builder().status(HttpStatus.OK).data(houseDTOs).message("found").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Admin only
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findHouseById(@PathVariable("_id") String id) {
        try {
            UUID _id = UUID.fromString(id);
            House house = houseService.getHouseById(_id);
            if (house == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            HousesResDTO houseDto = HousesResDTO.fromEntity(house);
            return GeneralResponse.builder().status(HttpStatus.OK).data(houseDto).message("found").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Admin only
    @PostMapping("/")
    public ResponseEntity<GeneralResponse> createHouse(@RequestBody @Valid HouseReqDTO req, BindingResult error) {
        try {
            if (error.hasErrors()) {
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).data(error.getAllErrors()).message("invalid request").getResponse();
            }

            House house = new House(req.getAddress());
            house = houseService.createHouse(house);

            if (req.getResponsibleId() != null) {
                User responsible = userService.findUserById(req.getResponsibleId());
                if (responsible != null) {
                    houseService.toggleResposible(responsible, house);
                } else {
                    return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("responsible not found").getResponse();
                }
            }

            if (req.getResidentIds() != null && !req.getResidentIds().isEmpty()) {
                List<User> residents = userService.findUsersByIds(req.getResidentIds());
                if (residents != null && !residents.isEmpty()) {
                    houseService.addResidents(residents, house);
                } else {
                    return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("residents not found").getResponse();
                }
            }

            HousesResDTO houseDTO = HousesResDTO.fromEntity(house);
            return GeneralResponse.builder().status(HttpStatus.OK).message("house created").data(houseDTO).getResponse();
        } catch (Exception e) {
            System.out.println(e);
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @PutMapping("/{_id}")
    public ResponseEntity<GeneralResponse> updateHouse(
            @PathVariable("_id") String id,
            @RequestBody @Valid HouseReqDTO req,
            BindingResult error) {
        try {
            if (error.hasErrors()) {
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).data(error.getAllErrors()).message("invalid request").getResponse();
            }

            UUID _id = UUID.fromString(id);
            House house = houseService.getHouseById(_id);
            if (house == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();
            }

            // Update address
            house.setAddress(req.getAddress());

            // Update responsible
            if (req.getResponsibleId() != null) {
                User newResponsible = userService.findUserById(req.getResponsibleId());
                if (newResponsible != null) {
                    houseService.toggleResposible(newResponsible, house);
                } else {
                    return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("responsible not found").getResponse();
                }
            } else {
                // Remove current responsible if no responsible is provided
                houseService.toggleResposible(house.getResponsible(), house);
            }

            // Update residents
            List<User> currentResidents = house.getResidents();
            List<User> newResidents = userService.findUsersByIds(req.getResidentIds());

            // Remove residents not in the new list
            for (User resident : currentResidents) {
                if (!newResidents.contains(resident)) {
                    houseService.toggleResident(resident, house);
                }
            }

            // Add new residents
            for (User resident : newResidents) {
                if (!currentResidents.contains(resident)) {
                    houseService.toggleResident(resident, house);
                }
            }

            house = houseService.updateHouse(house);
            HousesResDTO houseDTO = HousesResDTO.fromEntity(house);
            return GeneralResponse.builder().status(HttpStatus.OK).message("house updated").data(houseDTO).getResponse();
        } catch (Exception e) {
            System.out.println(e);
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //admin only
    @DeleteMapping("/{_id}")
    public ResponseEntity<GeneralResponse> deleteHouseById(@PathVariable("_id") String id) {
        try {
            UUID _id = UUID.fromString(id);
            House house = houseService.getHouseById(_id);
            if (house == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();
            houseService.deleteHouse(house);
            return GeneralResponse.builder().status(HttpStatus.OK).message("deleted").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //only user responsible
    @GetMapping("/responsible")
    public ResponseEntity<GeneralResponse> findAllByResponsible() {
        try {
            User responsible = userService.findUserAuthenticated().toEntity();
            if (responsible == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            Role role = roleService.findRoleById(SystemRoles.RESPONSIBLE.getRole());
            if (!responsible.getRoles().contains(role))
                return GeneralResponse.builder().status(HttpStatus.FORBIDDEN).message("not allowed").getResponse();


            List<House> houses = houseService.getHousesByResponsible(responsible);
            List<HousesResDTO> houseDTOs = houses.stream().map(HousesResDTO::fromEntity).toList();
            return GeneralResponse.builder().status(HttpStatus.OK).data(houseDTOs).message("found").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //only user residents
    @GetMapping("/resident")
    public ResponseEntity<GeneralResponse> findAllByResident() {
        try {
            User user = userService.findUserAuthenticated().toEntity();
            if (user == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            Role rstUser = roleService.findRoleById(SystemRoles.RESIDENT.getRole());
            if (!user.getRoles().contains(rstUser))
                return GeneralResponse.builder().status(HttpStatus.FORBIDDEN).message("not allowed").getResponse();

            List<House> houses = houseService.getHousesByResident(user);
            if(houses.isEmpty())
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            List<HousesResDTO> houseDTOs = houses.stream().map(HousesResDTO::fromEntity).toList();
            return GeneralResponse.builder().status(HttpStatus.OK).data(houseDTOs).message("found").getResponse();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
