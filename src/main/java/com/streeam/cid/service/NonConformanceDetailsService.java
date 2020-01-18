package com.streeam.cid.service;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.NonConformanceDetails;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.repository.NonConformanceDetailsRepository;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;
import com.streeam.cid.service.mapper.NonConformanceDetailsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link NonConformanceDetails}.
 */
@Service
@Transactional
public class NonConformanceDetailsService {

    @Autowired
    private TaskService taskService;

    private final Logger log = LoggerFactory.getLogger(NonConformanceDetailsService.class);

    private final NonConformanceDetailsRepository nonConformanceDetailsRepository;

    private final NonConformanceDetailsMapper nonConformanceDetailsMapper;

    public NonConformanceDetailsService(NonConformanceDetailsRepository nonConformanceDetailsRepository, NonConformanceDetailsMapper nonConformanceDetailsMapper) {
        this.nonConformanceDetailsRepository = nonConformanceDetailsRepository;
        this.nonConformanceDetailsMapper = nonConformanceDetailsMapper;
    }

    /**
     * Save a nonConformanceDetails.
     *
     * @param nonConformanceDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    public NonConformanceDetailsDTO save(NonConformanceDetailsDTO nonConformanceDetailsDTO) {
        log.debug("Request to save NonConformanceDetails : {}", nonConformanceDetailsDTO);
        NonConformanceDetails nonConformanceDetails = nonConformanceDetailsMapper.toEntity(nonConformanceDetailsDTO);
        nonConformanceDetails = nonConformanceDetailsRepository.save(nonConformanceDetails);
        return nonConformanceDetailsMapper.toDto(nonConformanceDetails);
    }

    /**
     * Get all the nonConformanceDetails.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<NonConformanceDetailsDTO> findAll() {
        log.debug("Request to get all NonConformanceDetails");
        return nonConformanceDetailsRepository.findAllWithEagerRelationships().stream()
            .map(nonConformanceDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the nonConformanceDetails with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<NonConformanceDetailsDTO> findAllWithEagerRelationships(Pageable pageable) {
        return nonConformanceDetailsRepository.findAllWithEagerRelationships(pageable).map(nonConformanceDetailsMapper::toDto);
    }


    /**
     * Get one nonConformanceDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NonConformanceDetailsDTO> findOne(Long id) {
        log.debug("Request to get NonConformanceDetails : {}", id);
        return nonConformanceDetailsRepository.findOneWithEagerRelationships(id)
            .map(nonConformanceDetailsMapper::toDto);
    }

    /**
     * Get one nonConformanceDetails by current employee id and Status Incomplete.
     *
     * @param employee the current employee.
     * @param status the status of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NonConformanceDetailsDTO> findOneByEmployeeAndStatus(Employee employee, Status status) {
        return nonConformanceDetailsRepository.findOneByEmployeeAndStatus(employee, status)
            .map(nonConformanceDetailsMapper::toDto);
    }

    /**
     * Delete the nonConformanceDetails by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete NonConformanceDetails : {}", id);
        nonConformanceDetailsRepository.deleteById(id);
    }

    public List<NonConformanceDetailsDTO> findAllByEmployee(Employee currentEmployee) {
        return nonConformanceDetailsRepository.findOneByEmployee(currentEmployee).stream()
            .map(nonConformanceDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
}
