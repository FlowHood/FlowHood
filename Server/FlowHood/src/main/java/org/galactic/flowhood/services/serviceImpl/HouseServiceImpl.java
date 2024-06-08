package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.services.HouseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HouseServiceImpl implements HouseService {
    @Override
    public void createHouse(House house) {

    }

    @Override
    public House getHouseById(UUID id) {
        return null;
    }

    @Override
    public void deleteHouse(UUID id) {

    }

    @Override
    public List<House> getAllHouses() {
        return null;
    }
}
