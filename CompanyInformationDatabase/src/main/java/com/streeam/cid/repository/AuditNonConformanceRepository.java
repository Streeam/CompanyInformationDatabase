package com.streeam.cid.repository;
import com.streeam.cid.domain.AuditNonConformance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AuditNonConformance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuditNonConformanceRepository extends JpaRepository<AuditNonConformance, Long> {

}
