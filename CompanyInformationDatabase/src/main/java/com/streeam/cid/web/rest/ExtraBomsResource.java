package com.streeam.cid.web.rest;

import com.streeam.cid.domain.ExtraBoms;
import com.streeam.cid.repository.ExtraBomsRepository;
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
 * REST controller for managing {@link com.streeam.cid.domain.ExtraBoms}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExtraBomsResource {

    private final Logger log = LoggerFactory.getLogger(ExtraBomsResource.class);

    private static final String ENTITY_NAME = "extraBoms";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtraBomsRepository extraBomsRepository;

    public ExtraBomsResource(ExtraBomsRepository extraBomsRepository) {
        this.extraBomsRepository = extraBomsRepository;
    }

    /**
     * {@code POST  /extra-boms} : Create a new extraBoms.
     *
     * @param extraBoms the extraBoms to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extraBoms, or with status {@code 400 (Bad Request)} if the extraBoms has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extra-boms")
    public ResponseEntity<ExtraBoms> createExtraBoms(@Valid @RequestBody ExtraBoms extraBoms) throws URISyntaxException {
        log.debug("REST request to save ExtraBoms : {}", extraBoms);
        if (extraBoms.getId() != null) {
            throw new BadRequestAlertException("A new extraBoms cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtraBoms result = extraBomsRepository.save(extraBoms);
        return ResponseEntity.created(new URI("/api/extra-boms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extra-boms} : Updates an existing extraBoms.
     *
     * @param extraBoms the extraBoms to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extraBoms,
     * or with status {@code 400 (Bad Request)} if the extraBoms is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extraBoms couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extra-boms")
    public ResponseEntity<ExtraBoms> updateExtraBoms(@Valid @RequestBody ExtraBoms extraBoms) throws URISyntaxException {
        log.debug("REST request to update ExtraBoms : {}", extraBoms);
        if (extraBoms.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtraBoms result = extraBomsRepository.save(extraBoms);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, extraBoms.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extra-boms} : get all the extraBoms.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extraBoms in body.
     */
    @GetMapping("/extra-boms")
    public List<ExtraBoms> getAllExtraBoms() {
        log.debug("REST request to get all ExtraBoms");
        return extraBomsRepository.findAll();
    }

    /**
     * {@code GET  /extra-boms/:id} : get the "id" extraBoms.
     *
     * @param id the id of the extraBoms to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extraBoms, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extra-boms/{id}")
    public ResponseEntity<ExtraBoms> getExtraBoms(@PathVariable Long id) {
        log.debug("REST request to get ExtraBoms : {}", id);
        Optional<ExtraBoms> extraBoms = extraBomsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(extraBoms);
    }

    /**
     * {@code DELETE  /extra-boms/:id} : delete the "id" extraBoms.
     *
     * @param id the id of the extraBoms to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extra-boms/{id}")
    public ResponseEntity<Void> deleteExtraBoms(@PathVariable Long id) {
        log.debug("REST request to delete ExtraBoms : {}", id);
        extraBomsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
