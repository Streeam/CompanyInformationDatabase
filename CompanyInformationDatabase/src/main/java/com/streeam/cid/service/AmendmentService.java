package com.streeam.cid.service;

import com.streeam.cid.domain.Amendment;
import com.streeam.cid.repository.AmendmentRepository;
import com.streeam.cid.service.dto.AmendmentDTO;
import com.streeam.cid.service.mapper.AmendmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Amendment}.
 */
@Service
@Transactional
public class AmendmentService {

    private final Logger log = LoggerFactory.getLogger(AmendmentService.class);

    private final AmendmentRepository amendmentRepository;

    private final AmendmentMapper amendmentMapper;

    public AmendmentService(AmendmentRepository amendmentRepository, AmendmentMapper amendmentMapper) {
        this.amendmentRepository = amendmentRepository;
        this.amendmentMapper = amendmentMapper;
    }

    /**
     * Save a amendment.
     *
     * @param amendmentDTO the entity to save.
     * @return the persisted entity.
     */
    public AmendmentDTO save(AmendmentDTO amendmentDTO) {
        log.debug("Request to save Amendment : {}", amendmentDTO);
        Amendment amendment = amendmentMapper.toEntity(amendmentDTO);
        amendment = amendmentRepository.save(amendment);
        return amendmentMapper.toDto(amendment);
    }

    /**
     * Get all the amendments.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AmendmentDTO> findAll() {
        log.debug("Request to get all Amendments");
        return amendmentRepository.findAll().stream()
            .map(amendmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one amendment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AmendmentDTO> findOne(Long id) {
        log.debug("Request to get Amendment : {}", id);
        return amendmentRepository.findById(id)
            .map(amendmentMapper::toDto);
    }

    /**
     * Delete the amendment by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Amendment : {}", id);
        amendmentRepository.deleteById(id);
    }
}
