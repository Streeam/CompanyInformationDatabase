package com.streeam.cid.service;

import com.streeam.cid.domain.Routing;
import com.streeam.cid.repository.RoutingRepository;
import com.streeam.cid.service.dto.ProductDTO;
import com.streeam.cid.service.dto.RoutingDTO;
import com.streeam.cid.service.mapper.ProductMapper;
import com.streeam.cid.service.mapper.RoutingMapper;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Routing}.
 */
@Service
@Transactional
public class RoutingService {

    private final Logger log = LoggerFactory.getLogger(RoutingService.class);

    private final RoutingRepository routingRepository;
    @Autowired
    private ProductService productService;
    private final RoutingMapper routingMapper;

    @Autowired
    private ProductMapper productMapper;

    public RoutingService(RoutingRepository routingRepository, RoutingMapper routingMapper) {
        this.routingRepository = routingRepository;
        this.routingMapper = routingMapper;
    }

    /**
     * Save a routing.
     *
     * @param routingDTO the entity to save.
     * @return the persisted entity.
     */
    public RoutingDTO save(RoutingDTO routingDTO) {
        log.debug("Request to save Routing : {}", routingDTO);
        Routing routing = routingMapper.toEntity(routingDTO);
        routing = routingRepository.save(routing);
        return routingMapper.toDto(routing);
    }

    /**
     * Get all the routings.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RoutingDTO> findAll() {
        log.debug("Request to get all Routings");
        return routingRepository.findAll().stream()
            .map(routingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one routing by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RoutingDTO> findOne(Long id) {
        log.debug("Request to get Routing : {}", id);
        return routingRepository.findById(id)
            .map(routingMapper::toDto);
    }

    /**
     * Delete the routing by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Routing : {}", id);
        routingRepository.deleteById(id);
    }

    public void saveInBatch(List<RoutingDTO> list) {
        routingRepository.saveAll(routingMapper.toEntity(list));
    }
    @Transactional(readOnly = true)
    public List<RoutingDTO> findAllByPartNumber(String partNumber) {
        List<RoutingDTO> result = routingRepository.findAllByPartNumber(partNumber).stream()
            .map(routingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
        return result;
    }

    public void deleteAndUpdateParent(Long id) {
        RoutingDTO routingDTO = findOne(id).orElseThrow(()-> new BadRequestAlertException("Invalid id", "routing", "idnull"));
        ProductDTO productDTO = productService.findOneByPartNumber(routingDTO.getPartNumber()).orElseThrow(()-> new BadRequestAlertException("Invalid id", "product", "idnull"));
        Set<RoutingDTO> filteredRoutings = productDTO.getRoutings().stream().filter(routing -> routing.getPartNumber() != routingDTO.getPartNumber()).collect(Collectors.toSet());
        productDTO.setRoutings(filteredRoutings);
        productService.save(productDTO);
        routingRepository.deleteById(id);
    }
}
