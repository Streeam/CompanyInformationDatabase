package com.streeam.cid.web.rest;

import com.streeam.cid.domain.FishBone;
import com.streeam.cid.repository.FishBoneRepository;
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
 * REST controller for managing {@link com.streeam.cid.domain.FishBone}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FishBoneResource {

    private final Logger log = LoggerFactory.getLogger(FishBoneResource.class);

    private static final String ENTITY_NAME = "fishBone";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FishBoneRepository fishBoneRepository;

    public FishBoneResource(FishBoneRepository fishBoneRepository) {
        this.fishBoneRepository = fishBoneRepository;
    }

    /**
     * {@code POST  /fish-bones} : Create a new fishBone.
     *
     * @param fishBone the fishBone to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fishBone, or with status {@code 400 (Bad Request)} if the fishBone has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fish-bones")
    public ResponseEntity<FishBone> createFishBone(@Valid @RequestBody FishBone fishBone) throws URISyntaxException {
        log.debug("REST request to save FishBone : {}", fishBone);
        if (fishBone.getId() != null) {
            throw new BadRequestAlertException("A new fishBone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FishBone result = fishBoneRepository.save(fishBone);
        return ResponseEntity.created(new URI("/api/fish-bones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fish-bones} : Updates an existing fishBone.
     *
     * @param fishBone the fishBone to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fishBone,
     * or with status {@code 400 (Bad Request)} if the fishBone is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fishBone couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fish-bones")
    public ResponseEntity<FishBone> updateFishBone(@Valid @RequestBody FishBone fishBone) throws URISyntaxException {
        log.debug("REST request to update FishBone : {}", fishBone);
        if (fishBone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FishBone result = fishBoneRepository.save(fishBone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, fishBone.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fish-bones} : get all the fishBones.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fishBones in body.
     */
    @GetMapping("/fish-bones")
    public List<FishBone> getAllFishBones() {
        log.debug("REST request to get all FishBones");
        return fishBoneRepository.findAll();
    }

    /**
     * {@code GET  /fish-bones/:id} : get the "id" fishBone.
     *
     * @param id the id of the fishBone to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fishBone, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fish-bones/{id}")
    public ResponseEntity<FishBone> getFishBone(@PathVariable Long id) {
        log.debug("REST request to get FishBone : {}", id);
        Optional<FishBone> fishBone = fishBoneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fishBone);
    }

    /**
     * {@code GET  /fish-bones/root-cause/:rootCauseId} : get all the fishBones.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fishBones in body.
     */
    @GetMapping("/fish-bones/root-cause/{rootCauseId}")
    public List<FishBone> getAllRootCauseFishBones(@PathVariable Long rootCauseId) {
        log.debug("REST request to get all FishBones belonging to the root cause: {}", rootCauseId);
        return fishBoneRepository.findAllByRootCauseId(rootCauseId);
    }

    /**
     * {@code DELETE  /fish-bones/:id} : delete the "id" fishBone.
     *
     * @param id the id of the fishBone to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fish-bones/{id}")
    public ResponseEntity<Void> deleteFishBone(@PathVariable Long id) {
        log.debug("REST request to delete FishBone : {}", id);
        fishBoneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
