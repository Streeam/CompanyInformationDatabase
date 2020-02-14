package com.streeam.cid.repository;
import com.streeam.cid.domain.ActionToBeTaken;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the ActionToBeTaken entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionToBeTakenRepository extends JpaRepository<ActionToBeTaken, Long> {

    Optional<ActionToBeTaken> findOneByNonconformanceId(Long nonConformanceId);
}
