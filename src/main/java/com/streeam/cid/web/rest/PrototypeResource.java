package com.streeam.cid.web.rest;

import com.streeam.cid.service.PrototypeService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.PrototypeDTO;

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
 * REST controller for managing {@link com.streeam.cid.domain.Prototype}.
 */
@RestController
@RequestMapping("/api")
public class PrototypeResource {

    private final Logger log = LoggerFactory.getLogger(PrototypeResource.class);

    private static final String ENTITY_NAME = "prototype";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrototypeService prototypeService;

    public PrototypeResource(PrototypeService prototypeService) {
        this.prototypeService = prototypeService;
    }

    /**
     * {@code POST  /prototypes} : Create a new prototype.
     *
     * @param prototypeDTO the prototypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prototypeDTO, or with status {@code 400 (Bad Request)} if the prototype has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prototypes")
    public ResponseEntity<PrototypeDTO> createPrototype(@Valid @RequestBody PrototypeDTO prototypeDTO) throws URISyntaxException {
        log.debug("REST request to save Prototype : {}", prototypeDTO);
        if (prototypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new prototype cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrototypeDTO result = prototypeService.save(prototypeDTO);
        return ResponseEntity.created(new URI("/api/prototypes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prototypes} : Updates an existing prototype.
     *
     * @param prototypeDTO the prototypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prototypeDTO,
     * or with status {@code 400 (Bad Request)} if the prototypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prototypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prototypes")
    public ResponseEntity<PrototypeDTO> updatePrototype(@Valid @RequestBody PrototypeDTO prototypeDTO) throws URISyntaxException {
        log.debug("REST request to update Prototype : {}", prototypeDTO);
        if (prototypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrototypeDTO result = prototypeService.save(prototypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, prototypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prototypes} : get all the prototypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prototypes in body.
     */
    @GetMapping("/prototypes")
    public List<PrototypeDTO> getAllPrototypes() {
        log.debug("REST request to get all Prototypes");
        return prototypeService.findAll();
    }

    /**
     * {@code GET  /prototypes/:id} : get the "id" prototype.
     *
     * @param id the id of the prototypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prototypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prototypes/{id}")
    public ResponseEntity<PrototypeDTO> getPrototype(@PathVariable Long id) {
        log.debug("REST request to get Prototype : {}", id);
        Optional<PrototypeDTO> prototypeDTO = prototypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(prototypeDTO);
    }

    /**
     * {@code DELETE  /prototypes/:id} : delete the "id" prototype.
     *
     * @param id the id of the prototypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prototypes/{id}")
    public ResponseEntity<Void> deletePrototype(@PathVariable Long id) {
        log.debug("REST request to delete Prototype : {}", id);
        prototypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
