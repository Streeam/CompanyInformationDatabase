package com.streeam.cid.service;

import com.streeam.cid.domain.Prototype;
import com.streeam.cid.repository.PrototypeRepository;
import com.streeam.cid.service.dto.PrototypeDTO;
import com.streeam.cid.service.mapper.PrototypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Prototype}.
 */
@Service
@Transactional
public class PrototypeService {

    private final Logger log = LoggerFactory.getLogger(PrototypeService.class);

    private final PrototypeRepository prototypeRepository;

    private final PrototypeMapper prototypeMapper;

    public PrototypeService(PrototypeRepository prototypeRepository, PrototypeMapper prototypeMapper) {
        this.prototypeRepository = prototypeRepository;
        this.prototypeMapper = prototypeMapper;
    }

    /**
     * Save a prototype.
     *
     * @param prototypeDTO the entity to save.
     * @return the persisted entity.
     */
    public PrototypeDTO save(PrototypeDTO prototypeDTO) {
        log.debug("Request to save Prototype : {}", prototypeDTO);
        Prototype prototype = prototypeMapper.toEntity(prototypeDTO);
        prototype = prototypeRepository.save(prototype);
        return prototypeMapper.toDto(prototype);
    }

    /**
     * Get all the prototypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PrototypeDTO> findAll() {
        log.debug("Request to get all Prototypes");
        return prototypeRepository.findAll().stream()
            .map(prototypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one prototype by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PrototypeDTO> findOne(Long id) {
        log.debug("Request to get Prototype : {}", id);
        return prototypeRepository.findById(id)
            .map(prototypeMapper::toDto);
    }

    /**
     * Delete the prototype by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Prototype : {}", id);
        prototypeRepository.deleteById(id);
    }
}
