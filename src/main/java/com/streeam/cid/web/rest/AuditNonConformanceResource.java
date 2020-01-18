package com.streeam.cid.web.rest;

import com.streeam.cid.service.AuditNonConformanceService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.AuditNonConformanceDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.AuditNonConformance}.
 */
@RestController
@RequestMapping("/api")
public class AuditNonConformanceResource {

    private final Logger log = LoggerFactory.getLogger(AuditNonConformanceResource.class);

    private static final String ENTITY_NAME = "auditNonConformance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AuditNonConformanceService auditNonConformanceService;

    public AuditNonConformanceResource(AuditNonConformanceService auditNonConformanceService) {
        this.auditNonConformanceService = auditNonConformanceService;
    }

    /**
     * {@code POST  /audit-non-conformances} : Create a new auditNonConformance.
     *
     * @param auditNonConformanceDTO the auditNonConformanceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new auditNonConformanceDTO, or with status {@code 400 (Bad Request)} if the auditNonConformance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/audit-non-conformances")
    public ResponseEntity<AuditNonConformanceDTO> createAuditNonConformance(@Valid @RequestBody AuditNonConformanceDTO auditNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to save AuditNonConformance : {}", auditNonConformanceDTO);
        if (auditNonConformanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new auditNonConformance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AuditNonConformanceDTO result = auditNonConformanceService.save(auditNonConformanceDTO);
        return ResponseEntity.created(new URI("/api/audit-non-conformances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /audit-non-conformances} : Updates an existing auditNonConformance.
     *
     * @param auditNonConformanceDTO the auditNonConformanceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated auditNonConformanceDTO,
     * or with status {@code 400 (Bad Request)} if the auditNonConformanceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the auditNonConformanceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/audit-non-conformances")
    public ResponseEntity<AuditNonConformanceDTO> updateAuditNonConformance(@Valid @RequestBody AuditNonConformanceDTO auditNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to update AuditNonConformance : {}", auditNonConformanceDTO);
        if (auditNonConformanceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AuditNonConformanceDTO result = auditNonConformanceService.save(auditNonConformanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, auditNonConformanceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /audit-non-conformances} : get all the auditNonConformances.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of auditNonConformances in body.
     */
    @GetMapping("/audit-non-conformances")
    public List<AuditNonConformanceDTO> getAllAuditNonConformances() {
        log.debug("REST request to get all AuditNonConformances");
        return auditNonConformanceService.findAll();
    }

    /**
     * {@code GET  /audit-non-conformances/:id} : get the "id" auditNonConformance.
     *
     * @param id the id of the auditNonConformanceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the auditNonConformanceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/audit-non-conformances/{id}")
    public ResponseEntity<AuditNonConformanceDTO> getAuditNonConformance(@PathVariable Long id) {
        log.debug("REST request to get AuditNonConformance : {}", id);
        Optional<AuditNonConformanceDTO> auditNonConformanceDTO = auditNonConformanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(auditNonConformanceDTO);
    }

    /**
     * {@code DELETE  /audit-non-conformances/:id} : delete the "id" auditNonConformance.
     *
     * @param id the id of the auditNonConformanceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/audit-non-conformances/{id}")
    public ResponseEntity<Void> deleteAuditNonConformance(@PathVariable Long id) {
        log.debug("REST request to delete AuditNonConformance : {}", id);
        auditNonConformanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
