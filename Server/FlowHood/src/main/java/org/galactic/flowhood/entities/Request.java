package org.galactic.flowhood.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table
@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Date startDate;
    private Date endDate;
    private String startTime;
    private String endTime;
    private String reason;
    private String status;
    private Date createdAt = Date.from(Instant.now());

    //one to one petitions
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "qr_id", referencedColumnName = "id")
    private QR qr;

    //many to one petitions
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private User resident;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private User visitor;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private House house;
}
