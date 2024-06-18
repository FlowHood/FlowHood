package org.galactic.flowhood.domain.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class HouseReqDTO {
    @NotEmpty(message = "Address is required")
    private String address;
    private UUID responsibleId;
    private List<UUID> residentIds;
}
