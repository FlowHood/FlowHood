package org.galactic.flowhood.domain.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.User;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class UserResDTO {
    private UUID id;
    private String name;
    private String email;
    private String picture;
    private String lastname;
    private String state;
    private List<Role> roles;
    private List<SmallHousesResDTO> houses;
    private List<SmallHousesResDTO> admHouses;

    public static UserResDTO fromEntity(User user) {
        UserResDTO userDTO = new UserResDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPicture(user.getPicture());
        userDTO.setLastname(user.getLastname());
        userDTO.setState(user.getState());
        userDTO.setRoles(user.getRoles());
        userDTO.setHouses(user.getHouses().stream().map(SmallHousesResDTO::fromEntity).collect(Collectors.toList()));
        userDTO.setAdmHouses(user.getAdmHouses().stream().map(SmallHousesResDTO::fromEntity).collect(Collectors.toList()));
        return userDTO;
    }

    public User toEntity() {
        User user = new User();
        user.setId(this.id);
        user.setName(this.name);
        user.setLastname(this.lastname);
        user.setEmail(this.email);
        user.setPicture(this.picture);
        user.setState(this.state);
        user.setRoles(this.roles);
        return user;
    }
}
