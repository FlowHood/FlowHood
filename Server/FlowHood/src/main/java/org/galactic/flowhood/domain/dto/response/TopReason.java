package org.galactic.flowhood.domain.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopReason {
    private String reason;
    private int count;
}
