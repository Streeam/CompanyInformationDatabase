package com.streeam.cid.repository;
import com.streeam.cid.domain.Prototype;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Prototype entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrototypeRepository extends JpaRepository<Prototype, Long> {

}
