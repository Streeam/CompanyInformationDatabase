package com.streeam.cid.repository;
import com.streeam.cid.domain.NonConformanceType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NonConformanceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NonConformanceTypeRepository extends JpaRepository<NonConformanceType, Long> {

}
