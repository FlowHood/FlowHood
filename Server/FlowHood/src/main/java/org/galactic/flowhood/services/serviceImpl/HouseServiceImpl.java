package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.HouseRepository;
import org.galactic.flowhood.services.HouseService;
import org.galactic.flowhood.services.RoleService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.SystemRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class HouseServiceImpl implements HouseService {
    final
    UserService userService;

    final RoleService roleService;
    final
    HouseRepository houseRepository;

    public HouseServiceImpl(HouseRepository houseRepository, UserService userService, RoleService roleService) {
        this.houseRepository = houseRepository;
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public House createHouse(House house) {
        return houseRepository.save(house);
    }

    @Override
    public House getHouseById(UUID id) {
        return houseRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteHouse(House house) {
        house.setActive(false);
        houseRepository.save(house);
    }

    @Override
    public List<House> getAllHouses() {

        return houseRepository.findAll();
    }

    //Admin only
    @Override
    public House addResponsible(User user, House house) {

        //check if house has no responsible
        if(house.getResponsible() == null) {
            Role role = roleService.findRoleById(SystemRoles.RESPONSIBLE.getRole());
            userService.addRole(user, role);
            house.setResponsible(user);
            houseRepository.save(house);

            //if no responsible, add house to user
            List<House> ownHouses = user.getAdmHouses();
            if (!ownHouses.contains(house)) {
                ownHouses.add(house);
                user.setAdmHouses(ownHouses);
                userService.updateUser(user);
            }
        }

        return house;
    }

    @Override
    public House addResidents(List<User> users, House house) {
        List<User> houseUsers = house.getResidents();
        if (houseUsers == null) {
            houseUsers = new ArrayList<>();
        }

        Role role = roleService.findRoleById(SystemRoles.RESIDENT.getRole());
        for (User user : users) {
            if (!houseUsers.contains(user)) {
                houseUsers.add(user);
                userService.addRole(user, role);
                user.getHouses().add(house);
                userService.updateUser(user);
            }
        }
        house.setResidents(houseUsers);
        houseRepository.save(house);
        return house;
    }

    @Override
    public List<House> getHousesByResponsible(User user) {
        return houseRepository.findAllByResponsible(user);
    }

    //TODO
    @Override
    public List<House> getHousesByResident(User user) {
        return user.getHouses();
    }

    @Override
    public House updateHouse(House house) {
        return houseRepository.save(house);
    }
}
