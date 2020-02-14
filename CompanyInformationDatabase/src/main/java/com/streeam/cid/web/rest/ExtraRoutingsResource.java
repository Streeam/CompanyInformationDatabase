package com.streeam.cid.web.rest;

import com.streeam.cid.domain.ExtraRoutings;
import com.streeam.cid.repository.ExtraRoutingsRepository;
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
 * REST controller for managing {@link com.streeam.cid.domain.ExtraRoutings}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExtraRoutingsResource {

    private final Logger log = LoggerFactory.getLogger(ExtraRoutingsResource.class);

    private static final String ENTITY_NAME = "extraRoutings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtraRoutingsRepository extraRoutingsRepository;

    public ExtraRoutingsResource(ExtraRoutingsRepository extraRoutingsRepository) {
        this.extraRoutingsRepository = extraRoutingsRepository;
    }

    /**
     * {@code POST  /extra-routings} : Create a new extraRoutings.
     *
     * @param extraRoutings the extraRoutings to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extraRoutings, or with status {@code 400 (Bad Request)} if the extraRoutings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extra-routings")
    public ResponseEntity<ExtraRoutings> createExtraRoutings(@Valid @RequestBody ExtraRoutings extraRoutings) throws URISyntaxException {
        log.debug("REST request to save ExtraRoutings : {}", extraRoutings);
        if (extraRoutings.getId() != null) {
            throw new BadRequestAlertException("A new extraRoutings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtraRoutings result = extraRoutingsRepository.save(extraRoutings);
        return ResponseEntity.created(new URI("/api/extra-routings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extra-routings} : Updates an existing extraRoutings.
     *
     * @param extraRoutings the extraRoutings to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extraRoutings,
     * or with status {@code 400 (Bad Request)} if the extraRoutings is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extraRoutings couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extra-routings")
    public ResponseEntity<ExtraRoutings> updateExtraRoutings(@Valid @RequestBody ExtraRoutings extraRoutings) throws URISyntaxException {
        log.debug("REST request to update ExtraRoutings : {}", extraRoutings);
        if (extraRoutings.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtraRoutings result = extraRoutingsRepository.save(extraRoutings);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, extraRoutings.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extra-routings} : get all the extraRoutings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extraRoutings in body.
     */
    @GetMapping("/extra-routings")
    public List<ExtraRoutings> getAllExtraRoutings() {
        log.debug("REST request to get all ExtraRoutings");
        return extraRoutingsRepository.findAll();
    }

    /**
     * {@code GET  /extra-routings/:id} : get the "id" extraRoutings.
     *
     * @param id the id of the extraRoutings to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extraRoutings, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extra-routings/{id}")
    public ResponseEntity<ExtraRoutings> getExtraRoutings(@PathVariable Long id) {
        log.debug("REST request to get ExtraRoutings : {}", id);
        Optional<ExtraRoutings> extraRoutings = extraRoutingsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(extraRoutings);
    }

    /**
     * {@code DELETE  /extra-routings/:id} : delete the "id" extraRoutings.
     *
     * @param id the id of the extraRoutings to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extra-routings/{id}")
    public ResponseEntity<Void> deleteExtraRoutings(@PathVariable Long id) {
        log.debug("REST request to delete ExtraRoutings : {}", id);
        extraRoutingsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
