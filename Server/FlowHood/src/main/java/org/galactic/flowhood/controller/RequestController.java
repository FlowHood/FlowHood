package org.galactic.flowhood.controller;

import jakarta.validation.Valid;
import org.galactic.flowhood.domain.dto.request.HouseReqDTO;
import org.galactic.flowhood.domain.dto.request.RequestReqDTO;
import org.galactic.flowhood.domain.dto.request.RequestStateReqDTO;
import org.galactic.flowhood.domain.dto.response.*;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.HouseService;
import org.galactic.flowhood.services.RequestService;
import org.galactic.flowhood.services.RoleService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.MapperUtil;
import org.galactic.flowhood.utils.SystemRoles;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/request")
@CrossOrigin
public class RequestController {
    final
    RequestService requestService;

    final UserService userService;

    final RoleService roleService;

    final HouseService houseService;

    final MapperUtil mapper;

    public RequestController(RequestService requestService, UserService userService, RoleService roleService, HouseService houseService, MapperUtil mapper) {
        this.requestService = requestService;
        this.userService = userService;
        this.roleService = roleService;
        this.houseService = houseService;
        this.mapper = mapper;
    }

    //admin only
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllRequest() {
        try {
            User user = userService.findUserAuthenticated().toEntity();
            Role role = roleService.findRoleById(SystemRoles.ADMINISTRATOR.getRole());
            if (!user.getRoles().contains(role))
                return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("You are not authorized to view this content").getResponse();

            List<Request> requests = requestService.findAllRequests();
            List<RequestResDTO> requestResDto = mapper.mapList(requests, RequestResDTO.class);
            return GeneralResponse.builder().status(HttpStatus.OK).data(requestResDto).message("found").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //admin only and authenticated user
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findRequestById(@PathVariable("_id") String id) {
        try {
            Request request = requestService.findRequestById(UUID.fromString(id));
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            User user = userService.findUserAuthenticated().toEntity();

            boolean isUserFromRequest = requestService.isUserFromRequest(user, request);
            Role role = roleService.findRoleById(SystemRoles.ADMINISTRATOR.getRole());
            if (!user.getRoles().contains(role) && !isUserFromRequest)
                return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("You are not authorized to view this content").getResponse();

            RequestResDTO requestResDto = mapper.map(request, RequestResDTO.class);
            return GeneralResponse.builder().status(HttpStatus.OK).data(requestResDto).message("found").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Access for anyone excepts visitors
    @PostMapping("/")
    public ResponseEntity<GeneralResponse> createRequest(@RequestBody @Valid RequestReqDTO req, BindingResult errors) {
        //validate if role is vigilant or responsible then request must be automatically approved else it should be pending
        try {
            if (errors.hasErrors())
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("invalid request").data(errors.getAllErrors()).getResponse();

            House house = houseService.getHouseById(UUID.fromString(req.getHouse()));
            if (house == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("house not found").getResponse();

            User visitor = userService.findUserById(UUID.fromString(req.getVisitor()));
            if (visitor == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("visitor not found").getResponse();

            if (!house.getActive())
                return GeneralResponse.builder().status(HttpStatus.CONFLICT).message("House can not currently accept visits requests").getResponse();

            User resident = userService.findUserAuthenticated().toEntity();

            //Asign current resident rol to handle petition
            String residentRol = SystemRoles.RESPONSIBLE.getRole();
            Role role = roleService.findRoleById(SystemRoles.ADMINISTRATOR.getRole());
            if (resident.getRoles().contains(role))
                residentRol = SystemRoles.ADMINISTRATOR.getRole();

            boolean isValidResident = houseService.isResponsibleFromHouse(resident, house);
            if (isValidResident)
                residentRol = SystemRoles.RESIDENT.getRole();
            if (!house.getResponsible().getEmail().equals(resident.getEmail()) && !isValidResident)
                return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("You can not create requests for this house").getResponse();

            requestService.createRequestHandler(req, house, resident, visitor, residentRol);
            return GeneralResponse.builder().status(HttpStatus.OK).message("request created").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    // Obtener solicitudes de la misma casa del usuario autenticado
    @GetMapping({ "/my-house-requests","/my-house-requests/{houseId}"})
    public ResponseEntity<GeneralResponse> findMyHouseRequests(@PathVariable(value = "houseId", required = false) String houseId) {
        try {
            UserResDTO user = userService.findUserAuthenticated();

            if (houseId != null && !houseId.isEmpty()) {
                House house = houseService.getHouseById(UUID.fromString(houseId));

                if (house == null) {
                    return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("House not found").getResponse();
                }
                // Check if the house exists and if the user is authorized to view requests for this house
                if (user.getHouses().stream().noneMatch(h -> h.getId().equals(house.getId()))) {
                    return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("You are not authorized to view requests for this house").getResponse();
                }

                List<Request> requests = requestService.findRequestsByHouse(house);
                List<RequestResDTO> requestResDto = mapper.mapList(requests, RequestResDTO.class);
                return GeneralResponse.builder().status(HttpStatus.OK).data(requestResDto).message("Requests found for the house").getResponse();
            } else {
                List<SmallHousesResDTO> houses = user.getHouses();
                if (houses == null || houses.isEmpty()) {
                    return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("No houses found for the authenticated user").getResponse();
                }
                List<House> housesEntities = mapper.mapList(houses, House.class);
                List<Request> allRequests = requestService.findAllRequestsByHouses(housesEntities);
                List<RequestResDTO> requestResDto = mapper.mapList(allRequests, RequestResDTO.class);
                return GeneralResponse.builder().status(HttpStatus.OK).data(requestResDto).message("Requests found for all houses").getResponse();
            }
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    // Obtener una sola solicitud por ID del usuario autenticado
    @GetMapping("/my-house/{requestId}")
    public ResponseEntity<GeneralResponse> getRequestById(@PathVariable("requestId") String requestId) {
        try {
            Request request = requestService.findRequestById(UUID.fromString(requestId));
            if (request == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("Request not found").getResponse();
            }

            User user = userService.findUserAuthenticated().toEntity();
            boolean isUserFromRequest = requestService.isUserFromRequest(user, request);
            Role role = roleService.findRoleById(SystemRoles.ADMINISTRATOR.getRole());
            if (!user.getRoles().contains(role) && !isUserFromRequest) {
                return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("You are not authorized to view this request").getResponse();
            }

            RequestResDTO requestResDto = mapper.map(request, RequestResDTO.class);
            return GeneralResponse.builder().status(HttpStatus.OK).data(requestResDto).message("Request found").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }


    //check if request is from resident or admin
    @DeleteMapping("/{_id}")
    public ResponseEntity<GeneralResponse> deleteRequest(@PathVariable("_id") String id) {
        try {
            Request request = requestService.findRequestById(UUID.fromString(id));
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            User user = userService.findUserAuthenticated().toEntity();

            Role admRole = roleService.findRoleById(SystemRoles.ADMINISTRATOR.getRole());
            Role resRole = roleService.findRoleById(SystemRoles.RESPONSIBLE.getRole());

            if (user.getRoles().contains(admRole) ||
                    (user.getRoles().contains(resRole) && request.getResident()
                            .getId().equals(user.getId()))) {
                requestService.deleteRequest(request);
                return GeneralResponse.builder().status(HttpStatus.OK).message("deleted!").getResponse();
            }

            return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("could not be deleted!").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //TODO
    @PatchMapping("/{_id}") //getting user validation and status of current request
    public ResponseEntity<GeneralResponse> changeStatus(@PathVariable("_id") String id, @RequestBody RequestStateReqDTO req) {
        try {
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            request.setStatus(req.getStatus());
            return GeneralResponse.builder().status(HttpStatus.OK).message("status updated").getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
