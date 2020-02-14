package com.streeam.cid.service;

import com.streeam.cid.domain.Bom;
import com.streeam.cid.repository.BomRepository;
import com.streeam.cid.repository.ProductRepository;
import com.streeam.cid.service.dto.BomDTO;
import com.streeam.cid.service.dto.ProductDTO;
import com.streeam.cid.service.mapper.BomMapper;
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
 * Service Implementation for managing {@link Bom}.
 */
@Service
@Transactional
public class BomService {

    private final Logger log = LoggerFactory.getLogger(BomService.class);

    private final BomRepository bomRepository;

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;

    private final BomMapper bomMapper;

    public BomService(BomRepository bomRepository, BomMapper bomMapper) {
        this.bomRepository = bomRepository;
        this.bomMapper = bomMapper;
    }

    /**
     * Save a bom.
     *
     * @param bomDTO the entity to save.
     * @return the persisted entity.
     */
    public BomDTO save(BomDTO bomDTO) {
        log.debug("Request to save Bom : {}", bomDTO);
        Bom bom = bomMapper.toEntity(bomDTO);
        bom = bomRepository.save(bom);
        return bomMapper.toDto(bom);
    }

    public List<BomDTO> saveInBatch(List<BomDTO> list) {
        List<Bom> bomList = bomRepository.saveAll(bomMapper.toEntity(list));
        List<BomDTO> bomDTOList = bomList.stream().map(bomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
        /* List<Product> productList = productRepository.findAll();
        productList.stream().forEach(product -> {
            Set<Bom> bomSet = bomList.stream().filter(bom -> bom.getPartNumber() == product.getPartNumber())
                .collect(Collectors.toSet());
            Set<Bom> bomToUpdate = product.getBoms();
            if (!bomSet.isEmpty()) {
                if (bomSet.addAll(bomToUpdate)) {
                    product.setBoms(bomSet);
                    productRepository.save(product);
                }
            }

        });*/
        return  bomDTOList;
    }

    /**
     * Get all the boms.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BomDTO> findAll() {
        log.debug("Request to get all Boms");
        return bomRepository.findAll().stream()
            .map(bomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bom by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BomDTO> findOne(Long id) {
        log.debug("Request to get Bom : {}", id);
        return bomRepository.findById(id)
            .map(bomMapper::toDto);
    }

    /**
     * Delete the bom by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Bom : {}", id);
        bomRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public List<BomDTO> findAllByPartNumber(String partNumber) {
        List<BomDTO> result = bomRepository.findAllByPartNumber(partNumber).stream()
            .map(bomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
        return result;
    }

    public void deleteAndUpdateParent(Long id) {
        BomDTO bomDTO = findOne(id).orElseThrow(()-> new BadRequestAlertException("Invalid id", "bom", "idnull"));
        ProductDTO productDTO = productService.findOneByPartNumber(bomDTO.getPartNumber()).orElseThrow(()-> new BadRequestAlertException("Invalid id", "product", "idnull"));
        Set<BomDTO> filteredBoms = productDTO.getBoms().stream().filter(bom -> bom.getPartNumber() != bomDTO.getPartNumber()).collect(Collectors.toSet());
        productDTO.setBoms(filteredBoms);
        productService.save(productDTO);
        bomRepository.deleteById(id);
    }
}
