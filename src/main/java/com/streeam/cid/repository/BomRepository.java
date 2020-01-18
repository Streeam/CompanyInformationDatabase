package com.streeam.cid.repository;

import com.streeam.cid.domain.Bom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Bom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BomRepository extends JpaRepository<Bom, Long> {

    List<Bom> findAllByPartNumber(String partNumber);
}
