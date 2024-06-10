package org.galactic.flowhood.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.galactic.flowhood.utils.SystemStates;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table
@Entity
public class QR {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String status;
    private Date lastUpdate;

    @JsonIgnore
    @OneToOne(mappedBy = "qr")
    private Request request;

    public QR(Request request) {
        this.status = SystemStates.PENDING.getState();
        this.lastUpdate = Date.from(Instant.now());
        this.request = request;
    }
}
