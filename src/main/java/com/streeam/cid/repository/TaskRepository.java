package com.streeam.cid.repository;

import com.streeam.cid.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByNonconformanceId(Long nonconformaceId);

    List<Task> findAllByEmployeeId(Long currentEmployeeId);
}
