package org.galactic.flowhood.repository;

import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RequestRepository extends JpaRepository<Request, UUID> {
    List<Request> findAllByStatusAndVisitorOrResident(String status, User visitor, User resident);
}