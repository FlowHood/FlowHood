package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.HouseRepository;
import org.galactic.flowhood.services.HouseService;
import org.galactic.flowhood.services.RoleService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.SystemRoles;
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
    public House toggleResposible(User user, House house) {

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
        else {
            //if house has responsible, remove house from user
            List<House> ownHouses = user.getAdmHouses();
            if (ownHouses.contains(house)) {
                ownHouses.remove(house);
                user.setAdmHouses(ownHouses);
                userService.updateUser(user);
            }
            house.setResponsible(null);
            houseRepository.save(house);
            //remove responsible role from user
        }

        return house;
    }

    @Override
    public House addResidents(List<User> users, House house) {
        List<User> residentsInHouse = house.getResidents();
        if (residentsInHouse == null)
            residentsInHouse = new ArrayList<>();

        Role role = roleService.findRoleById(SystemRoles.RESIDENT.getRole());
        for (User user : users) {
            toggleSingleResident(residentsInHouse, user, house, role);
        }
        return houseRepository.findById(house.getId()).orElse(null);

    }

    @Override
    public House toggleResident(User user, House house) {
        List<User> residentsInHouse = house.getResidents();
        if (residentsInHouse == null)
            residentsInHouse = new ArrayList<>();

        Role role = roleService.findRoleById(SystemRoles.RESIDENT.getRole());
        return toggleSingleResident(residentsInHouse, user, house, role);
    }

    @Override
    public List<House> getHousesByResponsible(User user) {
        return houseRepository.findAllByResponsible(user);
    }

    private House toggleSingleResident(List<User> residentsInHouse, User user, House house, Role role){
        if (!residentsInHouse.contains(user)) {
            residentsInHouse.add(user);
            userService.addRole(user, role);

            if(!user.getHouses().contains(house)){
                List<House> houses = user.getHouses();
                houses.add(house);
                user.setHouses(houses);
                userService.updateUser(user);
            }

        }
        else {
            residentsInHouse.remove(user);

            if(user.getHouses().contains(house)){
                List<House> houses = user.getHouses();
                houses.remove(house);
                user.setHouses(houses);
                userService.updateUser(user);
            }

        }
        house.setResidents(residentsInHouse);
        houseRepository.save(house);

        return house;
    }
    //TODO
    @Override
    public List<House> getHousesByResident(User user) {
        return houseRepository.findAllByResidentsContaining(user);
    }

    @Override
    public boolean isResponsibleFromHouse(User resident, House house) {
        boolean isValidResident = false;
        for(User u : house.getResidents()){
            isValidResident = u.getEmail().equals(resident.getEmail());
            if(isValidResident)
                break;
        }
        return isValidResident;
    }

    @Override
    public House updateHouse(House house) {
        return houseRepository.save(house);
    }
}
