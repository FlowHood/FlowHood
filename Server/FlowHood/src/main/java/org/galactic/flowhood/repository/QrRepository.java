package org.galactic.flowhood.repository;

import org.galactic.flowhood.domain.entities.QR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QrRepository extends JpaRepository<QR, UUID>{
}
