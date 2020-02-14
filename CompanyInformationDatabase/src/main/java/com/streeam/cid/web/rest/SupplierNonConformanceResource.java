package com.streeam.cid.web.rest;

import com.streeam.cid.service.SupplierNonConformanceService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.SupplierNonConformanceDTO;

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
 * REST controller for managing {@link com.streeam.cid.domain.SupplierNonConformance}.
 */
@RestController
@RequestMapping("/api")
public class SupplierNonConformanceResource {

    private final Logger log = LoggerFactory.getLogger(SupplierNonConformanceResource.class);

    private static final String ENTITY_NAME = "supplierNonConformance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupplierNonConformanceService supplierNonConformanceService;

    public SupplierNonConformanceResource(SupplierNonConformanceService supplierNonConformanceService) {
        this.supplierNonConformanceService = supplierNonConformanceService;
    }

    /**
     * {@code POST  /supplier-non-conformances} : Create a new supplierNonConformance.
     *
     * @param supplierNonConformanceDTO the supplierNonConformanceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supplierNonConformanceDTO, or with status {@code 400 (Bad Request)} if the supplierNonConformance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/supplier-non-conformances")
    public ResponseEntity<SupplierNonConformanceDTO> createSupplierNonConformance(@Valid @RequestBody SupplierNonConformanceDTO supplierNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to save SupplierNonConformance : {}", supplierNonConformanceDTO);
        if (supplierNonConformanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new supplierNonConformance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupplierNonConformanceDTO result = supplierNonConformanceService.save(supplierNonConformanceDTO);
        return ResponseEntity.created(new URI("/api/supplier-non-conformances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /supplier-non-conformances} : Updates an existing supplierNonConformance.
     *
     * @param supplierNonConformanceDTO the supplierNonConformanceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supplierNonConformanceDTO,
     * or with status {@code 400 (Bad Request)} if the supplierNonConformanceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supplierNonConformanceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/supplier-non-conformances")
    public ResponseEntity<SupplierNonConformanceDTO> updateSupplierNonConformance(@Valid @RequestBody SupplierNonConformanceDTO supplierNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to update SupplierNonConformance : {}", supplierNonConformanceDTO);
        if (supplierNonConformanceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupplierNonConformanceDTO result = supplierNonConformanceService.save(supplierNonConformanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, supplierNonConformanceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /supplier-non-conformances} : get all the supplierNonConformances.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supplierNonConformances in body.
     */
    @GetMapping("/supplier-non-conformances")
    public List<SupplierNonConformanceDTO> getAllSupplierNonConformances() {
        log.debug("REST request to get all SupplierNonConformances");
        return supplierNonConformanceService.findAll();
    }

    /**
     * {@code GET  /supplier-non-conformances/:id} : get the "id" supplierNonConformance.
     *
     * @param id the id of the supplierNonConformanceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supplierNonConformanceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/supplier-non-conformances/{id}")
    public ResponseEntity<SupplierNonConformanceDTO> getSupplierNonConformance(@PathVariable Long id) {
        log.debug("REST request to get SupplierNonConformance : {}", id);
        Optional<SupplierNonConformanceDTO> supplierNonConformanceDTO = supplierNonConformanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(supplierNonConformanceDTO);
    }

    /**
     * {@code DELETE  /supplier-non-conformances/:id} : delete the "id" supplierNonConformance.
     *
     * @param id the id of the supplierNonConformanceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/supplier-non-conformances/{id}")
    public ResponseEntity<Void> deleteSupplierNonConformance(@PathVariable Long id) {
        log.debug("REST request to delete SupplierNonConformance : {}", id);
        supplierNonConformanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
