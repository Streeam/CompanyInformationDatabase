package com.streeam.cid.web.rest;

import com.streeam.cid.domain.ProcessAuditChecklist;
import com.streeam.cid.repository.ProcessAuditChecklistRepository;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.ProcessAuditChecklist}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProcessAuditChecklistResource {

    private final Logger log = LoggerFactory.getLogger(ProcessAuditChecklistResource.class);

    private static final String ENTITY_NAME = "processAuditChecklist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcessAuditChecklistRepository processAuditChecklistRepository;

    public ProcessAuditChecklistResource(ProcessAuditChecklistRepository processAuditChecklistRepository) {
        this.processAuditChecklistRepository = processAuditChecklistRepository;
    }

    /**
     * {@code POST  /process-audit-checklists} : Create a new processAuditChecklist.
     *
     * @param processAuditChecklist the processAuditChecklist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new processAuditChecklist, or with status {@code 400 (Bad Request)} if the processAuditChecklist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/process-audit-checklists")
    public ResponseEntity<ProcessAuditChecklist> createProcessAuditChecklist(@Valid @RequestBody ProcessAuditChecklist processAuditChecklist) throws URISyntaxException {
        log.debug("REST request to save ProcessAuditChecklist : {}", processAuditChecklist);
        if (processAuditChecklist.getId() != null) {
            throw new BadRequestAlertException("A new processAuditChecklist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProcessAuditChecklist result = processAuditChecklistRepository.save(processAuditChecklist);
        return ResponseEntity.created(new URI("/api/process-audit-checklists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /process-audit-checklists} : Updates an existing processAuditChecklist.
     *
     * @param processAuditChecklist the processAuditChecklist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated processAuditChecklist,
     * or with status {@code 400 (Bad Request)} if the processAuditChecklist is not valid,
     * or with status {@code 500 (Internal Server Error)} if the processAuditChecklist couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/process-audit-checklists")
    public ResponseEntity<ProcessAuditChecklist> updateProcessAuditChecklist(@Valid @RequestBody ProcessAuditChecklist processAuditChecklist) throws URISyntaxException {
        log.debug("REST request to update ProcessAuditChecklist : {}", processAuditChecklist);
        if (processAuditChecklist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProcessAuditChecklist result = processAuditChecklistRepository.save(processAuditChecklist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, processAuditChecklist.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /process-audit-checklists} : get all the processAuditChecklists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of processAuditChecklists in body.
     */
    @GetMapping("/process-audit-checklists")
    public List<ProcessAuditChecklist> getAllProcessAuditChecklists() {
        log.debug("REST request to get all ProcessAuditChecklists");
        return processAuditChecklistRepository.findAll();
    }

    /**
     * {@code GET  /process-audit-checklists/:id} : get the "id" processAuditChecklist.
     *
     * @param id the id of the processAuditChecklist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the processAuditChecklist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/process-audit-checklists/{id}")
    public ResponseEntity<ProcessAuditChecklist> getProcessAuditChecklist(@PathVariable Long id) {
        log.debug("REST request to get ProcessAuditChecklist : {}", id);
        Optional<ProcessAuditChecklist> processAuditChecklist = processAuditChecklistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(processAuditChecklist);
    }
    /**
     * {@code GET  /process-audit-checklists/non-conformance/:nonConformanceId} : get the "id" processAuditChecklist.
     *
     * @param nonConformanceId the id of the nonConformance.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the processAuditChecklist, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/process-audit-checklists/non-conformance/{nonConformanceId}")
    public List<ProcessAuditChecklist> getProcessAuditChecklistOfNonConformace(@PathVariable Long nonConformanceId) {
        log.debug("REST request to get ProcessAuditChecklist : {}", nonConformanceId);
        return processAuditChecklistRepository.findAllByNonConformanceId(nonConformanceId);
    }
    /**
     * {@code DELETE  /process-audit-checklists/:id} : delete the "id" processAuditChecklist.
     *
     * @param id the id of the processAuditChecklist to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/process-audit-checklists/{id}")
    public ResponseEntity<Void> deleteProcessAuditChecklist(@PathVariable Long id) {
        log.debug("REST request to delete ProcessAuditChecklist : {}", id);
        processAuditChecklistRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
