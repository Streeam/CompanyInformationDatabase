package com.streeam.cid.web.rest;

import com.streeam.cid.domain.ActionToBeTaken;
import com.streeam.cid.repository.ActionToBeTakenRepository;
import com.streeam.cid.service.NonConformanceDetailsService;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * REST controller for managing {@link com.streeam.cid.domain.ActionToBeTaken}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ActionToBeTakenResource {

    private final Logger log = LoggerFactory.getLogger(ActionToBeTakenResource.class);

    private static final String ENTITY_NAME = "actionToBeTaken";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private NonConformanceDetailsService nonConformanceDetailsService;

    private final ActionToBeTakenRepository actionToBeTakenRepository;

    public ActionToBeTakenResource(ActionToBeTakenRepository actionToBeTakenRepository) {
        this.actionToBeTakenRepository = actionToBeTakenRepository;
    }

    /**
     * {@code POST  /root-cause} : Create a new actionToBeTaken.
     *
     * @param actionToBeTaken the actionToBeTaken to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new actionToBeTaken, or with status {@code 400 (Bad Request)} if the actionToBeTaken has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/root-cause")
    public ResponseEntity<ActionToBeTaken> createActionToBeTaken(@Valid @RequestBody ActionToBeTaken actionToBeTaken) throws URISyntaxException {
        log.debug("REST request to save ActionToBeTaken : {}", actionToBeTaken);
        if (actionToBeTaken.getId() != null) {
            throw new BadRequestAlertException("A new actionToBeTaken cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ActionToBeTaken result = actionToBeTakenRepository.save(actionToBeTaken);
        return ResponseEntity.created(new URI("/api/root-cause/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /root-cause} : Updates an existing actionToBeTaken.
     *
     * @param actionToBeTaken the actionToBeTaken to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated actionToBeTaken,
     * or with status {@code 400 (Bad Request)} if the actionToBeTaken is not valid,
     * or with status {@code 500 (Internal Server Error)} if the actionToBeTaken couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/root-cause")
    public ResponseEntity<ActionToBeTaken> updateActionToBeTaken(@Valid @RequestBody ActionToBeTaken actionToBeTaken) throws URISyntaxException {
        log.debug("REST request to update ActionToBeTaken : {}", actionToBeTaken);
        if (actionToBeTaken.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ActionToBeTaken result = actionToBeTakenRepository.save(actionToBeTaken);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, actionToBeTaken.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /root-cause} : get all the actionToBeTakens.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of actionToBeTakens in body.
     */
    @GetMapping("/root-cause")
    public List<ActionToBeTaken> getAllActionToBeTakens() {
        log.debug("REST request to get all ActionToBeTakens");
        return actionToBeTakenRepository.findAll();
    }

    /**
     * {@code GET  /root-cause/:id} : get the "id" actionToBeTaken.
     *
     * @param id the id of the actionToBeTaken to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the actionToBeTaken, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/root-cause/{id}")
    public ResponseEntity<ActionToBeTaken> getActionToBeTaken(@PathVariable Long id) {
        log.debug("REST request to get ActionToBeTaken : {}", id);
        Optional<ActionToBeTaken> actionToBeTaken = actionToBeTakenRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(actionToBeTaken);
    }
    /**
     * {@code GET  /root-cause/nonConformance/:nonConformanceId} : get the actionToBeTaken of the nonConformance.
     *
     * @param nonConformanceId the id of the nonConformance.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the actionToBeTaken, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/root-cause/nonConformance/{nonConformanceId}")
    public ResponseEntity<ActionToBeTaken> getActionToBeTakenOfNonConformance(@PathVariable Long nonConformanceId) {
        log.debug("REST request to get ActionToBeTaken : {}", nonConformanceId);
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsService.findOne(nonConformanceId).orElseThrow(()->
            new BadRequestAlertException("Invalid nonconformance id", ENTITY_NAME, "idnull"));
        Optional<ActionToBeTaken> actionToBeTaken = actionToBeTakenRepository.findOneByNonconformanceId(nonConformanceId);
        return ResponseUtil.wrapOrNotFound(actionToBeTaken);
    }
    /**
     * {@code DELETE  /root-cause/:id} : delete the "id" actionToBeTaken.
     *
     * @param id the id of the actionToBeTaken to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/root-cause/{id}")
    public ResponseEntity<Void> deleteActionToBeTaken(@PathVariable Long id) {
        log.debug("REST request to delete ActionToBeTaken : {}", id);
        actionToBeTakenRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
