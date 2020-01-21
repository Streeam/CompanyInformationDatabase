package com.streeam.cid.web.rest;

import com.streeam.cid.service.BomService;
import com.streeam.cid.service.ProductService;
import com.streeam.cid.service.dto.BomDTO;
import com.streeam.cid.service.dto.ProductDTO;
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
import java.util.Set;

/**
 * REST controller for managing {@link com.streeam.cid.domain.Bom}.
 */
@RestController
@RequestMapping("/api")
public class BomResource {

    private final Logger log = LoggerFactory.getLogger(BomResource.class);

    @Autowired
    private ProductService productService;

    private static final String ENTITY_NAME = "bom";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BomService bomService;

    public BomResource(BomService bomService) {
        this.bomService = bomService;
    }

    /**
     * {@code POST  /boms} : Create a new bom.
     *
     * @param bomDTO the bomDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bomDTO, or with status {@code 400 (Bad Request)} if the bom has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/boms")
    public ResponseEntity<BomDTO> createBom(@Valid @RequestBody BomDTO bomDTO) throws URISyntaxException {
        log.debug("REST request to save Bom : {}", bomDTO);
        if (bomDTO.getId() != null) {
            throw new BadRequestAlertException("A new bom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BomDTO result = bomService.save(bomDTO);
        ProductDTO productToSave = productService.findOneByPartNumber(bomDTO.getPartNumber()).orElseThrow(()->
            new BadRequestAlertException("No product with this ID", ENTITY_NAME, "idexists"));
        Set<BomDTO> boms = productToSave.getBoms();
        boms.add(result);
        productToSave.setBoms(boms);
        productService.save(productToSave);
        return ResponseEntity.created(new URI("/api/boms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code POST  /boms/batch} : Save multiple boms in batches.
     * @param bomList of boms to save.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)},
     * or with status {@code 400 (Bad Request)} if the list is not valid,
     * or with status {@code 500 (Internal Server Error)} if the list couldn't be saved.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/boms/batches")
    public ResponseEntity<Void> createInBatchesBoms(@RequestBody List<BomDTO> bomList) throws URISyntaxException {
        log.warn("Size - ",bomList.size());
        bomService.saveInBatch(bomList);
        return ResponseEntity.ok().build();
    }

    /**
     * {@code PUT  /boms} : Updates an existing bom.
     *
     * @param bomDTO the bomDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bomDTO,
     * or with status {@code 400 (Bad Request)} if the bomDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bomDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */

    @PutMapping("/boms")
    public ResponseEntity<BomDTO> updateBom(@Valid @RequestBody BomDTO bomDTO) throws URISyntaxException {
        log.debug("REST request to update Bom : {}", bomDTO);
        if (bomDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BomDTO result = bomService.save(bomDTO);
        ProductDTO productToSave = productService.findOneByPartNumber(bomDTO.getPartNumber()).orElseThrow(()->
            new BadRequestAlertException("No product with this ID", ENTITY_NAME, "idexists"));
        Set<BomDTO> boms = productToSave.getBoms();
        boms.add(result);
        productToSave.setBoms(boms);
        productService.save(productToSave);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bomDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /boms/all} : get all the routings;
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boms in body.
     */
    @GetMapping("/boms/all")
    public ResponseEntity<List<BomDTO>> getAllBomsFromCompany()  {

        List<BomDTO> boms = bomService.findAll();
        return ResponseEntity.ok().body(boms);
    }

    /**
     * {@code GET  /boms/product/:productId} : get all the boms from a product;
     * @param productId the id of the productDTO.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boms in body.
     */
    @GetMapping("/boms/product/{productId}")
    public ResponseEntity<List<BomDTO>> getParentsBoms(@PathVariable Long productId)  {
        ProductDTO productDTO = productService.findOne(productId).orElseThrow(() -> new BadRequestAlertException("Invalid product id", ENTITY_NAME, "idnull"));
        List<BomDTO> boms = bomService.findAllByPartNumber(productDTO.getPartNumber());
        return ResponseEntity.ok().body(boms);
    }


    /**
     * {@code GET  /boms} : get all the boms.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boms in body.
     */
    @GetMapping("/boms")
    public List<BomDTO> getAllBoms() {
        log.debug("REST request to get all Boms");
        return bomService.findAll();
    }

    /**
     * {@code GET  /boms/:id} : get the "id" bom.
     *
     * @param id the id of the bomDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bomDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/boms/{id}")
    public ResponseEntity<BomDTO> getBom(@PathVariable Long id) {
        log.debug("REST request to get Bom : {}", id);
        Optional<BomDTO> bomDTO = bomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bomDTO);
    }

    /**
     * {@code DELETE  /boms/:id} : delete the "id" bom.
     *
     * @param id the id of the bomDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/boms/{id}")
    public ResponseEntity<Void> deleteBom(@PathVariable Long id) {
        log.debug("REST request to delete Bom : {}", id);
        bomService.deleteAndUpdateParent(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
