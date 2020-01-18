package com.streeam.cid.web.rest;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.User;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.security.SecurityUtils;
import com.streeam.cid.service.CompanyService;
import com.streeam.cid.service.ProgressTrackService;
import com.streeam.cid.service.TaskService;
import com.streeam.cid.service.dto.ProgressTrackDTO;
import com.streeam.cid.service.dto.TaskDTO;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.ProgressTrack}.
 */
@RestController
@RequestMapping("/api")
public class ProgressTrackResource {

    private final Logger log = LoggerFactory.getLogger(ProgressTrackResource.class);

    private static final String ENTITY_NAME = "progressTrack";
    @Autowired
    private TaskService taskService;

    @Autowired
    private CompanyService companyService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgressTrackService progressTrackService;

    public ProgressTrackResource(ProgressTrackService progressTrackService) {
        this.progressTrackService = progressTrackService;
    }

    /**
     * {@code POST  /progress-tracks} : Create a new progressTrack.
     *
     * @param progressTrackDTO the progressTrackDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new progressTrackDTO, or with status {@code 400 (Bad Request)} if the progressTrack has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/progress-tracks")
    public ResponseEntity<ProgressTrackDTO> createProgressTrack(@Valid @RequestBody ProgressTrackDTO progressTrackDTO) throws URISyntaxException {
        log.debug("REST request to save ProgressTrack : {}", progressTrackDTO);
        if (progressTrackDTO.getId() != null) {
            throw new BadRequestAlertException("A new progressTrack cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (progressTrackDTO.getTaskId() == null) {
            throw new BadRequestAlertException("A new progressTrack must have a task id", ENTITY_NAME, "taskIdNotExists");
        }
        ProgressTrackDTO result = progressTrackService.save(progressTrackDTO);

        Optional<TaskDTO> task = taskService.findOne(result.getTaskId());
        if (!task.isPresent()) {
            throw new BadRequestAlertException("No task found with this id", ENTITY_NAME, "taskIdNotExists");
        }
        TaskDTO taskToSave = task.get();
        List<ProgressTrackDTO> progressTrackDTOList = progressTrackService.findAllByTaskId(taskToSave.getId());
        final int taskProgress = progressTrackService.progressPercentage(progressTrackDTOList);
        if (taskToSave.getStatus() == Status.COMPLETE) {
            taskToSave.setStatus(Status.PENDING);
        }
        taskToSave.setProgress(taskProgress);
        taskService.save(taskToSave);

        taskService.allocateNonConformanceCreationPercentage(taskToSave);

        return ResponseEntity.created(new URI("/api/progress-tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /progress-tracks} : Updates an existing progressTrack.
     *
     * @param progressTrackDTO the progressTrackDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated progressTrackDTO,
     * or with status {@code 400 (Bad Request)} if the progressTrackDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the progressTrackDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/progress-tracks")
    public ResponseEntity<ProgressTrackDTO> updateProgressTrack(@Valid @RequestBody ProgressTrackDTO progressTrackDTO) throws URISyntaxException {
        log.debug("REST request to update ProgressTrack : {}", progressTrackDTO);
        if (progressTrackDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (progressTrackDTO.getTaskId() == null) {
            throw new BadRequestAlertException("A new progressTrack must have a task id", ENTITY_NAME, "taskIdNotExists");
        }
        ProgressTrackDTO result = progressTrackService.save(progressTrackDTO);

        progressTrackService.allocateTaskPercentage(result.getTaskId());
        Long nonConformaceId = taskService.findOne(result.getTaskId()).get().getNonconformanceId();
        taskService.allocateNonConformancePercentage(nonConformaceId);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, progressTrackDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /progress-tracks} : get all the progressTracks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of progressTracks in body.
     */
    @GetMapping("/progress-tracks")
    public List<ProgressTrackDTO> getAllProgressTracks() {
        log.debug("REST request to get all ProgressTracks");
        return progressTrackService.findAll();
    }
    /**
     * {@code GET  /progress-tracks} : get all the progressTracks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of progressTracks in body.
     */
    @GetMapping("/progress-tracks/task/{id}")
    public List<ProgressTrackDTO> getAllTasksProgressTracks(@PathVariable Long id) {
        log.debug("REST request to get all Task's progress tracks");
        return progressTrackService.findAllByTaskId(id);
    }

    /**
     * {@code GET  /progress-tracks} : get all current employee's progressTracks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of progressTracks in body.
     */
    @GetMapping("/progress-tracks/current")
    public List<ProgressTrackDTO> getAllEmployeesProgressTracks() {
        log.debug("REST request to get all Employees's progress tracks");
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = companyService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee currentEmployee = companyService.findEmployeeFromUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));
        return progressTrackService.findAllByEmployee(currentEmployee.getId());
    }

    /**
     * {@code GET  /progress-tracks/:id} : get the "id" progressTrack.
     * @param id the id of the progressTrackDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the progressTrackDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/progress-tracks/{id}")
    public ResponseEntity<ProgressTrackDTO> getProgressTrack(@PathVariable Long id) {
        log.debug("REST request to get ProgressTrack : {}", id);
        Optional<ProgressTrackDTO> progressTrackDTO = progressTrackService.findOne(id);
        return ResponseUtil.wrapOrNotFound(progressTrackDTO);
    }

    /**
     * {@code DELETE  /progress-tracks/:id} : delete the "id" progressTrack.
     *
     * @param id the id of the progressTrackDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/progress-tracks/{id}")
    public ResponseEntity<Void> deleteProgressTrack(@PathVariable Long id) {
        log.debug("REST request to delete ProgressTrack : {}", id);
        ProgressTrackDTO progressTrackDTO = progressTrackService.findOne(id).orElseThrow(() ->
            new BadRequestAlertException("Invalid progress track id", ENTITY_NAME, "InvalidId"));
        Long taskId = progressTrackDTO.getTaskId();
        progressTrackService.delete(id);
        progressTrackService.allocateTaskPercentage(taskId);
        Long nonConformaceId = taskService.findOne(taskId).orElseThrow(() ->
            new BadRequestAlertException("Invalid task id", ENTITY_NAME, "Invalid Task Id")).getNonconformanceId();
        taskService.allocateNonConformancePercentage(nonConformaceId);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

}

