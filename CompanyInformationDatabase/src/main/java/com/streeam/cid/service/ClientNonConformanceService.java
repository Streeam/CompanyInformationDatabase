package com.streeam.cid.service;

import com.streeam.cid.domain.AfterSaleExpenses;
import com.streeam.cid.domain.ClientNonConformance;
import com.streeam.cid.domain.ExtraBoms;
import com.streeam.cid.domain.ExtraRoutings;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.repository.AfterSaleExpensesRepository;
import com.streeam.cid.repository.ClientNonConformanceRepository;
import com.streeam.cid.repository.ExtraBomsRepository;
import com.streeam.cid.repository.ExtraRoutingsRepository;
import com.streeam.cid.service.dto.ClientNonConformanceDTO;
import com.streeam.cid.service.mapper.ClientNonConformanceMapper;
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
 * Service Implementation for managing {@link ClientNonConformance}.
 */
@Service
@Transactional
public class ClientNonConformanceService {

    private final Logger log = LoggerFactory.getLogger(ClientNonConformanceService.class);
    @Autowired
    private ExtraBomsRepository extraBomsRepository;
    @Autowired
    private ExtraRoutingsRepository extraRoutingsRepository;
    @Autowired
    private AfterSaleExpensesRepository afterSaleExpensesRepository;
    private final ClientNonConformanceRepository clientNonConformanceRepository;

    private final ClientNonConformanceMapper clientNonConformanceMapper;

    public ClientNonConformanceService(ClientNonConformanceRepository clientNonConformanceRepository, ClientNonConformanceMapper clientNonConformanceMapper) {
        this.clientNonConformanceRepository = clientNonConformanceRepository;
        this.clientNonConformanceMapper = clientNonConformanceMapper;
    }

    /**
     * Save a clientNonConformance.
     *
     * @param clientNonConformanceDTO the entity to save.
     * @return the persisted entity.
     */
    public ClientNonConformanceDTO save(ClientNonConformanceDTO clientNonConformanceDTO) {
        log.debug("Request to save ClientNonConformance : {}", clientNonConformanceDTO);
        ClientNonConformance clientNonConformance = clientNonConformanceMapper.toEntity(clientNonConformanceDTO);
        clientNonConformance = clientNonConformanceRepository.save(clientNonConformance);
        return clientNonConformanceMapper.toDto(clientNonConformance);
    }

    /**
     * Get all the clientNonConformances.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ClientNonConformanceDTO> findAll() {
        log.debug("Request to get all ClientNonConformances");
        return clientNonConformanceRepository.findAllWithEagerRelationships().stream()
            .map(clientNonConformanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the clientNonConformances with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ClientNonConformanceDTO> findAllWithEagerRelationships(Pageable pageable) {
        return clientNonConformanceRepository.findAllWithEagerRelationships(pageable).map(clientNonConformanceMapper::toDto);
    }


    /**
     * Get one clientNonConformance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ClientNonConformanceDTO> findOne(Long id) {
        log.debug("Request to get ClientNonConformance : {}", id);
        return clientNonConformanceRepository.findOneWithEagerRelationships(id)
            .map(clientNonConformanceMapper::toDto);
    }

    /**
     * Delete the clientNonConformance by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ClientNonConformance : {}", id);
        clientNonConformanceRepository.deleteById(id);
        Optional<ClientNonConformanceDTO> clientNonConformanceDTO = findOne(id);
        if (clientNonConformanceDTO.isPresent()) {
            List<ExtraRoutings> extraRoutings = extraRoutingsRepository.findAllByCustomerNonConformaceId(id);
            List<ExtraBoms> extraBoms = extraBomsRepository.findAllByCustomerNonConformaceId(id);
            extraRoutingsRepository.deleteAll(extraRoutings);
            extraBomsRepository.deleteAll(extraBoms);
            List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAllByCustomerNonConformanceId(id);
            afterSaleExpensesRepository.deleteAll(afterSaleExpensesList);
        }

    }
    /**
     * Get one clientNonConformance by id.
     *
     * @param nonconformanceDetailsid the id of the nonconformanceDetails.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ClientNonConformanceDTO> findOneByIncompleteNonconformanceDetailsId(Long nonconformanceDetailsid) {
        return clientNonConformanceRepository.findOneByNonconformanceDetailsIdAndStatus(nonconformanceDetailsid, Status.INCOMPLETE).map(clientNonConformanceMapper::toDto);
    }

    /**
     * Get all the clientNonConformances.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ClientNonConformanceDTO> findAllByNonconformanceDetailsId(Long nonconformanceDetailsId) {
        log.debug("Request to get all CustomerNonConformances");
        return clientNonConformanceRepository.findAllByNonconformanceDetailsId(nonconformanceDetailsId).stream()
            .map(clientNonConformanceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    public void deleteAll(List<ClientNonConformanceDTO> clientNonConformanceDTOS) {
        clientNonConformanceDTOS.forEach(clientNonConformanceDTO -> this.delete(clientNonConformanceDTO.getId()));
    }
}
