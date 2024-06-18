package org.galactic.flowhood.domain.dto.response;

import lombok.Data;
import org.galactic.flowhood.domain.entities.User;

import java.util.UUID;

@Data
public class SmallUserResDTO {
    private UUID id;
    private String name;
    private String email;
    private String picture;

    public static SmallUserResDTO fromEntity(User user) {
        SmallUserResDTO userDTO = new SmallUserResDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPicture(user.getPicture());
        return userDTO;
    }
}
