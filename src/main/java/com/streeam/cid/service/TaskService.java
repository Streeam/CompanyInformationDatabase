package com.streeam.cid.service;

import com.streeam.cid.domain.Image;
import com.streeam.cid.domain.Task;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.repository.ImageRepository;
import com.streeam.cid.repository.TaskRepository;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;
import com.streeam.cid.service.dto.ProgressTrackDTO;
import com.streeam.cid.service.dto.TaskDTO;
import com.streeam.cid.service.mapper.TaskMapper;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Task}.
 */
@Service
@Transactional
public class TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    @Autowired
    private ProgressTrackService progressTrackService;
    @Autowired
    private NonConformanceDetailsService nonConformanceDetailsService;
    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageRepository imageRepository;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    /**
     * Save a task.
     *
     * @param taskDTO the entity to save.
     * @return the persisted entity.
     */
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    /**
     * Get all the tasks.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TaskDTO> findAll() {
        log.debug("Request to get all Tasks");
        return taskRepository.findAll().stream()
            .map(taskMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    @Transactional(readOnly = true)
    public List<TaskDTO> findAllByNonconformanceId(Long nonconformaceId) {
        return taskRepository.findAllByNonconformanceId(nonconformaceId).stream()
            .map(taskMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one task by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TaskDTO> findOne(Long id) {
        log.debug("Request to get Task : {}", id);
        return taskRepository.findById(id)
            .map(taskMapper::toDto);
    }

    /**
     * Delete the task by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Task : {}", id);
        List<ProgressTrackDTO> progressTrackDTOList = progressTrackService.findAllByTaskId(id);
        progressTrackDTOList.forEach(progressTrackDTO -> {
            progressTrackService.delete(progressTrackDTO.getId());
        });
        Optional<Image> taskImageFile = imageRepository.findOneByTaskId(id);
        if(taskImageFile.isPresent()) {
            imageService.delete(taskImageFile.get().getId());
        }
        taskRepository.deleteById(id);
    }

    public void deleteAll(List<TaskDTO> taskDTOList) {
        List<Task> taskList = taskMapper.toEntity(taskDTOList);
        taskList.forEach(task -> {
        delete(task.getId());
        });
    }

    public int progressPercentage(final List<TaskDTO> nonConformanceTasks) {
        final int length = nonConformanceTasks.size();
        if (length == 0) {
            return 0;
        } else {
            final int nonConformanceProgress = nonConformanceTasks.stream().map(TaskDTO::getProgress).reduce(0, Integer::sum);
            return (int)(nonConformanceProgress / length);
        }
    }

    public void allocateNonConformancePercentage(Long nonConformanceId) {
        Optional<NonConformanceDetailsDTO> nonConformanceDetailsDTO = nonConformanceDetailsService.findOne(nonConformanceId);
        if (!nonConformanceDetailsDTO.isPresent()) {
            throw new BadRequestAlertException("No non-conformance found with this id", "task", "NoNonConformanceId");
        }
        NonConformanceDetailsDTO nonConformanceDTO = nonConformanceDetailsDTO.get();
        List<TaskDTO> nonConformanceTasks = findAllByNonconformanceId(nonConformanceDTO.getId());
        final int nonConformanceProgress = progressPercentage(nonConformanceTasks);

        nonConformanceDTO.setProgress(nonConformanceProgress);
        nonConformanceDetailsService.save(nonConformanceDTO);
    }

    public void allocateNonConformanceCreationPercentage(TaskDTO result) {
        Optional<NonConformanceDetailsDTO> nonConformanceDetailsDTO = nonConformanceDetailsService.findOne(result.getNonconformanceId());
        if (!nonConformanceDetailsDTO.isPresent()) {
            throw new BadRequestAlertException("No non-conformance found with this id", "task", "NoNonConformanceId");
        }
        NonConformanceDetailsDTO nonConformanceDTO = nonConformanceDetailsDTO.get();
        List<TaskDTO> nonConformanceTasks = findAllByNonconformanceId(nonConformanceDTO.getId());
        final int nonConformanceProgress = progressPercentage(nonConformanceTasks);
        if (nonConformanceDTO.getStatus() == Status.COMPLETE) {
            nonConformanceDTO.setStatus(Status.PENDING);
        }
        nonConformanceDTO.setProgress(nonConformanceProgress);
        nonConformanceDetailsService.save(nonConformanceDTO);
    }
    @Transactional(readOnly = true)
    public List<TaskDTO> findAllByEmployeeId(Long currentEmployeeId) {
            return taskRepository.findAllByEmployeeId(currentEmployeeId).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }
}
