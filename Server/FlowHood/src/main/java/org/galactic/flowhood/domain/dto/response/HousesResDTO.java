package org.galactic.flowhood.domain.dto.response;

import lombok.Data;
import org.galactic.flowhood.domain.entities.User;

import java.util.List;

@Data
public class HousesResDTO {
    private String id;
    private String address;
    private User responsible;
    private List<User> residents;
}
