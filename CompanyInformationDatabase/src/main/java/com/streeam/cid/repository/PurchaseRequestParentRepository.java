package com.streeam.cid.repository;
import com.streeam.cid.domain.PurchaseRequestParent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PurchaseRequestParent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseRequestParentRepository extends JpaRepository<PurchaseRequestParent, Long> {

}
