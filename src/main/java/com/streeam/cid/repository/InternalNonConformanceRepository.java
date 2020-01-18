package com.streeam.cid.repository;
import com.streeam.cid.domain.InternalNonConformance;
import com.streeam.cid.domain.enumeration.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the InternalNonConformance entity.
 */
@Repository
public interface InternalNonConformanceRepository extends JpaRepository<InternalNonConformance, Long> {

    @Query(value = "select distinct internalNonConformance from InternalNonConformance internalNonConformance left join fetch internalNonConformance.employees",
        countQuery = "select count(distinct internalNonConformance) from InternalNonConformance internalNonConformance")
    Page<InternalNonConformance> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct internalNonConformance from InternalNonConformance internalNonConformance left join fetch internalNonConformance.employees")
    List<InternalNonConformance> findAllWithEagerRelationships();

    @Query("select internalNonConformance from InternalNonConformance internalNonConformance left join fetch internalNonConformance.employees where internalNonConformance.id =:id")
    Optional<InternalNonConformance> findOneWithEagerRelationships(@Param("id") Long id);

    List<InternalNonConformance>  findAllByNonconformanceDetailsId(Long nonconformanceDetailsId);

    Optional<InternalNonConformance> findOneByNonconformanceDetailsIdAndStatus(Long nonconformanceDetailsId, Status incomplete);
}
