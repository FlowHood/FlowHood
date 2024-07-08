package org.galactic.flowhood.controller;

import jakarta.validation.Valid;
import org.galactic.flowhood.domain.dto.request.UpdateUserReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.dto.response.UserRegisterDTO;
import org.galactic.flowhood.domain.dto.response.UserResDTO;
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    final
    UserService userService;

    final RoleService roleService;

    final HouseService houseService;

    public UserController(UserService userService, RoleService roleService, HouseService houseService) {
        this.userService = userService;
        this.roleService = roleService;
        this.houseService = houseService;
    }

    //Admin only
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllUser(){
        try{

            List<UserResDTO> users = userService.findAllUser();
            return GeneralResponse.builder()
                    .status(HttpStatus.OK)
                    .data(users)
                    .message("found")
                    .getResponse();
        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Admin only
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findUserById(@PathVariable("_id") String id){
        try{
            UserResDTO user = userService.findUserByIdDto(UUID.fromString(id));
            if (user == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();
            return GeneralResponse.builder().status(HttpStatus.OK).data(user).message("found").getResponse();
        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Admin only
    @PostMapping("/{_id}")
    public ResponseEntity<GeneralResponse> updateUserById(@PathVariable("_id") String id, @RequestBody @Valid UpdateUserReqDTO req, BindingResult error){
        try{
            if(error.hasErrors()) return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).data(error.getAllErrors()).getResponse();
            UUID userId = UUID.fromString(id);
            User user = userService.findUserById(userId);
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            user.setEmail(req.getEmail());
            user.setLastname(req.getLastname());
            user.setName(req.getName());
            user.setState(req.getState());
            userService.updateUser(user);

            return GeneralResponse.builder().status(HttpStatus.OK).message("updated").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Admin only    
    @DeleteMapping("/{_id}")
    public ResponseEntity<GeneralResponse> deleteUserById(@PathVariable("_id") String id){
        try{
            UUID userId = UUID.fromString(id);
            User user = userService.findUserById(userId);
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            userService.deleteUser(user);
            return GeneralResponse.builder().status(HttpStatus.OK).message("deleted").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //check if this is necessary or could be done in the patch role
    //only for admin
    @PatchMapping("/{_userId}/rol/{_roleId}")
    public ResponseEntity<GeneralResponse> toggleRole(@PathVariable("_userId") String userId, @PathVariable("_roleId") String roleId){
        try{
            UUID _userId = UUID.fromString(userId);
            User user = userService.findUserById(_userId);
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            Role role = roleService.findRoleById(roleId);
            if(role == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();

            userService.toggleRole(user, role.getId());

            return GeneralResponse.builder().status(HttpStatus.OK).message("User role updated").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //only for admin
    @PatchMapping("/{_userId}/house-responsible/{_homeId}")
    public ResponseEntity<GeneralResponse> toggleHouseResponsible(@PathVariable("_userId") String userId, @PathVariable("_homeId") String homeId){
        try{
            User user = userService.findUserById(UUID.fromString(userId));
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            House house = houseService.getHouseById(UUID.fromString(homeId));
            if(house == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            houseService.toggleResposible(user, house);

            return GeneralResponse.builder().status(HttpStatus.OK).message("user set as home responsible").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
    //only for adm and responsible
    @PatchMapping("/{_userId}/house-resident/{_homeId}")
    public ResponseEntity<GeneralResponse> toggleUserResident(@PathVariable("_userId") String userId, @PathVariable("_homeId") String homeId){
        try{
            User user = userService.findUserById(UUID.fromString(userId));
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            House house = houseService.getHouseById(UUID.fromString(homeId));
            if(house == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            houseService.toggleResident(user, house);

            return GeneralResponse.builder().status(HttpStatus.OK).message("user set as home resident").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //only for adm and responsible
    @PatchMapping("/house/{_homeId}")
    public ResponseEntity<GeneralResponse> toggleManyUsers(@PathVariable("_homeId") String homeId, @RequestBody @Valid List<String> usersId, BindingResult error){
        try{
            if (error.hasErrors()) return GeneralResponse.builder().data(error.getAllErrors()).status(HttpStatus.BAD_REQUEST).data(error.getAllErrors()).getResponse();

            House house = houseService.getHouseById(UUID.fromString(homeId));
            if(house == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();

            List<User> users = new ArrayList<>();
            for(String userId : usersId){
                User user = userService.findUserById(UUID.fromString(userId));
                userService.toggleRole(user, SystemRoles.VISITOR.getRole());
                if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
                users.add(user);
            }

            houseService.addResidents(users, house);

            return GeneralResponse.builder().status(HttpStatus.OK).message("user set as home resident").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

}
