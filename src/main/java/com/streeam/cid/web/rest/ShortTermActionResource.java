package com.streeam.cid.web.rest;

import com.streeam.cid.domain.ShortTermAction;
import com.streeam.cid.repository.ShortTermActionRepository;
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
 * REST controller for managing {@link com.streeam.cid.domain.ShortTermAction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ShortTermActionResource {

    private final Logger log = LoggerFactory.getLogger(ShortTermActionResource.class);

    private static final String ENTITY_NAME = "shortTermAction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ShortTermActionRepository shortTermActionRepository;

    public ShortTermActionResource(ShortTermActionRepository shortTermActionRepository) {
        this.shortTermActionRepository = shortTermActionRepository;
    }

    /**
     * {@code POST  /short-term-actions} : Create a new shortTermAction.
     *
     * @param shortTermAction the shortTermAction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new shortTermAction, or with status {@code 400 (Bad Request)} if the shortTermAction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/short-term-actions")
    public ResponseEntity<ShortTermAction> createShortTermAction(@Valid @RequestBody ShortTermAction shortTermAction) throws URISyntaxException {
        log.debug("REST request to save ShortTermAction : {}", shortTermAction);
        if (shortTermAction.getId() != null) {
            throw new BadRequestAlertException("A new shortTermAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ShortTermAction result = shortTermActionRepository.save(shortTermAction);
        return ResponseEntity.created(new URI("/api/short-term-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /short-term-actions} : Updates an existing shortTermAction.
     *
     * @param shortTermAction the shortTermAction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated shortTermAction,
     * or with status {@code 400 (Bad Request)} if the shortTermAction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the shortTermAction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/short-term-actions")
    public ResponseEntity<ShortTermAction> updateShortTermAction(@Valid @RequestBody ShortTermAction shortTermAction) throws URISyntaxException {
        log.debug("REST request to update ShortTermAction : {}", shortTermAction);
        if (shortTermAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ShortTermAction result = shortTermActionRepository.save(shortTermAction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, shortTermAction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /short-term-actions} : get all the shortTermActions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of shortTermActions in body.
     */
    @GetMapping("/short-term-actions")
    public List<ShortTermAction> getAllShortTermActions() {
        log.debug("REST request to get all ShortTermActions");
        return shortTermActionRepository.findAll();
    }

    /**
     * {@code GET  /short-term-actions/:id} : get the "id" shortTermAction.
     *
     * @param id the id of the shortTermAction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the shortTermAction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/short-term-actions/{id}")
    public ResponseEntity<ShortTermAction> getShortTermAction(@PathVariable Long id) {
        log.debug("REST request to get ShortTermAction : {}", id);
        Optional<ShortTermAction> shortTermAction = shortTermActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(shortTermAction);
    }

    /**
     * {@code DELETE  /short-term-actions/:id} : delete the "id" shortTermAction.
     *
     * @param id the id of the shortTermAction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/short-term-actions/{id}")
    public ResponseEntity<Void> deleteShortTermAction(@PathVariable Long id) {
        log.debug("REST request to delete ShortTermAction : {}", id);
        shortTermActionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
