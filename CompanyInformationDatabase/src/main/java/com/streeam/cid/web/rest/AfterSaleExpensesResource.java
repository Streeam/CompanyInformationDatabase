package com.streeam.cid.web.rest;

import com.streeam.cid.domain.AfterSaleExpenses;
import com.streeam.cid.repository.AfterSaleExpensesRepository;
import com.streeam.cid.service.ClientNonConformanceService;
import com.streeam.cid.service.dto.ClientNonConformanceDTO;
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
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.AfterSaleExpenses}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AfterSaleExpensesResource {

    private final Logger log = LoggerFactory.getLogger(AfterSaleExpensesResource.class);
    @Autowired
    private ClientNonConformanceService clientNonConformanceService;

    private static final String ENTITY_NAME = "afterSaleExpenses";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AfterSaleExpensesRepository afterSaleExpensesRepository;

    public AfterSaleExpensesResource(AfterSaleExpensesRepository afterSaleExpensesRepository) {
        this.afterSaleExpensesRepository = afterSaleExpensesRepository;
    }

    /**
     * {@code POST  /after-sale-expenses} : Create a new afterSaleExpenses.
     *
     * @param afterSaleExpenses the afterSaleExpenses to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new afterSaleExpenses, or with status {@code 400 (Bad Request)} if the afterSaleExpenses has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/after-sale-expenses")
    public ResponseEntity<AfterSaleExpenses> createAfterSaleExpenses(@Valid @RequestBody AfterSaleExpenses afterSaleExpenses) throws URISyntaxException {
        log.debug("REST request to save AfterSaleExpenses : {}", afterSaleExpenses);
        if (afterSaleExpenses.getId() != null) {
            throw new BadRequestAlertException("A new afterSaleExpenses cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AfterSaleExpenses result = afterSaleExpensesRepository.save(afterSaleExpenses);
        return ResponseEntity.created(new URI("/api/after-sale-expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /after-sale-expenses} : Updates an existing afterSaleExpenses.
     *
     * @param afterSaleExpenses the afterSaleExpenses to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated afterSaleExpenses,
     * or with status {@code 400 (Bad Request)} if the afterSaleExpenses is not valid,
     * or with status {@code 500 (Internal Server Error)} if the afterSaleExpenses couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/after-sale-expenses")
    public ResponseEntity<AfterSaleExpenses> updateAfterSaleExpenses(@Valid @RequestBody AfterSaleExpenses afterSaleExpenses) throws URISyntaxException {
        log.debug("REST request to update AfterSaleExpenses : {}", afterSaleExpenses);
        if (afterSaleExpenses.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AfterSaleExpenses result = afterSaleExpensesRepository.save(afterSaleExpenses);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, afterSaleExpenses.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /after-sale-expenses} : get all the afterSaleExpenses.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of afterSaleExpenses in body.
     */
    @GetMapping("/after-sale-expenses")
    public List<AfterSaleExpenses> getAllAfterSaleExpenses() {
        log.debug("REST request to get all AfterSaleExpenses");
        return afterSaleExpensesRepository.findAll();
    }

    /**
     * {@code GET  /after-sale-expenses/:id} : get the "id" afterSaleExpenses.
     *
     * @param id the id of the afterSaleExpenses to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the afterSaleExpenses, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/after-sale-expenses/{id}")
    public ResponseEntity<AfterSaleExpenses> getAfterSaleExpenses(@PathVariable Long id) {
        log.debug("REST request to get AfterSaleExpenses : {}", id);
        Optional<AfterSaleExpenses> afterSaleExpenses = afterSaleExpensesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(afterSaleExpenses);
    }
    /**
     * {@code GET  /after-sale-expenses/non-conformance-details/:nonconformanceDetailsid} : get all the afterSaleExpenses by nonconformanceDetailsid.
     *
     * @param nonconformanceDetailsid the id of the afterSaleExpenses to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the afterSaleExpenses, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/after-sale-expenses/non-conformance-details/{nonconformanceDetailsid}")
    public List<AfterSaleExpenses> getAllAfterSalesCostsByNonConformaceId(@PathVariable Long nonconformanceDetailsid) {
        log.debug("REST request to get all AfterSaleExpenses of : {}", nonconformanceDetailsid);
        List<ClientNonConformanceDTO> clientNonConformances = clientNonConformanceService.findAllByNonconformanceDetailsId(nonconformanceDetailsid);
        List<AfterSaleExpenses> afterSaleExpensesList = new LinkedList<>();
        clientNonConformances.forEach(client -> {
            List<AfterSaleExpenses> afterSaleExpensesSubList = afterSaleExpensesRepository.findAllByCustomerNonConformanceId(client.getId());
            afterSaleExpensesList.addAll(afterSaleExpensesSubList);
        });
        return afterSaleExpensesList;
    }
    /**
     * {@code GET  /after-sale-expenses/non-conformance-customer/:customerNonConformanceId} : get all the afterSaleExpenses by nonconformanceDetailsid.
     *
     * @param customerNonConformanceId the id of the customer non-conformance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the afterSaleExpenses, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/after-sale-expenses/non-conformance-customer/{customerNonConformanceId}")
    public List<AfterSaleExpenses> getAllAfterSalesCostsByCustomerNonConformaceId(@PathVariable Long customerNonConformanceId) {
        log.debug("REST request to get all AfterSaleExpenses of customer Non-Conformance: {}", customerNonConformanceId);
        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAllByCustomerNonConformanceId(customerNonConformanceId);
        return afterSaleExpensesList;
    }
    /**
     * {@code DELETE  /after-sale-expenses/:id} : delete the "id" afterSaleExpenses.
     *
     * @param id the id of the afterSaleExpenses to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/after-sale-expenses/{id}")
    public ResponseEntity<Void> deleteAfterSaleExpenses(@PathVariable Long id) {
        log.debug("REST request to delete AfterSaleExpenses : {}", id);
        afterSaleExpensesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
