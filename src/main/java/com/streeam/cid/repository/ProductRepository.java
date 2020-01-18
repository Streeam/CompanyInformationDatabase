package com.streeam.cid.repository;

import com.streeam.cid.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Product entity.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select distinct product from Product product left join fetch product.boms left join fetch product.routings",
        countQuery = "select count(distinct product) from Product product")
    Page<Product> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct product from Product product left join fetch product.boms left join fetch product.routings")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.boms left join fetch product.routings where product.id =:id")
    Optional<Product> findOneWithEagerRelationships(@Param("id") Long id);

    Optional<Product> findOneByPartNumber(String partNumber);
}
