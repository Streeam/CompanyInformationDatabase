package com.streeam.cid.service;

import com.streeam.cid.domain.SupplierNonConformance;
import com.streeam.cid.repository.SupplierNonConformanceRepository;
import com.streeam.cid.service.dto.SupplierNonConformanceDTO;
import com.streeam.cid.service.mapper.SupplierNonConformanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link SupplierNonConformance}.
 */
@Service
@Transactional
public class SupplierNonConformanceService {

    private final Logger log = LoggerFactory.getLogger(SupplierNonConformanceService.class);

    private final SupplierNonConformanceRepository supplierNonConformanceRepository;

    private final SupplierNonConformanceMapper supplierNonConformanceMapper;

    public SupplierNonConformanceService(SupplierNonConformanceRepository supplierNonConformanceRepository, SupplierNonConformanceMapper supplierNonConformanceMapper) {
        this.supplierNonConformanceRepository = supplierNonConformanceRepository;
        this.supplierNonConformanceMapper = supplierNonConformanceMapper;
    }

    /**
     * Save a supplierNonConformance.
     *
     * @param supplierNonConformanceDTO the entity to save.
     * @return the persisted entity.
     */
    public SupplierNonConformanceDTO save(SupplierNonConformanceDTO supplierNonConformanceDTO) {
        log.debug("Request to save SupplierNonConformance : {}", supplierNonConformanceDTO);
        SupplierNonConformance supplierNonConformance = supplierNonConformanceMapper.toEntity(supplierNonConformanceDTO);
        supplierNonConformance = supplierNonConformanceRepository.save(supplierNonConformance);
        return supplierNonConformanceMapper.toDto(supplierNonConformance);
    }

    /**
     * Get all the supplierNonConformances.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SupplierNonConformanceDTO> findAll() {
        log.debug("Request to get all SupplierNonConformances");
        return supplierNonConformanceRepository.findAll().stream()
            .map(supplierNonConformanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one supplierNonConformance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<SupplierNonConformanceDTO> findOne(Long id) {
        log.debug("Request to get SupplierNonConformance : {}", id);
        return supplierNonConformanceRepository.findById(id)
            .map(supplierNonConformanceMapper::toDto);
    }

    /**
     * Delete the supplierNonConformance by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete SupplierNonConformance : {}", id);
        supplierNonConformanceRepository.deleteById(id);
    }
}
