package org.galactic.flowhood.domain.dto.response;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.domain.entities.User;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestResDTO {
    private UUID id;
    private Date startDate;
    private Date endDate;

    private String startTime;
    private String endTime;
    private String reason;

    private String status;

    private Date createdAt;

    private SmallQRResDTO qr;

    private SmallUserResDTO resident;

    private SmallUserResDTO visitor;

    private SmallHousesResDTO house;
}
