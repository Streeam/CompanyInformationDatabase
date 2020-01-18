package com.streeam.cid.service;

import com.streeam.cid.domain.NonConformanceType;
import com.streeam.cid.repository.NonConformanceTypeRepository;
import com.streeam.cid.service.dto.NonConformanceTypeDTO;
import com.streeam.cid.service.mapper.NonConformanceTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link NonConformanceType}.
 */
@Service
@Transactional
public class NonConformanceTypeService {

    private final Logger log = LoggerFactory.getLogger(NonConformanceTypeService.class);

    private final NonConformanceTypeRepository nonConformanceTypeRepository;

    private final NonConformanceTypeMapper nonConformanceTypeMapper;

    public NonConformanceTypeService(NonConformanceTypeRepository nonConformanceTypeRepository, NonConformanceTypeMapper nonConformanceTypeMapper) {
        this.nonConformanceTypeRepository = nonConformanceTypeRepository;
        this.nonConformanceTypeMapper = nonConformanceTypeMapper;
    }

    /**
     * Save a nonConformanceType.
     *
     * @param nonConformanceTypeDTO the entity to save.
     * @return the persisted entity.
     */
    public NonConformanceTypeDTO save(NonConformanceTypeDTO nonConformanceTypeDTO) {
        log.debug("Request to save NonConformanceType : {}", nonConformanceTypeDTO);
        NonConformanceType nonConformanceType = nonConformanceTypeMapper.toEntity(nonConformanceTypeDTO);
        nonConformanceType = nonConformanceTypeRepository.save(nonConformanceType);
        return nonConformanceTypeMapper.toDto(nonConformanceType);
    }

    /**
     * Get all the nonConformanceTypes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<NonConformanceTypeDTO> findAll() {
        log.debug("Request to get all NonConformanceTypes");
        return nonConformanceTypeRepository.findAll().stream()
            .map(nonConformanceTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one nonConformanceType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NonConformanceTypeDTO> findOne(Long id) {
        log.debug("Request to get NonConformanceType : {}", id);
        return nonConformanceTypeRepository.findById(id)
            .map(nonConformanceTypeMapper::toDto);
    }

    /**
     * Delete the nonConformanceType by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete NonConformanceType : {}", id);
        nonConformanceTypeRepository.deleteById(id);
    }
}
