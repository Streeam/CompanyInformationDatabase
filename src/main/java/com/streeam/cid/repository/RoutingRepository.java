package com.streeam.cid.repository;

import com.streeam.cid.domain.Routing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Routing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoutingRepository extends JpaRepository<Routing, Long> {

    List<Routing> findAllByPartNumber(String partNumber);
}
