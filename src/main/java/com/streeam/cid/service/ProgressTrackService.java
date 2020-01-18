package com.streeam.cid.service;

import com.streeam.cid.domain.Image;
import com.streeam.cid.domain.ProgressTrack;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.repository.ImageRepository;
import com.streeam.cid.repository.ProgressTrackRepository;
import com.streeam.cid.service.dto.ProgressTrackDTO;
import com.streeam.cid.service.dto.TaskDTO;
import com.streeam.cid.service.mapper.ProgressTrackMapper;
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
 * Service Implementation for managing {@link ProgressTrack}.
 */
@Service
@Transactional
public class ProgressTrackService {

    private final Logger log = LoggerFactory.getLogger(ProgressTrackService.class);

    @Autowired
    private ImageService imageService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ImageRepository imageRepository;

    private final ProgressTrackRepository progressTrackRepository;

    private final ProgressTrackMapper progressTrackMapper;

    public ProgressTrackService(ProgressTrackRepository progressTrackRepository, ProgressTrackMapper progressTrackMapper) {
        this.progressTrackRepository = progressTrackRepository;
        this.progressTrackMapper = progressTrackMapper;
    }

    /**
     * Save a progressTrack.
     *
     * @param progressTrackDTO the entity to save.
     * @return the persisted entity.
     */
    public ProgressTrackDTO save(ProgressTrackDTO progressTrackDTO) {
        log.debug("Request to save ProgressTrack : {}", progressTrackDTO);
        ProgressTrack progressTrack = progressTrackMapper.toEntity(progressTrackDTO);
        progressTrack = progressTrackRepository.save(progressTrack);
        return progressTrackMapper.toDto(progressTrack);
    }

    /**
     * Get all the progressTracks.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProgressTrackDTO> findAll() {
        log.debug("Request to get all ProgressTracks");
        return progressTrackRepository.findAll().stream()
            .map(progressTrackMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one progressTrack by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProgressTrackDTO> findOne(Long id) {
        log.debug("Request to get ProgressTrack : {}", id);
        return progressTrackRepository.findById(id)
            .map(progressTrackMapper::toDto);
    }

    /**
     * Delete the progressTrack by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProgressTrack : {}", id);
        Optional<Image> progressTrackFile = imageRepository.findOneByProgressTrackId(id);
        if(progressTrackFile.isPresent()) {
            imageService.delete(progressTrackFile.get().getId());
        }
        progressTrackRepository.deleteById(id);
    }

    public List<ProgressTrackDTO> findAllByTaskId(Long taskId) {
        return progressTrackRepository.findAllByTaskIdOrderByIdAsc(taskId).stream()
            .map(progressTrackMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    public int progressPercentage(List<ProgressTrackDTO> tasksProgressTracks) {
        final int length = tasksProgressTracks.size();
        if (length == 0) {
        return 0;
        } else {
            final int completed = (int) tasksProgressTracks.stream().filter(progressTrackDTO -> progressTrackDTO.isComplete()).count();

            return (int)((completed * 100) / length);
        }
    }
    public void allocateTaskPercentage(Long taskId) {
        Optional<TaskDTO> task = taskService.findOne(taskId);
        if (!task.isPresent()) {
            throw new BadRequestAlertException("No task found with this id", "progressTrack", "taskIdNotExists");
        }
        TaskDTO taskToSave = task.get();
        List<ProgressTrackDTO> progressTrackDTOList = findAllByTaskId(taskToSave.getId());
        final int taskProgress = progressPercentage(progressTrackDTOList);
        if (taskProgress == 100) {
            taskToSave.setStatus(Status.COMPLETE);
        }

        taskToSave.setProgress(taskProgress);
        taskService.save(taskToSave);
    }

    public List<ProgressTrackDTO> findAllByEmployee(Long id) {
        List<TaskDTO> employeesTasks = taskService.findAllByEmployeeId(id);
        final List<ProgressTrackDTO> result = new LinkedList<>();

        employeesTasks.forEach(taskDTO -> {
            findAllByTaskId(taskDTO.getId()).forEach(result::add);
        });
        return result;
    }
}
