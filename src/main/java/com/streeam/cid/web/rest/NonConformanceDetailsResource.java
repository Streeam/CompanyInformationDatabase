package com.streeam.cid.web.rest;

import com.streeam.cid.domain.*;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.repository.*;
import com.streeam.cid.security.SecurityUtils;
import com.streeam.cid.service.*;
import com.streeam.cid.service.dto.ClientNonConformanceDTO;
import com.streeam.cid.service.dto.InternalNonConformanceDTO;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;
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
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.NonConformanceDetails}.
 */
@RestController
@RequestMapping("/api")
public class NonConformanceDetailsResource {

    private final Logger log = LoggerFactory.getLogger(NonConformanceDetailsResource.class);

    private static final String ENTITY_NAME = "nonConformanceDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private CompanyService companyService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private FishBoneRepository fishBoneRepository;
    @Autowired
    private ActionToBeTakenRepository actionToBeTakenRepository;
    @Autowired
    private ShortTermActionRepository shortTermActionRepository;
    @Autowired
    private LongTermActionRepository longTermActionRepository;
    @Autowired
    private InternalNonConformanceService internalNonConformanceService;
    @Autowired
    private ClientNonConformanceService clientNonConformanceService;
    @Autowired
    private ProcessAuditChecklistRepository processAuditChecklistRepository;
    @Autowired
    private TaskService taskService;

    private final NonConformanceDetailsService nonConformanceDetailsService;

    public NonConformanceDetailsResource(NonConformanceDetailsService nonConformanceDetailsService) {
        this.nonConformanceDetailsService = nonConformanceDetailsService;
    }

