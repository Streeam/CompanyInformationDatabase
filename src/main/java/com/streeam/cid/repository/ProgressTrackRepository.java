package com.streeam.cid.repository;

import com.streeam.cid.domain.ProgressTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProgressTrack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgressTrackRepository extends JpaRepository<ProgressTrack, Long> {

    List<ProgressTrack> findAllByTaskIdOrderByIdAsc(Long taskId);
}
