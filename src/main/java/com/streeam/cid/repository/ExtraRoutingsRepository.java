package com.streeam.cid.repository;
import com.streeam.cid.domain.ExtraRoutings;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ExtraRoutings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtraRoutingsRepository extends JpaRepository<ExtraRoutings, Long> {

    List<ExtraRoutings> findAllByInternalNonConformanceId(Long id);
    List<ExtraRoutings> findAllByCustomerNonConformaceId(Long id);
}
