package org.galactic.flowhood.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String lastname;
    private String email;

    //adding one-to-many relations
    @JsonIgnore
    @OneToMany(mappedBy = "resident", fetch = FetchType.LAZY)
    private List<Request> createdRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "visitor", fetch = FetchType.LAZY)
    private List<Request> request;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Token> tokens;

    //adding many-to-many relations
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "permissions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "owner",
            joinColumns = @JoinColumn(name = "user_id"),
           inverseJoinColumns = @JoinColumn(name = "house_id")
    )
    private List<House> houses;
}
