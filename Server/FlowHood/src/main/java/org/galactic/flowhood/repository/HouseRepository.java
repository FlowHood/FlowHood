package org.galactic.flowhood.repository;

import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.UUID;

@Repository
public interface HouseRepository extends JpaRepository<House, UUID> {
    List<House> findAllByResponsible(User responsible);
    List<House> findAllByResidentsContaining(User resident);

}
