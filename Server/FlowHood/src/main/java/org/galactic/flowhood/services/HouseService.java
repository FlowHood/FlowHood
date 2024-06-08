package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Request;

import java.util.List;
import java.util.UUID;

public interface HouseService {

    void createHouse(House house);

    House getHouseById(UUID id);

    void deleteHouse(UUID id);

    List<House> getAllHouses();

}
