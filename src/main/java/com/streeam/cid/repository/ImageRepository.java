package com.streeam.cid.repository;
import com.streeam.cid.domain.Image;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Image entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findOneByProgressTrackId(Long id);

    Optional<Image> findOneByTaskId(Long id);
}
