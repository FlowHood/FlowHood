package org.galactic.flowhood.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginReqDTO {
    @NotBlank(message = "Token is required")
    private String token;
}
