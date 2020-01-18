package com.streeam.cid.web.rest;

import com.streeam.cid.domain.LongTermAction;
import com.streeam.cid.repository.LongTermActionRepository;
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
 * REST controller for managing {@link com.streeam.cid.domain.LongTermAction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LongTermActionResource {

    private final Logger log = LoggerFactory.getLogger(LongTermActionResource.class);

    private static final String ENTITY_NAME = "longTermAction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LongTermActionRepository longTermActionRepository;

    public LongTermActionResource(LongTermActionRepository longTermActionRepository) {
        this.longTermActionRepository = longTermActionRepository;
    }

    /**
     * {@code POST  /long-term-actions} : Create a new longTermAction.
     *
     * @param longTermAction the longTermAction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new longTermAction, or with status {@code 400 (Bad Request)} if the longTermAction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/long-term-actions")
    public ResponseEntity<LongTermAction> createLongTermAction(@Valid @RequestBody LongTermAction longTermAction) throws URISyntaxException {
        log.debug("REST request to save LongTermAction : {}", longTermAction);
        if (longTermAction.getId() != null) {
            throw new BadRequestAlertException("A new longTermAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LongTermAction result = longTermActionRepository.save(longTermAction);
        return ResponseEntity.created(new URI("/api/long-term-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /long-term-actions} : Updates an existing longTermAction.
     *
     * @param longTermAction the longTermAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated longTermAction,
     * or with status {@code 400 (Bad Request)} if the longTermAction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the longTermAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/long-term-actions")
    public ResponseEntity<LongTermAction> updateLongTermAction(@Valid @RequestBody LongTermAction longTermAction) throws URISyntaxException {
        log.debug("REST request to update LongTermAction : {}", longTermAction);
        if (longTermAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LongTermAction result = longTermActionRepository.save(longTermAction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, longTermAction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /long-term-actions} : get all the longTermActions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of longTermActions in body.
     */
    @GetMapping("/long-term-actions")
    public List<LongTermAction> getAllLongTermActions() {
        log.debug("REST request to get all LongTermActions");
        return longTermActionRepository.findAll();
    }

    /**
     * {@code GET  /long-term-actions/:id} : get the "id" longTermAction.
     *
     * @param id the id of the longTermAction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the longTermAction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/long-term-actions/{id}")
    public ResponseEntity<LongTermAction> getLongTermAction(@PathVariable Long id) {
        log.debug("REST request to get LongTermAction : {}", id);
        Optional<LongTermAction> longTermAction = longTermActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(longTermAction);
    }

    /**
     * {@code DELETE  /long-term-actions/:id} : delete the "id" longTermAction.
     *
     * @param id the id of the longTermAction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/long-term-actions/{id}")
    public ResponseEntity<Void> deleteLongTermAction(@PathVariable Long id) {
        log.debug("REST request to delete LongTermAction : {}", id);
        longTermActionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
