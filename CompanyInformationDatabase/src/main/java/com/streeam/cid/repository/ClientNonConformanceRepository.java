package com.streeam.cid.repository;
import com.streeam.cid.domain.ClientNonConformance;
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
 * Spring Data  repository for the ClientNonConformance entity.
 */
@Repository
public interface ClientNonConformanceRepository extends JpaRepository<ClientNonConformance, Long> {

    @Query(value = "select distinct clientNonConformance from ClientNonConformance clientNonConformance left join fetch clientNonConformance.culpableEmployees",
        countQuery = "select count(distinct clientNonConformance) from ClientNonConformance clientNonConformance")
    Page<ClientNonConformance> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct clientNonConformance from ClientNonConformance clientNonConformance left join fetch clientNonConformance.culpableEmployees")
    List<ClientNonConformance> findAllWithEagerRelationships();

    @Query("select clientNonConformance from ClientNonConformance clientNonConformance left join fetch clientNonConformance.culpableEmployees where clientNonConformance.id =:id")
    Optional<ClientNonConformance> findOneWithEagerRelationships(@Param("id") Long id);

    Optional<ClientNonConformance> findOneByNonconformanceDetailsIdAndStatus(Long nonconformanceDetailsid, Status incomplete);

    List<ClientNonConformance> findAllByNonconformanceDetailsId(Long nonconformanceDetailsId);
}
