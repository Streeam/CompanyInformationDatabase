package com.streeam.cid.repository;
import com.streeam.cid.domain.LongTermAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the LongTermAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LongTermActionRepository extends JpaRepository<LongTermAction, Long> {

    Optional<LongTermAction> findOneByNonConformanceId(Long id);
}
