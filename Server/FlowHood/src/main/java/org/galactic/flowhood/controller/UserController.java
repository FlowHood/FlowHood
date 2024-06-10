package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    final
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllUser(){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findUserById(@PathVariable("_id") String id){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @PostMapping("/{_id}")
    public ResponseEntity<GeneralResponse> updateUserById(@PathVariable("_id") String id){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("updated").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @DeleteMapping("/{_id}")
    public ResponseEntity<GeneralResponse> deleteUserById(@PathVariable("_id") String id){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("deleted").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //check if this is necessary or could be done in the patch role
    @PatchMapping("/{_userId}/role/{_roleId}")
    public ResponseEntity<GeneralResponse> toggleRole(@PathVariable("_userId") String userId, @PathVariable("_roleId") String roleId){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("user set as home responsible").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @PatchMapping("/{_userId}/house/{_homeId}")
    public ResponseEntity<GeneralResponse> toggleHouseResponsible(@PathVariable("_userId") String userId, @PathVariable("_homeId") String roleId){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("user set as home responsible").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }


}