package com.streeam.cid.web.rest;

import com.streeam.cid.service.NonConformanceTypeService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.NonConformanceTypeDTO;

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
 * REST controller for managing {@link com.streeam.cid.domain.NonConformanceType}.
 */
@RestController
@RequestMapping("/api")
public class NonConformanceTypeResource {

    private final Logger log = LoggerFactory.getLogger(NonConformanceTypeResource.class);

    private static final String ENTITY_NAME = "nonConformanceType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NonConformanceTypeService nonConformanceTypeService;

    public NonConformanceTypeResource(NonConformanceTypeService nonConformanceTypeService) {
        this.nonConformanceTypeService = nonConformanceTypeService;
    }

    /**
     * {@code POST  /non-conformance-types} : Create a new nonConformanceType.
     *
     * @param nonConformanceTypeDTO the nonConformanceTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nonConformanceTypeDTO, or with status {@code 400 (Bad Request)} if the nonConformanceType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/non-conformance-types")
    public ResponseEntity<NonConformanceTypeDTO> createNonConformanceType(@Valid @RequestBody NonConformanceTypeDTO nonConformanceTypeDTO) throws URISyntaxException {
        log.debug("REST request to save NonConformanceType : {}", nonConformanceTypeDTO);
        if (nonConformanceTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new nonConformanceType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NonConformanceTypeDTO result = nonConformanceTypeService.save(nonConformanceTypeDTO);
        return ResponseEntity.created(new URI("/api/non-conformance-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /non-conformance-types} : Updates an existing nonConformanceType.
     *
     * @param nonConformanceTypeDTO the nonConformanceTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nonConformanceTypeDTO,
     * or with status {@code 400 (Bad Request)} if the nonConformanceTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nonConformanceTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/non-conformance-types")
    public ResponseEntity<NonConformanceTypeDTO> updateNonConformanceType(@Valid @RequestBody NonConformanceTypeDTO nonConformanceTypeDTO) throws URISyntaxException {
        log.debug("REST request to update NonConformanceType : {}", nonConformanceTypeDTO);
        if (nonConformanceTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NonConformanceTypeDTO result = nonConformanceTypeService.save(nonConformanceTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nonConformanceTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /non-conformance-types} : get all the nonConformanceTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nonConformanceTypes in body.
     */
    @GetMapping("/non-conformance-types")
    public List<NonConformanceTypeDTO> getAllNonConformanceTypes() {
        log.debug("REST request to get all NonConformanceTypes");
        return nonConformanceTypeService.findAll();
    }

    /**
     * {@code GET  /non-conformance-types/:id} : get the "id" nonConformanceType.
     *
     * @param id the id of the nonConformanceTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nonConformanceTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/non-conformance-types/{id}")
    public ResponseEntity<NonConformanceTypeDTO> getNonConformanceType(@PathVariable Long id) {
        log.debug("REST request to get NonConformanceType : {}", id);
        Optional<NonConformanceTypeDTO> nonConformanceTypeDTO = nonConformanceTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nonConformanceTypeDTO);
    }

    /**
     * {@code DELETE  /non-conformance-types/:id} : delete the "id" nonConformanceType.
     *
     * @param id the id of the nonConformanceTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/non-conformance-types/{id}")
    public ResponseEntity<Void> deleteNonConformanceType(@PathVariable Long id) {
        log.debug("REST request to delete NonConformanceType : {}", id);
        nonConformanceTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
