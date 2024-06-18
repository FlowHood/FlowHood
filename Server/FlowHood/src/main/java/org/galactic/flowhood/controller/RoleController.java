package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.RoleReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.services.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin
public class RoleController {

    final
    RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllRoles(){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findRoleById(@PathVariable("_id") String id){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @PostMapping("/")
    public ResponseEntity<GeneralResponse> createRole(@RequestBody RoleReqDTO roleReqDTO){
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("role created").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
