package org.galactic.flowhood.domain.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class RequestReqDTO {

    @NotBlank
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String startDate;

    @Nullable
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String endDate = null;

    @NotBlank
    @Pattern(regexp = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$")
    private String startTime;

    @Nullable
    @Pattern(regexp = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]|null$")
    private String endTime = null;

    @Nullable
    private String reason = null;

    @NotBlank
    @Pattern(regexp = "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$")
    private String resident;

    @NotBlank
    @Pattern(regexp = "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$")
    private String visitor;

    @NotBlank
    @Pattern(regexp = "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$")
    private String house;
}
