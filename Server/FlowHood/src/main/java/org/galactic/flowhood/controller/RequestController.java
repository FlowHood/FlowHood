package org.galactic.flowhood.controller;

import jakarta.validation.Valid;
import org.galactic.flowhood.domain.dto.request.HouseReqDTO;
import org.galactic.flowhood.domain.dto.request.RequestReqDTO;
import org.galactic.flowhood.domain.dto.request.RequestStateReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.RequestService;
import org.galactic.flowhood.services.RoleService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.SystemRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//TODO
@RestController
@RequestMapping("/api/request")
@CrossOrigin
public class RequestController {
    final
    RequestService requestService;

    final UserService userService;

    final RoleService roleService;

    public RequestController(RequestService requestService, UserService userService, RoleService roleService) {
        this.requestService = requestService;
        this.userService = userService;
        this.roleService = roleService;
    }

    //admin only
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllRequest(){
        try{

            List<Request> requests = requestService.findAllRequests();
            return GeneralResponse.builder().status(HttpStatus.OK).data(requests).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //admin only and authenticated user
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findRequestById(@PathVariable("_id") String id){
        try{
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();
            return GeneralResponse.builder().status(HttpStatus.OK).data(request).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Access on resident and responsible
    @PostMapping("/")
    public ResponseEntity<GeneralResponse> createRequest(@RequestBody @Valid RequestReqDTO req, BindingResult errors){
        //validate if role is vigilant or responsible then request must be automatically approved else it should be pending
        try{
            if (errors.hasErrors())
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("invalid request").data(errors.getAllErrors()).getResponse();
            return GeneralResponse.builder().status(HttpStatus.OK).message("role created").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //check if request is from resident or admin
    @DeleteMapping("/{_id}")
    public ResponseEntity<GeneralResponse> deleteRequest(@PathVariable("_id") String id){
        try{
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            User user = userService.findUserAuthenticated().toEntity();

            Role admRole = roleService.findRoleById(SystemRoles.ADMINISTRATOR.getRole());
            Role resRole = roleService.findRoleById(SystemRoles.RESPONSIBLE.getRole());

            if(user.getRoles().contains(admRole) ||
                    (user.getRoles().contains(resRole) && request.getResident()
                            .getId().equals(user.getId()))){
                requestService.deleteRequest(request);
                return GeneralResponse.builder().status(HttpStatus.OK).message("deleted!").getResponse();
            }

            return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("could not be deleted!").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //TODO
    @PatchMapping("/{_id}") //getting user validation and status of current request
    public ResponseEntity<GeneralResponse> changeStatus(@PathVariable("_id") String id, @RequestBody RequestStateReqDTO req){
        try{
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            request.setStatus(req.getStatus());
            return GeneralResponse.builder().status(HttpStatus.OK).message("status updated").getResponse();
        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
