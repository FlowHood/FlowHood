package org.galactic.flowhood.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterDTO {
    private String name;
    private String lastname;
    private String email;
    private String picture;
}
