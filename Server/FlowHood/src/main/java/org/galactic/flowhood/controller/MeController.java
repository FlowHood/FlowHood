package org.galactic.flowhood.controller;

import jakarta.validation.Valid;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.dto.response.UserRegisterDTO;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/me")
public class MeController {

    final
    UserService userService;

    public MeController(UserService userService) {
        this.userService = userService;
    }


    //All authenticated user
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> Me() {
        try {
            User user = userService.findUserAuthenticated().toEntity();
            if (user == null)
                return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            return GeneralResponse.builder().status(HttpStatus.OK).data(user).message("found").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //any athenticated user
    @PostMapping("/")
    public ResponseEntity<GeneralResponse> updateMe(@RequestBody @Valid UserRegisterDTO req, BindingResult error){
        try{
            if(error.hasErrors()) return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).data(error.getAllErrors()).getResponse();
            User user = userService.findUserAuthenticated().toEntity();
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            user.setEmail(req.getEmail());
            user.setLastname(req.getLastname());
            user.setName(req.getName());
            userService.updateUser(user);

            return GeneralResponse.builder().status(HttpStatus.OK).message("updated").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<GeneralResponse> deleteMe(){
        try{
            User user = userService.findUserAuthenticated().toEntity();
            if(user == null) return GeneralResponse.builder().message("Not found!").status(HttpStatus.NOT_FOUND).getResponse();
            userService.deleteUser(user);
            return GeneralResponse.builder().status(HttpStatus.OK).message("deleted").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

}