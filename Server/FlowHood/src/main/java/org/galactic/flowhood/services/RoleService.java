package org.galactic.flowhood.services;


import org.galactic.flowhood.domain.entities.Role;

import java.util.List;

public interface RoleService {
    void deleteRoleById(String id);
    List<Role> findAllRole();
    Role findRoleById(String id);
}
