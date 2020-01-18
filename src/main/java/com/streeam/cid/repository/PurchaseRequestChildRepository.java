package com.streeam.cid.repository;
import com.streeam.cid.domain.PurchaseRequestChild;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PurchaseRequestChild entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseRequestChildRepository extends JpaRepository<PurchaseRequestChild, Long> {

}
