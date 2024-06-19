package org.galactic.flowhood.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class RequestReqDTO {

    @NotBlank
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String startDate;
    private String endDate = null;
    private String startTime;
    private String endTime = null;
    private String reason = null;
    private String resident;
    private String visitor;
    private String house;
}
