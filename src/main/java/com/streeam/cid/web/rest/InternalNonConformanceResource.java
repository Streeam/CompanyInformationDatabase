package com.streeam.cid.web.rest;

import com.streeam.cid.service.InternalNonConformanceService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.InternalNonConformanceDTO;

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
 * REST controller for managing {@link com.streeam.cid.domain.InternalNonConformance}.
 */
@RestController
@RequestMapping("/api")
public class InternalNonConformanceResource {

    private final Logger log = LoggerFactory.getLogger(InternalNonConformanceResource.class);

    private static final String ENTITY_NAME = "internalNonConformance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InternalNonConformanceService internalNonConformanceService;

    public InternalNonConformanceResource(InternalNonConformanceService internalNonConformanceService) {
        this.internalNonConformanceService = internalNonConformanceService;
    }

    /**
     * {@code POST  /internal-non-conformances} : Create a new internalNonConformance.
     *
     * @param internalNonConformanceDTO the internalNonConformanceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new internalNonConformanceDTO, or with status {@code 400 (Bad Request)} if the internalNonConformance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/internal-non-conformances")
    public ResponseEntity<InternalNonConformanceDTO> createInternalNonConformance(@Valid @RequestBody InternalNonConformanceDTO internalNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to save InternalNonConformance : {}", internalNonConformanceDTO);
        if (internalNonConformanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new internalNonConformance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InternalNonConformanceDTO result = internalNonConformanceService.save(internalNonConformanceDTO);
        return ResponseEntity.created(new URI("/api/internal-non-conformances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /internal-non-conformances} : Updates an existing internalNonConformance.
     *
     * @param internalNonConformanceDTO the internalNonConformanceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated internalNonConformanceDTO,
     * or with status {@code 400 (Bad Request)} if the internalNonConformanceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the internalNonConformanceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/internal-non-conformances")
    public ResponseEntity<InternalNonConformanceDTO> updateInternalNonConformance(@Valid @RequestBody InternalNonConformanceDTO internalNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to update InternalNonConformance : {}", internalNonConformanceDTO);
        if (internalNonConformanceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InternalNonConformanceDTO result = internalNonConformanceService.save(internalNonConformanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, internalNonConformanceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /internal-non-conformances} : get all the internalNonConformances.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of internalNonConformances in body.
     */
    @GetMapping("/internal-non-conformances")
    public List<InternalNonConformanceDTO> getAllInternalNonConformances(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all InternalNonConformances");
        return internalNonConformanceService.findAll();
    }

    /**
     * {@code GET  /internal-non-conformances/non-conformance-details/{nonconformanceDetailsid}} : get all the internalNonConformances of a nonconformanceDetails.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of internalNonConformances in body.
     */
    @GetMapping("/internal-non-conformances/non-conformance-details/{nonconformanceDetailsid}")
    public List<InternalNonConformanceDTO> getAllInternalNonConformancesOfNonDetails(@RequestParam(required = false, defaultValue = "false") boolean eagerload, @PathVariable Long nonconformanceDetailsid) {
        log.debug("REST request to get all the internalNonConformances of a nonconformanceDetails");
        return internalNonConformanceService.findAllByNonconformanceDetailsId(nonconformanceDetailsid);
    }

    /**
     * {@code GET  /internal-non-conformances/incomplete-non-conformance-details/{nonconformanceDetailsid}} : get the incomplete internalNonConformances of a nonconformanceDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of internalNonConformances in body.
     */
    @GetMapping("/internal-non-conformances/incomplete-non-conformance-details/{nonconformanceDetailsid}")
    public ResponseEntity<InternalNonConformanceDTO> getIncompleteInternalNonConformancesOfNonDetails(@PathVariable Long nonconformanceDetailsid) {
        log.debug("REST request to get the incomplete internalNonConformances of a nonconformanceDetails");
        Optional<InternalNonConformanceDTO> internalNonConformanceDTO = internalNonConformanceService.findOneByIncompleteNonconformanceDetailsId(nonconformanceDetailsid);

        if (internalNonConformanceDTO.isPresent()) {
            return ResponseEntity.ok(internalNonConformanceDTO.get());
        }
        return ResponseEntity.ok(null);
    }

    /**
     * {@code GET  /internal-non-conformances/:id} : get the "id" internalNonConformance.
     *
     * @param id the id of the internalNonConformanceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the internalNonConformanceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/internal-non-conformances/{id}")
    public ResponseEntity<InternalNonConformanceDTO> getInternalNonConformance(@PathVariable Long id) {
        log.debug("REST request to get InternalNonConformance : {}", id);
        Optional<InternalNonConformanceDTO> internalNonConformanceDTO = internalNonConformanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(internalNonConformanceDTO);
    }

    /**
     * {@code DELETE  /internal-non-conformances/:id} : delete the "id" internalNonConformance.
     *
     * @param id the id of the internalNonConformanceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/internal-non-conformances/{id}")
    public ResponseEntity<Void> deleteInternalNonConformance(@PathVariable Long id) {
        log.debug("REST request to delete InternalNonConformance : {}", id);
        internalNonConformanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
