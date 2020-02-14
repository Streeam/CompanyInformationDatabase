package com.streeam.cid.service;

import com.streeam.cid.domain.Drawing;
import com.streeam.cid.repository.DrawingRepository;
import com.streeam.cid.service.dto.DrawingDTO;
import com.streeam.cid.service.mapper.DrawingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Drawing}.
 */
@Service
@Transactional
public class DrawingService {

    private final Logger log = LoggerFactory.getLogger(DrawingService.class);

    private final DrawingRepository drawingRepository;

    private final DrawingMapper drawingMapper;

    public DrawingService(DrawingRepository drawingRepository, DrawingMapper drawingMapper) {
        this.drawingRepository = drawingRepository;
        this.drawingMapper = drawingMapper;
    }

    /**
     * Save a drawing.
     *
     * @param drawingDTO the entity to save.
     * @return the persisted entity.
     */
    public DrawingDTO save(DrawingDTO drawingDTO) {
        log.debug("Request to save Drawing : {}", drawingDTO);
        Drawing drawing = drawingMapper.toEntity(drawingDTO);
        drawing = drawingRepository.save(drawing);
        return drawingMapper.toDto(drawing);
    }

    /**
     * Get all the drawings.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DrawingDTO> findAll() {
        log.debug("Request to get all Drawings");
        return drawingRepository.findAll().stream()
            .map(drawingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one drawing by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DrawingDTO> findOne(Long id) {
        log.debug("Request to get Drawing : {}", id);
        return drawingRepository.findById(id)
            .map(drawingMapper::toDto);
    }

    /**
     * Delete the drawing by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Drawing : {}", id);
        drawingRepository.deleteById(id);
    }
}
