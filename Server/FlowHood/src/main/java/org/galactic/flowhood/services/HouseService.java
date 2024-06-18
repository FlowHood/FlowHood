package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface HouseService {

    House createHouse(House house);

    House getHouseById(UUID id);

    void deleteHouse(House house);

    List<House> getAllHouses();

    House addResponsible(User user, House house);

    House addResidents(List<User> users, House house);

    List<House> getHousesByResponsible(User user);

    List<House> getHousesByResident(User user);

    House updateHouse(House house);
}
