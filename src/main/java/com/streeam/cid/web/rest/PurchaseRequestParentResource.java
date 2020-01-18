package com.streeam.cid.web.rest;

import com.streeam.cid.service.PurchaseRequestParentService;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import com.streeam.cid.service.dto.PurchaseRequestParentDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.PurchaseRequestParent}.
 */
@RestController
@RequestMapping("/api")
public class PurchaseRequestParentResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseRequestParentResource.class);

    private static final String ENTITY_NAME = "purchaseRequestParent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchaseRequestParentService purchaseRequestParentService;

    public PurchaseRequestParentResource(PurchaseRequestParentService purchaseRequestParentService) {
        this.purchaseRequestParentService = purchaseRequestParentService;
    }

    /**
     * {@code POST  /purchase-request-parents} : Create a new purchaseRequestParent.
     *
     * @param purchaseRequestParentDTO the purchaseRequestParentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchaseRequestParentDTO, or with status {@code 400 (Bad Request)} if the purchaseRequestParent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchase-request-parents")
    public ResponseEntity<PurchaseRequestParentDTO> createPurchaseRequestParent(@Valid @RequestBody PurchaseRequestParentDTO purchaseRequestParentDTO) throws URISyntaxException {
        log.debug("REST request to save PurchaseRequestParent : {}", purchaseRequestParentDTO);
        if (purchaseRequestParentDTO.getId() != null) {
            throw new BadRequestAlertException("A new purchaseRequestParent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseRequestParentDTO result = purchaseRequestParentService.save(purchaseRequestParentDTO);
        return ResponseEntity.created(new URI("/api/purchase-request-parents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchase-request-parents} : Updates an existing purchaseRequestParent.
     *
     * @param purchaseRequestParentDTO the purchaseRequestParentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchaseRequestParentDTO,
     * or with status {@code 400 (Bad Request)} if the purchaseRequestParentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchaseRequestParentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchase-request-parents")
    public ResponseEntity<PurchaseRequestParentDTO> updatePurchaseRequestParent(@Valid @RequestBody PurchaseRequestParentDTO purchaseRequestParentDTO) throws URISyntaxException {
        log.debug("REST request to update PurchaseRequestParent : {}", purchaseRequestParentDTO);
        if (purchaseRequestParentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseRequestParentDTO result = purchaseRequestParentService.save(purchaseRequestParentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purchaseRequestParentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purchase-request-parents} : get all the purchaseRequestParents.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchaseRequestParents in body.
     */
    @GetMapping("/purchase-request-parents")
    public ResponseEntity<List<PurchaseRequestParentDTO>> getAllPurchaseRequestParents(Pageable pageable) {
        log.debug("REST request to get a page of PurchaseRequestParents");
        Page<PurchaseRequestParentDTO> page = purchaseRequestParentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /purchase-request-parents/:id} : get the "id" purchaseRequestParent.
     *
     * @param id the id of the purchaseRequestParentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchaseRequestParentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchase-request-parents/{id}")
    public ResponseEntity<PurchaseRequestParentDTO> getPurchaseRequestParent(@PathVariable Long id) {
        log.debug("REST request to get PurchaseRequestParent : {}", id);
        Optional<PurchaseRequestParentDTO> purchaseRequestParentDTO = purchaseRequestParentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(purchaseRequestParentDTO);
    }

    /**
     * {@code DELETE  /purchase-request-parents/:id} : delete the "id" purchaseRequestParent.
     *
     * @param id the id of the purchaseRequestParentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchase-request-parents/{id}")
    public ResponseEntity<Void> deletePurchaseRequestParent(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseRequestParent : {}", id);
        purchaseRequestParentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
