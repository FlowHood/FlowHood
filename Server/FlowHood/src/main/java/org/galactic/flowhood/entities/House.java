package org.galactic.flowhood.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String address;

    //    adding one-to-many relations
    @JsonIgnore
    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY)
    private List<Request> requests;

    //   adding many-to-many relations
    @ManyToMany(mappedBy = "houses")
    private List<User> users;
}
