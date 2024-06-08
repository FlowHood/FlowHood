package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.repository.RoleRepository;
import org.galactic.flowhood.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleServiceImpl implements RoleService {

    final
    RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void deleteRoleById(String id) {

    }

    @Override
    public List<Role> findAllRole() {
        return null;
    }

    @Override
    public Role findRoleById(String id) {
        return null;
    }
}
