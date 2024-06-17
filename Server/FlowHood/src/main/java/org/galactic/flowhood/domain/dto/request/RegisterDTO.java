package org.galactic.flowhood.domain.dto.request;

import lombok.Data;

@Data
public class RegisterDTO {
    private String name;
    private String lastname;
    private String email;
    private String password;
    private String role;
}
