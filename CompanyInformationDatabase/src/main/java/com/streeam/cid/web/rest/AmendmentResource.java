package com.streeam.cid.web.rest;

import com.streeam.cid.service.AmendmentService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.AmendmentDTO;

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
 * REST controller for managing {@link com.streeam.cid.domain.Amendment}.
 */
@RestController
@RequestMapping("/api")
public class AmendmentResource {

    private final Logger log = LoggerFactory.getLogger(AmendmentResource.class);

    private static final String ENTITY_NAME = "amendment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AmendmentService amendmentService;

    public AmendmentResource(AmendmentService amendmentService) {
        this.amendmentService = amendmentService;
    }

    /**
     * {@code POST  /amendments} : Create a new amendment.
     *
     * @param amendmentDTO the amendmentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new amendmentDTO, or with status {@code 400 (Bad Request)} if the amendment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/amendments")
    public ResponseEntity<AmendmentDTO> createAmendment(@Valid @RequestBody AmendmentDTO amendmentDTO) throws URISyntaxException {
        log.debug("REST request to save Amendment : {}", amendmentDTO);
        if (amendmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new amendment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AmendmentDTO result = amendmentService.save(amendmentDTO);
        return ResponseEntity.created(new URI("/api/amendments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /amendments} : Updates an existing amendment.
     *
     * @param amendmentDTO the amendmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated amendmentDTO,
     * or with status {@code 400 (Bad Request)} if the amendmentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the amendmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/amendments")
    public ResponseEntity<AmendmentDTO> updateAmendment(@Valid @RequestBody AmendmentDTO amendmentDTO) throws URISyntaxException {
        log.debug("REST request to update Amendment : {}", amendmentDTO);
        if (amendmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AmendmentDTO result = amendmentService.save(amendmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, amendmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /amendments} : get all the amendments.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of amendments in body.
     */
    @GetMapping("/amendments")
    public List<AmendmentDTO> getAllAmendments() {
        log.debug("REST request to get all Amendments");
        return amendmentService.findAll();
    }

    /**
     * {@code GET  /amendments/:id} : get the "id" amendment.
     *
     * @param id the id of the amendmentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the amendmentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/amendments/{id}")
    public ResponseEntity<AmendmentDTO> getAmendment(@PathVariable Long id) {
        log.debug("REST request to get Amendment : {}", id);
        Optional<AmendmentDTO> amendmentDTO = amendmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(amendmentDTO);
    }

    /**
     * {@code DELETE  /amendments/:id} : delete the "id" amendment.
     *
     * @param id the id of the amendmentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/amendments/{id}")
    public ResponseEntity<Void> deleteAmendment(@PathVariable Long id) {
        log.debug("REST request to delete Amendment : {}", id);
        amendmentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
