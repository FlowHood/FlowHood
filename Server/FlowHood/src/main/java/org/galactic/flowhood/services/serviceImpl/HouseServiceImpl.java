package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.repository.HouseRepository;
import org.galactic.flowhood.services.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HouseServiceImpl implements HouseService {

    final
    HouseRepository houseRepository;

    public HouseServiceImpl(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
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
        houseRepository.delete(house);
    }

    @Override
    public List<House> getAllHouses() {

        return houseRepository.findAll();
    }
}
