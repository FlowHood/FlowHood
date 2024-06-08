package org.galactic.flowhood.controller;

import jakarta.persistence.GeneratedValue;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.galactic.flowhood.domain.dto.request.LoginReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.dto.response.TokenResDTO;
import org.galactic.flowhood.domain.entities.Token;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    final
    UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse> login(@RequestBody @Valid LoginReqDTO req){

        try {

//            User user = userService.getUserInformation(req.getToken());
//            if(!userService.existUserByEmail(user.getEmail())){
//                List<String> roles = new ArrayList<>();
//                roles.add("VST");
//                userService.createUser(user, roles);
//            }
//
//            User res = userService.findByEmail(user.getEmail());
//            Token token = userService.registerToken(res);
            //token.getContent()
            return GeneralResponse.builder().status(HttpStatus.OK).data(new TokenResDTO("a")).getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
