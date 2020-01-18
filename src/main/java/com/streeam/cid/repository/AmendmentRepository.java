package com.streeam.cid.repository;
import com.streeam.cid.domain.Amendment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Amendment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AmendmentRepository extends JpaRepository<Amendment, Long> {

}
