package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.RoleReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.services.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin("*")
public class RoleController {

    final
    RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    //Only admin can access this
    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllRoles(){
        try{
            List<Role> roles = roleService.findAllRole();
            return GeneralResponse.builder().data(roles).status(HttpStatus.OK).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Only admin can access this
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findRoleById(@PathVariable("_id") String id){
        try{
            Role role = roleService.findRoleById(id);
            return GeneralResponse.builder().data(role).status(HttpStatus.OK).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //Only admin can access this
    @PostMapping("/")
    public ResponseEntity<GeneralResponse> createRole(@RequestBody RoleReqDTO roleReqDTO){
        try{
            Role role = new Role(roleReqDTO.getId(), roleReqDTO.getName());
            roleService.createRole(role);
            return GeneralResponse.builder().status(HttpStatus.OK).message("role created").getResponse();
        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
