package com.streeam.cid.repository;
import com.streeam.cid.domain.ProcessAuditChecklist;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProcessAuditChecklist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcessAuditChecklistRepository extends JpaRepository<ProcessAuditChecklist, Long> {

    List<ProcessAuditChecklist> findAllByNonConformanceId(Long nonConformanceId);
}
