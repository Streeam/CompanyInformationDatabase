package com.streeam.cid.repository;
import com.streeam.cid.domain.FishBone;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the FishBone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FishBoneRepository extends JpaRepository<FishBone, Long> {

    Optional<FishBone> findOneByRootCauseId(Long id);

    List<FishBone> findAllByRootCauseId(Long rootCauseId);
}
