package com.streeam.cid.service;

import com.streeam.cid.domain.Roles;
import com.streeam.cid.repository.RolesRepository;
import com.streeam.cid.service.dto.RolesDTO;
import com.streeam.cid.service.mapper.RolesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Roles}.
 */
@Service
@Transactional
public class RolesService {

    private final Logger log = LoggerFactory.getLogger(RolesService.class);

    private final RolesRepository rolesRepository;

    private final RolesMapper rolesMapper;

    public RolesService(RolesRepository rolesRepository, RolesMapper rolesMapper) {
        this.rolesRepository = rolesRepository;
        this.rolesMapper = rolesMapper;
    }

    /**
     * Save a roles.
     *
     * @param rolesDTO the entity to save.
     * @return the persisted entity.
     */
    public RolesDTO save(RolesDTO rolesDTO) {
        log.debug("Request to save Roles : {}", rolesDTO);
        Roles roles = rolesMapper.toEntity(rolesDTO);
        roles = rolesRepository.save(roles);
        return rolesMapper.toDto(roles);
    }

    /**
     * Get all the roles.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RolesDTO> findAll() {
        log.debug("Request to get all Roles");
        return rolesRepository.findAll().stream()
            .map(rolesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one roles by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RolesDTO> findOne(Long id) {
        log.debug("Request to get Roles : {}", id);
        return rolesRepository.findById(id)
            .map(rolesMapper::toDto);
    }

    /**
     * Delete the roles by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Roles : {}", id);
        rolesRepository.deleteById(id);
    }

    public Roles defaultRole(boolean isManager){
        Roles role = new Roles();
        if (isManager) {
            return role
                .raiseNonconformace(true)
                .viewNonconformance(true)
                .editNonconformance(true)
                .viewNonconformanceTasks(true)
                .editNonconformanceTasks(true)
                .deleteNonconformanceTasks(true)
                .deleteNonconformance(true)
                .raiseChangeRequest(true)
                .viewCostAnalyses(true)
                .editCostAnalyses(true)
                .viewRequestSubmited(true)
                .editRequestSubmited(true)
                .viewPendingSubmited(true)
                .editPendingSubmited(true)
                .approvePendingSubmited(true)
                .viewRejected(true)
                .editRejected(true)
                .editPurchaseRequest(true)
                .deletePurchaseRequest(true)
                .editProductStock(true)
                .addProduct(true)
                .deleteProduct(true)
                .editProduct(true)
                .addCustomer(true)
                .deleteCustomer(true)
                .editCustomer(true)
                .deleteSupplier(true)
                .addSupplier(true)
                .approveRequestSubmited(true)
                .editSupplier(true)
                .raiseTask(true)
                .addProgressTrack(true)
                .deleteProgressTrack(true)
                .editProgressTrack(true)
                .viewProgressTrack(true)
                .addNonConformanceReason(true)
                .addRootCauses(true);
        } else {
            return role
                .raiseNonconformace(false)
                .viewNonconformance(false)
                .editNonconformance(false)
                .viewNonconformanceTasks(false)
                .editNonconformanceTasks(false)
                .deleteNonconformanceTasks(false)
                .deleteNonconformance(false)
                .raiseChangeRequest(false)
                .viewCostAnalyses(false)
                .editCostAnalyses(false)
                .viewRequestSubmited(false)
                .editRequestSubmited(false)
                .viewPendingSubmited(false)
                .editPendingSubmited(false)
                .approvePendingSubmited(false)
                .viewRejected(false)
                .editRejected(false)
                .editPurchaseRequest(false)
                .deletePurchaseRequest(false)
                .editProductStock(false)
                .addProduct(false)
                .deleteProduct(false)
                .editProduct(false)
                .addCustomer(false)
                .deleteCustomer(false)
                .editCustomer(false)
                .deleteSupplier(false)
                .addSupplier(false)
                .approveRequestSubmited(false)
                .editSupplier(false)
                .raiseTask(false)
                .addProgressTrack(false)
                .deleteProgressTrack(false)
                .editProgressTrack(false)
                .viewProgressTrack(false)
                .addNonConformanceReason(false)
                .addRootCauses(false);
        }
    }
}
