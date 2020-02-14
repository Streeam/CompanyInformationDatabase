package com.streeam.cid.service;

import com.streeam.cid.domain.AuditNonConformance;
import com.streeam.cid.repository.AuditNonConformanceRepository;
import com.streeam.cid.service.dto.AuditNonConformanceDTO;
import com.streeam.cid.service.mapper.AuditNonConformanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link AuditNonConformance}.
 */
@Service
@Transactional
public class AuditNonConformanceService {

    private final Logger log = LoggerFactory.getLogger(AuditNonConformanceService.class);

    private final AuditNonConformanceRepository auditNonConformanceRepository;

    private final AuditNonConformanceMapper auditNonConformanceMapper;

    public AuditNonConformanceService(AuditNonConformanceRepository auditNonConformanceRepository, AuditNonConformanceMapper auditNonConformanceMapper) {
        this.auditNonConformanceRepository = auditNonConformanceRepository;
        this.auditNonConformanceMapper = auditNonConformanceMapper;
    }

    /**
     * Save a auditNonConformance.
     *
     * @param auditNonConformanceDTO the entity to save.
     * @return the persisted entity.
     */
    public AuditNonConformanceDTO save(AuditNonConformanceDTO auditNonConformanceDTO) {
        log.debug("Request to save AuditNonConformance : {}", auditNonConformanceDTO);
        AuditNonConformance auditNonConformance = auditNonConformanceMapper.toEntity(auditNonConformanceDTO);
        auditNonConformance = auditNonConformanceRepository.save(auditNonConformance);
        return auditNonConformanceMapper.toDto(auditNonConformance);
    }

    /**
     * Get all the auditNonConformances.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AuditNonConformanceDTO> findAll() {
        log.debug("Request to get all AuditNonConformances");
        return auditNonConformanceRepository.findAll().stream()
            .map(auditNonConformanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one auditNonConformance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AuditNonConformanceDTO> findOne(Long id) {
        log.debug("Request to get AuditNonConformance : {}", id);
        return auditNonConformanceRepository.findById(id)
            .map(auditNonConformanceMapper::toDto);
    }

    /**
     * Delete the auditNonConformance by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AuditNonConformance : {}", id);
        auditNonConformanceRepository.deleteById(id);
    }
}
