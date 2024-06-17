package org.galactic.flowhood.repository;

import org.galactic.flowhood.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findFirstByEmail(String email);

    boolean existsByEmail(String email);
}
