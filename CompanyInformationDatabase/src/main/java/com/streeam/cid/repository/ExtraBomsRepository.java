package com.streeam.cid.repository;
import com.streeam.cid.domain.ExtraBoms;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ExtraBoms entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtraBomsRepository extends JpaRepository<ExtraBoms, Long> {

    List<ExtraBoms> findAllByInternalNonconformanceId(Long id);
    List<ExtraBoms> findAllByCustomerNonConformaceId(Long id);

}
