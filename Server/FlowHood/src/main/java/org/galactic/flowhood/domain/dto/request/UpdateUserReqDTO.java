package org.galactic.flowhood.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserReqDTO {
    private String name;
    private String lastname;
    private String email;
    private String picture;
    private String state;
}
