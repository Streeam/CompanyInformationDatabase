package com.streeam.cid.web.rest;

import com.streeam.cid.service.DrawingService;
import com.streeam.cid.service.dto.DrawingDTO;
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
 * REST controller for managing {@link com.streeam.cid.domain.Drawing}.
 */
@RestController
@RequestMapping("/api")
public class DrawingResource {

    private final Logger log = LoggerFactory.getLogger(DrawingResource.class);

    private static final String ENTITY_NAME = "drawing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DrawingService drawingService;

    public DrawingResource(DrawingService drawingService) {
        this.drawingService = drawingService;
    }

    /**
     * {@code POST  /drawings} : Create a new drawing.
     *
     * @param drawingDTO the drawingDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new drawingDTO, or with status {@code 400 (Bad Request)} if the drawing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/drawings")
    public ResponseEntity<DrawingDTO> createDrawing(@Valid @RequestBody DrawingDTO drawingDTO) throws URISyntaxException {
        log.debug("REST request to save Drawing : {}", drawingDTO);
        if (drawingDTO.getId() != null) {
            throw new BadRequestAlertException("A new drawing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DrawingDTO result = drawingService.save(drawingDTO);
        return ResponseEntity.created(new URI("/api/drawings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /drawings} : Updates an existing drawing.
     *
     * @param drawingDTO the drawingDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated drawingDTO,
     * or with status {@code 400 (Bad Request)} if the drawingDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the drawingDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/drawings")
    public ResponseEntity<DrawingDTO> updateDrawing(@Valid @RequestBody DrawingDTO drawingDTO) throws URISyntaxException {
        log.debug("REST request to update Drawing : {}", drawingDTO);
        if (drawingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DrawingDTO result = drawingService.save(drawingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, drawingDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /drawings} : get all the drawings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of drawings in body.
     */
    @GetMapping("/drawings")
    public List<DrawingDTO> getAllDrawings() {
        log.debug("REST request to get all Drawings");
        return drawingService.findAll();
    }

    /**
     * {@code GET  /drawings/:id} : get the "id" drawing.
     *
     * @param id the id of the drawingDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the drawingDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/drawings/{id}")
    public ResponseEntity<DrawingDTO> getDrawing(@PathVariable Long id) {
        log.debug("REST request to get Drawing : {}", id);
        Optional<DrawingDTO> drawingDTO = drawingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(drawingDTO);
    }

    /**
     * {@code DELETE  /drawings/:id} : delete the "id" drawing.
     *
     * @param id the id of the drawingDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/drawings/{id}")
    public ResponseEntity<Void> deleteDrawing(@PathVariable Long id) {
        log.debug("REST request to delete Drawing : {}", id);
        drawingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

}
