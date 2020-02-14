package com.streeam.cid.repository;
import com.streeam.cid.domain.SupplierNonConformance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SupplierNonConformance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplierNonConformanceRepository extends JpaRepository<SupplierNonConformance, Long> {

}
