package org.galactic.flowhood.controller;

import org.galactic.flowhood.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin("*")
public class OwnerController {
    final
    UserService userService;

    public OwnerController(UserService userService) {
        this.userService = userService;
    }
}
