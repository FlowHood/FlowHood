package org.galactic.flowhood.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String address;

    //    adding one-to-many relations
    @JsonIgnore
    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY)
    private List<Request> requests;

    //   adding many-to-many relations
    @ManyToMany(mappedBy = "houses")
    private List<User> residents;

    //   adding one-to-many relations
    @ManyToOne(fetch = FetchType.EAGER)
    private User responsible;

    @Column(nullable = false)
    private Boolean active;

    public House(String address) {
        this.address = address;
        this.requests = null;
        this.residents = null;
        this.responsible = null;
        this.active = true;
    }
}
