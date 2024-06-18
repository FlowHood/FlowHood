package org.galactic.flowhood.domain.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.galactic.flowhood.domain.entities.House;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class SmallHousesResDTO {
    private UUID id;
    private String address;
    private Boolean active;
    private SmallUserResDTO responsible;
    private List<SmallUserResDTO> residents;

    public static SmallHousesResDTO fromEntity(House house) {
        SmallHousesResDTO houseDTO = new SmallHousesResDTO();
        houseDTO.setId(house.getId());
        houseDTO.setAddress(house.getAddress());
        houseDTO.setActive(house.getActive());
        if (house.getResponsible() != null) {
            houseDTO.setResponsible(SmallUserResDTO.fromEntity(house.getResponsible()));
        }
        if (house.getResidents() != null) {
            houseDTO.setResidents(house.getResidents().stream().map(SmallUserResDTO::fromEntity).collect(Collectors.toList()));
        }
        return houseDTO;
    }
}
