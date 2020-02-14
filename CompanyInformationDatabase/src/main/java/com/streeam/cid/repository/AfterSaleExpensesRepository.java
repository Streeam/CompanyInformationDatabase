package com.streeam.cid.repository;
import com.streeam.cid.domain.AfterSaleExpenses;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the AfterSaleExpenses entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AfterSaleExpensesRepository extends JpaRepository<AfterSaleExpenses, Long> {

    List<AfterSaleExpenses> findAllByCustomerNonConformanceId(Long customerId);
}
