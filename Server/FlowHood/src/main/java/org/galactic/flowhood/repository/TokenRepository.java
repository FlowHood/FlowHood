package org.galactic.flowhood.repository;

import org.galactic.flowhood.domain.entities.Token;
import org.galactic.flowhood.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TokenRepository extends JpaRepository<Token, UUID> {

    List<Token> findByUserAndActive(User user, Boolean active);

}
