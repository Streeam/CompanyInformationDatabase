package com.streeam.cid.repository;
import com.streeam.cid.domain.Drawing;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Drawing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DrawingRepository extends JpaRepository<Drawing, Long> {

}
