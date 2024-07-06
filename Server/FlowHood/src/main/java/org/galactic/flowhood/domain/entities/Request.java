package org.galactic.flowhood.domain.entities;

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
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Date startDate;
    private Date endDate;

    @Column(nullable = false)
    private String startTime;
    private String endTime;
    private String reason;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Date createdAt;

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

    public Request(Date startDate, Date endDate, String startTime, String endTime, User resident, User visitor, House house) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reason = "Visita solicitada por " + resident.getName() + " " + resident.getLastname() + "para " + visitor.getName() + " " + visitor.getLastname() + " en la casa " + house.getAddress();
        this.status = SystemStates.PENDING.getState();
        this.qr = null;
        this.resident = resident;
        this.visitor = visitor;
        this.house = house;
        this.createdAt = Date.from(Instant.now());
    }

    public Request(Date startDate, Date endDate, String startTime, String endTime, String status, User resident, User visitor, House house) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reason = "Visita solicitada por " + resident.getName() + " " + resident.getLastname() + " para " + visitor.getName() + " " + visitor.getLastname() + " en la casa " + house.getAddress();
        this.status = status;
        this.qr = null;
        this.resident = resident;
        this.visitor = visitor;
        this.house = house;
        this.createdAt = Date.from(Instant.now());
    }    
    
    public Request(Date startDate, String startTime, String reason, User anonymous, House house) {
        this.startDate = startDate;
        this.endDate = startDate;
        this.startTime = startTime;
        this.endTime = startTime;
        this.reason = reason;
        this.status = SystemStates.USED.getState();
        this.qr = null;
        this.resident = anonymous;
        this.visitor = anonymous;
        this.house = house;
        this.createdAt = Date.from(Instant.now());
    }
}
