package org.galactic.flowhood.controller;

import jakarta.validation.Valid;
import org.galactic.flowhood.domain.dto.request.LoginReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.dto.response.TokenResDTO;
import org.galactic.flowhood.domain.dto.response.UserRegisterDTO;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.Token;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.RoleService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.SystemRoles;
import org.modelmapper.ModelMapper;
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

    final ModelMapper mapper;

    final RoleService roleService;

    public AuthController(UserService userService, ModelMapper mapper, RoleService roleService) {
        this.userService = userService;
        this.mapper = mapper;
        this.roleService = roleService;
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse> login(@RequestBody @Valid LoginReqDTO req){

        try {

            UserRegisterDTO user = userService.getUserInformation(req.getToken());
            if(!userService.existUserByEmail(user.getEmail())){
                Role role = roleService.findRoleById(SystemRoles.VISITOR.getRole());
                List<Role> roles = new ArrayList<>();
                roles.add(role);

                User newUser = new User(user.getName(), user.getLastname(), user.getEmail());
                newUser.setRoles(roles);
                userService.createUser(newUser);
            }

            User res = userService.findUserByEmail(user.getEmail());
            if(res == null) return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).getResponse();
            Token token = userService.registerToken(res);
            return GeneralResponse.builder().status(HttpStatus.OK).data(new TokenResDTO(token.getContent())).getResponse();
        } catch (Exception e) {
            return GeneralResponse.builder().message(e.getMessage()).status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
