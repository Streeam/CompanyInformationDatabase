package com.streeam.cid.service;

import com.streeam.cid.domain.PurchaseRequestParent;
import com.streeam.cid.repository.PurchaseRequestParentRepository;
import com.streeam.cid.service.dto.PurchaseRequestParentDTO;
import com.streeam.cid.service.mapper.PurchaseRequestParentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link PurchaseRequestParent}.
 */
@Service
@Transactional
public class PurchaseRequestParentService {

    private final Logger log = LoggerFactory.getLogger(PurchaseRequestParentService.class);

    private final PurchaseRequestParentRepository purchaseRequestParentRepository;

    private final PurchaseRequestParentMapper purchaseRequestParentMapper;

    public PurchaseRequestParentService(PurchaseRequestParentRepository purchaseRequestParentRepository, PurchaseRequestParentMapper purchaseRequestParentMapper) {
        this.purchaseRequestParentRepository = purchaseRequestParentRepository;
        this.purchaseRequestParentMapper = purchaseRequestParentMapper;
    }

    /**
     * Save a purchaseRequestParent.
     *
     * @param purchaseRequestParentDTO the entity to save.
     * @return the persisted entity.
     */
    public PurchaseRequestParentDTO save(PurchaseRequestParentDTO purchaseRequestParentDTO) {
        log.debug("Request to save PurchaseRequestParent : {}", purchaseRequestParentDTO);
        PurchaseRequestParent purchaseRequestParent = purchaseRequestParentMapper.toEntity(purchaseRequestParentDTO);
        purchaseRequestParent = purchaseRequestParentRepository.save(purchaseRequestParent);
        return purchaseRequestParentMapper.toDto(purchaseRequestParent);
    }

    /**
     * Get all the purchaseRequestParents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PurchaseRequestParentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PurchaseRequestParents");
        return purchaseRequestParentRepository.findAll(pageable)
            .map(purchaseRequestParentMapper::toDto);
    }


    /**
     * Get one purchaseRequestParent by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PurchaseRequestParentDTO> findOne(Long id) {
        log.debug("Request to get PurchaseRequestParent : {}", id);
        return purchaseRequestParentRepository.findById(id)
            .map(purchaseRequestParentMapper::toDto);
    }

    /**
     * Delete the purchaseRequestParent by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete PurchaseRequestParent : {}", id);
        purchaseRequestParentRepository.deleteById(id);
    }
}
