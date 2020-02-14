package com.streeam.cid.repository;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.NonConformanceDetails;
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
 * Spring Data  repository for the NonConformanceDetails entity.
 */
@Repository
public interface NonConformanceDetailsRepository extends JpaRepository<NonConformanceDetails, Long> {

    @Query(value = "select distinct nonConformanceDetails from NonConformanceDetails nonConformanceDetails left join fetch nonConformanceDetails.products left join fetch nonConformanceDetails.routings",
        countQuery = "select count(distinct nonConformanceDetails) from NonConformanceDetails nonConformanceDetails")
    Page<NonConformanceDetails> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct nonConformanceDetails from NonConformanceDetails nonConformanceDetails left join fetch nonConformanceDetails.products left join fetch nonConformanceDetails.routings")
    List<NonConformanceDetails> findAllWithEagerRelationships();

    @Query("select nonConformanceDetails from NonConformanceDetails nonConformanceDetails left join fetch nonConformanceDetails.products left join fetch nonConformanceDetails.routings where nonConformanceDetails.id =:id")
    Optional<NonConformanceDetails> findOneWithEagerRelationships(@Param("id") Long id);

    Optional<NonConformanceDetails> findOneByEmployeeAndStatus(Employee employee, Status status);

    List<NonConformanceDetails> findOneByEmployee(Employee currentEmployee);
}
