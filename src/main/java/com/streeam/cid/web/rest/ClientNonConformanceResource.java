package com.streeam.cid.web.rest;

import com.streeam.cid.service.ClientNonConformanceService;
import com.streeam.cid.service.dto.ClientNonConformanceDTO;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing {@link com.streeam.cid.domain.ClientNonConformance}.
 */
@RestController
@RequestMapping("/api")
public class ClientNonConformanceResource {

    private final Logger log = LoggerFactory.getLogger(ClientNonConformanceResource.class);

    private static final String ENTITY_NAME = "clientNonConformance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientNonConformanceService clientNonConformanceService;

    public ClientNonConformanceResource(ClientNonConformanceService clientNonConformanceService) {
        this.clientNonConformanceService = clientNonConformanceService;
    }

    /**
     * {@code POST  /client-non-conformances} : Create a new clientNonConformance.
     *
     * @param clientNonConformanceDTO the clientNonConformanceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientNonConformanceDTO, or with status {@code 400 (Bad Request)} if the clientNonConformance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/client-non-conformances")
    public ResponseEntity<ClientNonConformanceDTO> createClientNonConformance(@Valid @RequestBody ClientNonConformanceDTO clientNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to save ClientNonConformance : {}", clientNonConformanceDTO);
        if (clientNonConformanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new clientNonConformance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientNonConformanceDTO result = clientNonConformanceService.save(clientNonConformanceDTO);
        return ResponseEntity.created(new URI("/api/client-non-conformances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /client-non-conformances} : Updates an existing clientNonConformance.
     *
     * @param clientNonConformanceDTO the clientNonConformanceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientNonConformanceDTO,
     * or with status {@code 400 (Bad Request)} if the clientNonConformanceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientNonConformanceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/client-non-conformances")
    public ResponseEntity<ClientNonConformanceDTO> updateClientNonConformance(@Valid @RequestBody ClientNonConformanceDTO clientNonConformanceDTO) throws URISyntaxException {
        log.debug("REST request to update ClientNonConformance : {}", clientNonConformanceDTO);
        if (clientNonConformanceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClientNonConformanceDTO result = clientNonConformanceService.save(clientNonConformanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, clientNonConformanceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /client-non-conformances} : get all the clientNonConformances.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clientNonConformances in body.
     */
    @GetMapping("/client-non-conformances")
    public List<ClientNonConformanceDTO> getAllClientNonConformances(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ClientNonConformances");
        return clientNonConformanceService.findAll();
    }

    /**
     * {@code GET  /client-non-conformances/:id} : get the "id" clientNonConformance.
     *
     * @param id the id of the clientNonConformanceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientNonConformanceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/client-non-conformances/{id}")
    public ResponseEntity<ClientNonConformanceDTO> getClientNonConformance(@PathVariable Long id) {
        log.debug("REST request to get ClientNonConformance : {}", id);
        Optional<ClientNonConformanceDTO> clientNonConformanceDTO = clientNonConformanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(clientNonConformanceDTO);
    }
    /**
     * {@code GET  /client-non-conformances/non-conformance-details/{nonconformanceDetailsid}} : get all the internalNonConformances of a nonconformanceDetails.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of internalNonConformances in body.
     */
    @GetMapping("/client-non-conformances/non-conformance-details/{nonconformanceDetailsid}")
    public List<ClientNonConformanceDTO> getAllCustomerNonConformancesOfNonDetails(@RequestParam(required = false, defaultValue = "false") boolean eagerload, @PathVariable Long nonconformanceDetailsid) {
        log.debug("REST request to get all the customerNonConformances of a nonconformanceDetailsid");
        return clientNonConformanceService.findAllByNonconformanceDetailsId(nonconformanceDetailsid);
    }

    /**
     * {@code GET  /client-non-conformances/incomplete-non-conformance-details/{nonconformanceDetailsid}} : get the incomplete customerNonConformances of a nonconformanceDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customerNonConformances in body.
     */
    @GetMapping("/client-non-conformances/incomplete-non-conformance-details/{nonconformanceDetailsid}")
    public ResponseEntity<ClientNonConformanceDTO> getIncompleteCustomerNonConformancesOfNonDetails(@PathVariable Long nonconformanceDetailsid) {
        log.debug("REST request to get the incomplete internalNonConformances of a nonconformanceDetails");
        Optional<ClientNonConformanceDTO> customerNonConformanceDTO = clientNonConformanceService.findOneByIncompleteNonconformanceDetailsId(nonconformanceDetailsid);

        if (customerNonConformanceDTO.isPresent()) {
            return ResponseEntity.ok(customerNonConformanceDTO.get());
        }
        return ResponseEntity.ok(null);
    }
    /**
     * {@code DELETE  /client-non-conformances/:id} : delete the "id" clientNonConformance.
     *
     * @param id the id of the clientNonConformanceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/client-non-conformances/{id}")
    public ResponseEntity<Void> deleteClientNonConformance(@PathVariable Long id) {
        log.debug("REST request to delete ClientNonConformance : {}", id);
        clientNonConformanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