    /**
     * {@code POST  /non-conformance-details} : Create a new nonConformanceDetails.
     *
     * @param nonConformanceDetailsDTO the nonConformanceDetailsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nonConformanceDetailsDTO, or with status {@code 400 (Bad Request)} if the nonConformanceDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/non-conformance-details")
    public ResponseEntity<NonConformanceDetailsDTO> createNonConformanceDetails(@Valid @RequestBody NonConformanceDetailsDTO nonConformanceDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save NonConformanceDetails : {}", nonConformanceDetailsDTO);
        if (nonConformanceDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new nonConformanceDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }

        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee employee = employeeService.findOneByUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));
        Optional<NonConformanceDetailsDTO> incompleteNonConformanceDetails = nonConformanceDetailsService.findOneByEmployeeAndStatus(employee, Status.INCOMPLETE);

        NonConformanceDetailsDTO result;
        if (incompleteNonConformanceDetails.isPresent()) {
            result = incompleteNonConformanceDetails.get();
        } else {
            result = nonConformanceDetailsService.save(nonConformanceDetailsDTO);
            ActionToBeTaken actionToBeTaken = new ActionToBeTaken();
            actionToBeTaken.setNonconformanceId(result.getId());
            actionToBeTakenRepository.save(actionToBeTaken);
            LongTermAction longTermAction = new LongTermAction();
            longTermAction.setNonConformanceId(result.getId());
            longTermActionRepository.save(longTermAction);
            ShortTermAction shortTermAction = new ShortTermAction();
            shortTermAction.setNonConformanceId(result.getId());
            shortTermActionRepository.save(shortTermAction);
            processAuditChecklistRepository.saveAll(defaultProcessAuditChecklist(result.getId()));
        }
        return ResponseEntity.created(new URI("/api/non-conformance-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /non-conformance-details} : Updates an existing nonConformanceDetails.
     *
     * @param nonConformanceDetailsDTO the nonConformanceDetailsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nonConformanceDetailsDTO,
     * or with status {@code 400 (Bad Request)} if the nonConformanceDetailsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nonConformanceDetailsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/non-conformance-details")
    public ResponseEntity<NonConformanceDetailsDTO> updateNonConformanceDetails(@Valid @RequestBody NonConformanceDetailsDTO nonConformanceDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update NonConformanceDetails : {}", nonConformanceDetailsDTO);
        if (nonConformanceDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NonConformanceDetailsDTO result = nonConformanceDetailsService.save(nonConformanceDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nonConformanceDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /non-conformance-details} : get all the nonConformanceDetails.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nonConformanceDetails in body.
     */
    @GetMapping("/non-conformance-details")
    public List<NonConformanceDetailsDTO> getAllNonConformanceDetails(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all NonConformanceDetails");
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee currentEmployee = employeeService.findOneByUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));
        List<NonConformanceDetailsDTO> nonConformanceDetailsDTOList = nonConformanceDetailsService.findAll();
        if (nonConformanceDetailsDTOList.stream().filter(
            nonConformanceDetailsDTO ->
                nonConformanceDetailsDTO.getStatus().equals(Status.INCOMPLETE) &&
                    nonConformanceDetailsDTO.getEmployee().getId() == currentEmployee.getId()
        ).count() > 1) {
            throw  new BadRequestAlertException("Cannot have more then one incomplete non-comformcance per employee", ENTITY_NAME, "only one non-conformance per employee");
        }
        return nonConformanceDetailsDTOList;
    }

    /**
     * {@code GET  /non-conformance-details/:id} : get the "id" nonConformanceDetails.
     *
     * @param id the id of the nonConformanceDetailsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nonConformanceDetailsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/non-conformance-details/{id}")
    public ResponseEntity<NonConformanceDetailsDTO> getNonConformanceDetails(@PathVariable Long id) {
        log.debug("REST request to get NonConformanceDetails : {}", id);
        Optional<NonConformanceDetailsDTO> nonConformanceDetailsDTO = nonConformanceDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nonConformanceDetailsDTO);
    }

    /**
     * {@code GET  /non-conformance-details/current-incomplete} : get the current incomplete nonConformanceDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nonConformanceDetailsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/non-conformance-details/current-incomplete")
    public ResponseEntity<NonConformanceDetailsDTO> getIncompleteNonConformanceDetail() {

        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee employee = employeeService.findOneByUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));
        Optional<NonConformanceDetailsDTO> nonConformanceDetailsDTO = nonConformanceDetailsService.findOneByEmployeeAndStatus(employee, Status.INCOMPLETE);
        log.debug("REST request to get current incomplete employee : {}", employee.getUser().getFirstName() );
        log.debug("REST request to get current incomplete nonConformanceDetailsDTO : {}", nonConformanceDetailsDTO );
        if (nonConformanceDetailsDTO.isPresent()){
            return ResponseEntity.ok(nonConformanceDetailsDTO.get());
        }
        return ResponseEntity.ok(null);
    }

    /**
     * {@code GET  /non-conformance-details/current} : get the current employees nonConformanceDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nonConformanceDetailsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/non-conformance-details/current")
    public List<NonConformanceDetailsDTO> getEmployeesNonConformanceDetail() {


        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee currentEmployee = employeeService.findOneByUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));
        List<NonConformanceDetailsDTO> nonConformanceDetailsDTOList = nonConformanceDetailsService.findAllByEmployee(currentEmployee);
        return nonConformanceDetailsDTOList;
    }

    /**
     * {@code DELETE  /non-conformance-details/:id} : delete the "id" nonConformanceDetails.
     *
     * @param id the id of the nonConformanceDetailsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/non-conformance-details/{id}")
    public ResponseEntity<Void> deleteNonConformanceDetails(@PathVariable Long id) {
        log.debug("REST request to delete NonConformanceDetails : {}", id);
        nonConformanceDetailsService.delete(id);
        List<InternalNonConformanceDTO> internalNonConformanceList = internalNonConformanceService.findAllByNonconformanceDetailsId(id);
        if(!internalNonConformanceList.isEmpty()) {
            internalNonConformanceService.deleteAll(internalNonConformanceList);
        }
        List<ClientNonConformanceDTO> clientNonConformanceDTOS = clientNonConformanceService.findAllByNonconformanceDetailsId(id);
        if(!clientNonConformanceDTOS.isEmpty()) {
            clientNonConformanceService.deleteAll(clientNonConformanceDTOS);
        }
        List<TaskDTO> taskDTOList = taskService.findAllByNonconformanceId(id);
        taskDTOList.forEach(task -> taskService.delete(task.getId()));
        actionToBeTakenRepository.findOneByNonconformanceId(id).ifPresent(rootCause -> {
                fishBoneRepository.findOneByRootCauseId(rootCause.getId()).ifPresent(fishBone -> fishBoneRepository.delete(fishBone));
                actionToBeTakenRepository.delete(rootCause);
            }
            );
        longTermActionRepository.findOneByNonConformanceId(id).ifPresent(longTermAction -> longTermActionRepository.delete(longTermAction));
        shortTermActionRepository.findOneByNonConformanceId(id).ifPresent(shortTermAction -> shortTermActionRepository.delete(shortTermAction));
        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAllByNonConformanceId(id);
        if(!processAuditChecklistList.isEmpty()) {
            processAuditChecklistRepository.deleteAll(processAuditChecklistList);
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    private List<ProcessAuditChecklist> defaultProcessAuditChecklist(Long nonConformanceId) {
        List<ProcessAuditChecklist> processAuditCheckList = new LinkedList<>();
        processAuditCheckList.add(new ProcessAuditChecklist()
            .auditQuestion("What is the problem ? What is going wrong?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist()
            .auditQuestion("What are possible causes?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist()
            .auditQuestion("Are the Quality standards known?  Inspections being performed?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist()
            .auditQuestion("What quality-related data is available? Is this data used to control the process?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Are the workers able to detect the defect in-station?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Do the workers receive feedback regarding quality issues?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Are required elements available for quality inspection?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Do the workers know what to do if the process is out of control?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Are Clear SOP`s or Work instructions available on the shop floor?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Is work always conducted according to the documented standard?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Does the standard lead to controlled / stable performance?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Are the workers properly trained and motivated?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Are necessary tools / equipment available and in good condition?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("What data is available on equipment problems, maintenance, etc.?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Is there a supplier-generated influence to the problem?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("What supplier related data (delivery / quality) is available?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        processAuditCheckList.add(new ProcessAuditChecklist().auditQuestion("Is there an internal handling impact to the problem?")
            .compliant(false)
            .ofi(false)
            .majorNC(false)
            .minorNC(false)
            .majorNC(false)
            .nonConformanceId(nonConformanceId)
        );
        return processAuditCheckList;
    }
}
