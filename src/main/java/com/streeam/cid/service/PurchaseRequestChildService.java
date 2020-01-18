package com.streeam.cid.service;

import com.streeam.cid.domain.PurchaseRequestChild;
import com.streeam.cid.repository.PurchaseRequestChildRepository;
import com.streeam.cid.service.dto.PurchaseRequestChildDTO;
import com.streeam.cid.service.mapper.PurchaseRequestChildMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PurchaseRequestChild}.
 */
@Service
@Transactional
public class PurchaseRequestChildService {

    private final Logger log = LoggerFactory.getLogger(PurchaseRequestChildService.class);

    private final PurchaseRequestChildRepository purchaseRequestChildRepository;

    private final PurchaseRequestChildMapper purchaseRequestChildMapper;

    public PurchaseRequestChildService(PurchaseRequestChildRepository purchaseRequestChildRepository, PurchaseRequestChildMapper purchaseRequestChildMapper) {
        this.purchaseRequestChildRepository = purchaseRequestChildRepository;
        this.purchaseRequestChildMapper = purchaseRequestChildMapper;
    }

    /**
     * Save a purchaseRequestChild.
     *
     * @param purchaseRequestChildDTO the entity to save.
     * @return the persisted entity.
     */
    public PurchaseRequestChildDTO save(PurchaseRequestChildDTO purchaseRequestChildDTO) {
        log.debug("Request to save PurchaseRequestChild : {}", purchaseRequestChildDTO);
        PurchaseRequestChild purchaseRequestChild = purchaseRequestChildMapper.toEntity(purchaseRequestChildDTO);
        purchaseRequestChild = purchaseRequestChildRepository.save(purchaseRequestChild);
        return purchaseRequestChildMapper.toDto(purchaseRequestChild);
    }

    /**
     * Get all the purchaseRequestChildren.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PurchaseRequestChildDTO> findAll() {
        log.debug("Request to get all PurchaseRequestChildren");
        return purchaseRequestChildRepository.findAll().stream()
            .map(purchaseRequestChildMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one purchaseRequestChild by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PurchaseRequestChildDTO> findOne(Long id) {
        log.debug("Request to get PurchaseRequestChild : {}", id);
        return purchaseRequestChildRepository.findById(id)
            .map(purchaseRequestChildMapper::toDto);
    }

    /**
     * Delete the purchaseRequestChild by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PurchaseRequestChild : {}", id);
        purchaseRequestChildRepository.deleteById(id);
    }
}
