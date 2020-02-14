package com.streeam.cid.repository;
import com.streeam.cid.domain.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Supplier entity.
 */
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    @Query(value = "select distinct supplier from Supplier supplier left join fetch supplier.products",
        countQuery = "select count(distinct supplier) from Supplier supplier")
    Page<Supplier> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct supplier from Supplier supplier left join fetch supplier.products")
    List<Supplier> findAllWithEagerRelationships();

    @Query("select supplier from Supplier supplier left join fetch supplier.products where supplier.id =:id")
    Optional<Supplier> findOneWithEagerRelationships(@Param("id") Long id);

}
