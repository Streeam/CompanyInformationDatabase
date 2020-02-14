package com.streeam.cid.web.rest;

import com.streeam.cid.service.PurchaseRequestChildService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.PurchaseRequestChildDTO;

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
 * REST controller for managing {@link com.streeam.cid.domain.PurchaseRequestChild}.
 */
@RestController
@RequestMapping("/api")
public class PurchaseRequestChildResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseRequestChildResource.class);

    private static final String ENTITY_NAME = "purchaseRequestChild";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchaseRequestChildService purchaseRequestChildService;

    public PurchaseRequestChildResource(PurchaseRequestChildService purchaseRequestChildService) {
        this.purchaseRequestChildService = purchaseRequestChildService;
    }

    /**
     * {@code POST  /purchase-request-children} : Create a new purchaseRequestChild.
     *
     * @param purchaseRequestChildDTO the purchaseRequestChildDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchaseRequestChildDTO, or with status {@code 400 (Bad Request)} if the purchaseRequestChild has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchase-request-children")
    public ResponseEntity<PurchaseRequestChildDTO> createPurchaseRequestChild(@Valid @RequestBody PurchaseRequestChildDTO purchaseRequestChildDTO) throws URISyntaxException {
        log.debug("REST request to save PurchaseRequestChild : {}", purchaseRequestChildDTO);
        if (purchaseRequestChildDTO.getId() != null) {
            throw new BadRequestAlertException("A new purchaseRequestChild cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseRequestChildDTO result = purchaseRequestChildService.save(purchaseRequestChildDTO);
        return ResponseEntity.created(new URI("/api/purchase-request-children/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchase-request-children} : Updates an existing purchaseRequestChild.
     *
     * @param purchaseRequestChildDTO the purchaseRequestChildDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchaseRequestChildDTO,
     * or with status {@code 400 (Bad Request)} if the purchaseRequestChildDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchaseRequestChildDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchase-request-children")
    public ResponseEntity<PurchaseRequestChildDTO> updatePurchaseRequestChild(@Valid @RequestBody PurchaseRequestChildDTO purchaseRequestChildDTO) throws URISyntaxException {
        log.debug("REST request to update PurchaseRequestChild : {}", purchaseRequestChildDTO);
        if (purchaseRequestChildDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseRequestChildDTO result = purchaseRequestChildService.save(purchaseRequestChildDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purchaseRequestChildDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purchase-request-children} : get all the purchaseRequestChildren.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchaseRequestChildren in body.
     */
    @GetMapping("/purchase-request-children")
    public List<PurchaseRequestChildDTO> getAllPurchaseRequestChildren() {
        log.debug("REST request to get all PurchaseRequestChildren");
        return purchaseRequestChildService.findAll();
    }

    /**
     * {@code GET  /purchase-request-children/:id} : get the "id" purchaseRequestChild.
     *
     * @param id the id of the purchaseRequestChildDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchaseRequestChildDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchase-request-children/{id}")
    public ResponseEntity<PurchaseRequestChildDTO> getPurchaseRequestChild(@PathVariable Long id) {
        log.debug("REST request to get PurchaseRequestChild : {}", id);
        Optional<PurchaseRequestChildDTO> purchaseRequestChildDTO = purchaseRequestChildService.findOne(id);
        return ResponseUtil.wrapOrNotFound(purchaseRequestChildDTO);
    }

    /**
     * {@code DELETE  /purchase-request-children/:id} : delete the "id" purchaseRequestChild.
     *
     * @param id the id of the purchaseRequestChildDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchase-request-children/{id}")
    public ResponseEntity<Void> deletePurchaseRequestChild(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseRequestChild : {}", id);
        purchaseRequestChildService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
