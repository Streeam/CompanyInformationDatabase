package com.streeam.cid.repository;
import com.streeam.cid.domain.ShortTermAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the ShortTermAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShortTermActionRepository extends JpaRepository<ShortTermAction, Long> {

    Optional<ShortTermAction> findOneByNonConformanceId(Long id);
}
