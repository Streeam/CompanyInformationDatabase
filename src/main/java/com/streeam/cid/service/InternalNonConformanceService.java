package com.streeam.cid.service;

import com.streeam.cid.domain.ExtraBoms;
import com.streeam.cid.domain.ExtraRoutings;
import com.streeam.cid.domain.InternalNonConformance;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.repository.EmployeeRepository;
import com.streeam.cid.repository.ExtraBomsRepository;
import com.streeam.cid.repository.ExtraRoutingsRepository;
import com.streeam.cid.repository.InternalNonConformanceRepository;
import com.streeam.cid.service.dto.EmployeeDTO;
import com.streeam.cid.service.dto.InternalNonConformanceDTO;
import com.streeam.cid.service.mapper.EmployeeMapper;
import com.streeam.cid.service.mapper.InternalNonConformanceMapper;
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
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link InternalNonConformance}.
 */
@Service
@Transactional
public class InternalNonConformanceService {

    @Autowired
    private ExtraRoutingsRepository extraRoutingsRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeMapper employeeMapper;
    @Autowired
    private ExtraBomsRepository extraBomsRepository;

    private final Logger log = LoggerFactory.getLogger(InternalNonConformanceService.class);

    private final InternalNonConformanceRepository internalNonConformanceRepository;

    private final InternalNonConformanceMapper internalNonConformanceMapper;

    public InternalNonConformanceService(InternalNonConformanceRepository internalNonConformanceRepository, InternalNonConformanceMapper internalNonConformanceMapper) {
        this.internalNonConformanceRepository = internalNonConformanceRepository;
        this.internalNonConformanceMapper = internalNonConformanceMapper;
    }

    /**
     * Save a internalNonConformance.
     *
     * @param internalNonConformanceDTO the entity to save.
     * @return the persisted entity.
     */
    public InternalNonConformanceDTO save(InternalNonConformanceDTO internalNonConformanceDTO) {
        log.debug("Request to save InternalNonConformance : {}", internalNonConformanceDTO);
        InternalNonConformance internalNonConformance = internalNonConformanceMapper.toEntity(internalNonConformanceDTO);
        internalNonConformance = internalNonConformanceRepository.save(internalNonConformance);
        return internalNonConformanceMapper.toDto(internalNonConformance);
    }

    /**
     * Get all the internalNonConformances.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InternalNonConformanceDTO> findAll() {
        log.debug("Request to get all InternalNonConformances");
        return internalNonConformanceRepository.findAllWithEagerRelationships().stream()
            .map(internalNonConformanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the internalNonConformances.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InternalNonConformanceDTO> findAllByNonconformanceDetailsId(Long nonconformanceDetailsId) {
        log.debug("Request to get all InternalNonConformances");
        return internalNonConformanceRepository.findAllByNonconformanceDetailsId(nonconformanceDetailsId).stream()
            .map(internalNonConformanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the internalNonConformances with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<InternalNonConformanceDTO> findAllWithEagerRelationships(Pageable pageable) {
        return internalNonConformanceRepository.findAllWithEagerRelationships(pageable).map(internalNonConformanceMapper::toDto);
    }


    /**
     * Get one internalNonConformance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InternalNonConformanceDTO> findOne(Long id) {
        log.debug("Request to get InternalNonConformance : {}", id);
        return internalNonConformanceRepository.findOneWithEagerRelationships(id)
            .map(internalNonConformanceMapper::toDto);
    }

    /**
     * get the internalNonConformance by nonconformanceDetailsid and Status Incomplete.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InternalNonConformance : {}", id);
        internalNonConformanceRepository.deleteById(id);
        Optional<InternalNonConformanceDTO> internalEntity = findOne(id);
        if (internalEntity.isPresent()) {
            Set<EmployeeDTO> culpableEmployees = internalEntity.get().getEmployees();
            culpableEmployees.forEach(employeeDTO -> {
                Set<InternalNonConformanceDTO> internalNonConformanceDTOWithoutCurrent = employeeDTO.getInternalNonConformances()
                    .stream().
                        filter(item -> item.getId() != internalEntity.get().getId()).collect(Collectors.toSet());
                employeeDTO.setInternalNonConformances(internalNonConformanceDTOWithoutCurrent);
                employeeRepository.save(employeeMapper.toEntity(employeeDTO));
            });
            List<ExtraRoutings> extraRoutings = extraRoutingsRepository.findAllByInternalNonConformanceId(id);
            List<ExtraBoms> extraBoms = extraBomsRepository.findAllByInternalNonconformanceId(id);
            extraRoutingsRepository.deleteAll(extraRoutings);
            extraBomsRepository.deleteAll(extraBoms);
        }
    }
    /**
     * Get one internalNonConformance by id.
     *
     * @param nonconformanceDetailsid the id of the nonconformanceDetails.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InternalNonConformanceDTO> findOneByIncompleteNonconformanceDetailsId(Long nonconformanceDetailsid) {
       return internalNonConformanceRepository.findOneByNonconformanceDetailsIdAndStatus(nonconformanceDetailsid, Status.INCOMPLETE).map(internalNonConformanceMapper::toDto);
    }

    public void deleteAll(List<InternalNonConformanceDTO> internalNonConformancesDto) {
        internalNonConformancesDto.forEach(internalNonConformance -> this.delete(internalNonConformance.getId()));
    }
}
