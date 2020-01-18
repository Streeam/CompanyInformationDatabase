package com.streeam.cid.web.rest;

import com.streeam.cid.service.CompanyService;
import com.streeam.cid.service.ProductService;
import com.streeam.cid.service.RoutingService;
import com.streeam.cid.service.dto.ProductDTO;
import com.streeam.cid.service.dto.RoutingDTO;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.Routing}.
 */
@RestController
@RequestMapping("/api")
public class RoutingResource {

    private final Logger log = LoggerFactory.getLogger(RoutingResource.class);

    private static final String ENTITY_NAME = "routing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private CompanyService companyService;
    @Autowired
    private ProductService productService;

    private final RoutingService routingService;

    public RoutingResource(RoutingService routingService) {
        this.routingService = routingService;
    }

    /**
     * {@code POST  /routings} : Create a new routing.
     *
     * @param routingDTO the routingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new routingDTO, or with status {@code 400 (Bad Request)} if the routing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/routings")
    public ResponseEntity<RoutingDTO> createRouting(@Valid @RequestBody RoutingDTO routingDTO) throws URISyntaxException {
        log.debug("REST request to save Routing : {}", routingDTO);
        if (routingDTO.getId() != null) {
            throw new BadRequestAlertException("A new routing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoutingDTO result = routingService.save(routingDTO);
        return ResponseEntity.created(new URI("/api/routings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code POST  /routings/batch} : Save multiple products in batches.
     * @param routingList of routings to save.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated routingDTO,
     * or with status {@code 400 (Bad Request)} if the list is not valid,
     * or with status {@code 500 (Internal Server Error)} if the list couldn't be saved.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/routings/batches")
    public ResponseEntity<Void> createInBatchesRoutings(@RequestBody List<RoutingDTO> routingList) throws URISyntaxException {
        log.warn("Size - ",routingList.size());
        routingService.saveInBatch(routingList);
        return ResponseEntity.ok().build();
    }

    /**
     * {@code PUT  /routings} : Updates an existing routing.
     *
     * @param routingDTO the routingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated routingDTO,
     * or with status {@code 400 (Bad Request)} if the routingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the routingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/routings")
    public ResponseEntity<RoutingDTO> updateRouting(@Valid @RequestBody RoutingDTO routingDTO) throws URISyntaxException {
        log.debug("REST request to update Routing : {}", routingDTO);
        if (routingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RoutingDTO result = routingService.save(routingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, routingDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /routings} : get all the routings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of routings in body.
     */
    @GetMapping("/routings")
    public List<RoutingDTO> getAllRoutings() {
        log.debug("REST request to get all Routings");
        return routingService.findAll();
    }

    /**
     * {@code GET  /routings/all} : get all the routings from the current company company;
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of routings in body.
     */
    @GetMapping("/routings/all")
    public ResponseEntity<List<RoutingDTO>> getAllRoutingsFromCompany()  {
        log.debug("REST request to get all company's routings");

        List<RoutingDTO> routings = routingService.findAll();
        return ResponseEntity.ok().body(routings);
    }

    /**
     * {@code GET  /routings/product/:productId} : get all the routings from a product;
     * @param productId the id of the productDTO.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boms in body.
     */
    @GetMapping("/routings/product/{productId}")
    public ResponseEntity<List<RoutingDTO>> getParentsRoutings(@PathVariable Long productId)  {
        ProductDTO productDTO = productService.findOne(productId).orElseThrow(() -> new BadRequestAlertException("Invalid routing id", ENTITY_NAME, "idnull"));
        List<RoutingDTO> routings = routingService.findAllByPartNumber(productDTO.getPartNumber());
        return ResponseEntity.ok().body(routings);
    }

    /**
     * {@code GET  /routings/:id} : get the "id" routing.
     *
     * @param id the id of the routingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the routingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/routings/{id}")
    public ResponseEntity<RoutingDTO> getRouting(@PathVariable Long id) {
        log.debug("REST request to get Routing : {}", id);
        Optional<RoutingDTO> routingDTO = routingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(routingDTO);
    }

    /**
     * {@code DELETE  /routings/:id} : delete the "id" routing.
     *
     * @param id the id of the routingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/routings/{id}")
    public ResponseEntity<Void> deleteRouting(@PathVariable Long id) {
        log.debug("REST request to delete Routing : {}", id);
        routingService.deleteAndUpdateParent(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
