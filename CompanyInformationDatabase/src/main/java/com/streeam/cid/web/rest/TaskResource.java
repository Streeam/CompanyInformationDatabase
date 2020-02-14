package com.streeam.cid.web.rest;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.User;
import com.streeam.cid.domain.enumeration.NotificationType;
import com.streeam.cid.security.SecurityUtils;
import com.streeam.cid.service.*;
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
 * REST controller for managing {@link com.streeam.cid.domain.Task}.
 */
@RestController
@RequestMapping("/api")
public class TaskResource {

    private final Logger log = LoggerFactory.getLogger(TaskResource.class);

    private static final String ENTITY_NAME = "task";


    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskService taskService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private UserService userService;

    @Autowired
    private  NotificationService notificationService;

    @Autowired
    private MailService mailService;

    @Autowired
    private NonConformanceDetailsService nonConformanceDetailsService;

    public TaskResource(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * {@code POST  /tasks} : Create a new task.
     *
     * @param taskDTO the taskDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskDTO, or with status {@code 400 (Bad Request)} if the task has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tasks")
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) throws URISyntaxException {
        log.debug("REST request to save Task : {}", taskDTO);
        if (taskDTO.getId() != null) {
            throw new BadRequestAlertException("A new task cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskDTO result = taskService.save(taskDTO);

        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User currentUser = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() -> new BadRequestAlertException("No user logged in.", ENTITY_NAME, "noUserLogged"));

        Employee from = employeeService.findOneByUser(currentUser).orElseThrow(() -> new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "userwithnoemployee"));

        Employee to = employeeService.findOneById(result.getEmployeeId()).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this task", ENTITY_NAME, "userwithnoemployee"));

        String currentUserName;
        if (currentUser.getFirstName() != null && currentUser.getLastName() != null) {
            currentUserName = currentUser.getFirstName() + " " + currentUser.getLastName();
        } else {
            currentUserName = currentUserLogin;
        }

        mailService.sendTaskEmail(to, currentUser);
        notificationService.save(currentUserName, to, NotificationType.NEW_TASK, currentUserName + " has assigned you a new task.");

        taskService.allocateNonConformanceCreationPercentage(result);

        return ResponseEntity.created(new URI("/api/tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tasks} : Updates an existing task.
     *
     * @param taskDTO the taskDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskDTO,
     * or with status {@code 400 (Bad Request)} if the taskDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tasks")
    public ResponseEntity<TaskDTO> updateTask(@Valid @RequestBody TaskDTO taskDTO) throws URISyntaxException {
        log.debug("REST request to update Task : {}", taskDTO);
        if (taskDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskDTO result = taskService.save(taskDTO);
        taskService.allocateNonConformancePercentage(result.getNonconformanceId());

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, taskDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tasks} : get all the tasks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tasks in body.
     */
    @GetMapping("/tasks")
    public List<TaskDTO> getAllTasks() {
        log.debug("REST request to get all Tasks");
        return taskService.findAll();
    }

    /**
     * {@code GET  /tasks/nonconformace/:nonconformaceId} : get all the non-conformance's tasks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tasks in body.
     */
    @GetMapping("/tasks/nonconformace/{nonconformaceId}")
    public List<TaskDTO> getAllNCTasks(@PathVariable Long nonconformaceId) {
        log.debug("REST request to get all non-conformance's Tasks");
        return taskService.findAllByNonconformanceId(nonconformaceId);
    }

    /**
     * {@code GET  /tasks/nonconformace/:nonconformaceId} : get all the non-conformance's tasks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tasks in body.
     */
    @GetMapping("/tasks/current-employee")
    public List<TaskDTO> getAllEmployeesTasks() {
        log.debug("REST request to get all non-conformance's Tasks");
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee currentEmployee = employeeService.findOneByUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));
        return taskService.findAllByEmployeeId(currentEmployee.getId());
    }

    /**
     * {@code GET  /tasks/:id} : get the "id" task.
     *
     * @param id the id of the taskDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        log.debug("REST request to get Task : {}", id);
        Optional<TaskDTO> taskDTO = taskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(taskDTO);
    }

    /**
     * {@code DELETE  /tasks/:id} : delete the "id" task.
     *
     * @param id the id of the taskDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.debug("REST request to delete Task : {}", id);
        Long nonConformaceId = taskService.findOne(id).get().getNonconformanceId();
        taskService.delete(id);
        taskService.allocateNonConformancePercentage(nonConformaceId);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

}
