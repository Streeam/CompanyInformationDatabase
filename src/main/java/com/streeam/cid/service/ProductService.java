package com.streeam.cid.service;

import com.streeam.cid.domain.Product;
import com.streeam.cid.repository.ProductRepository;
import com.streeam.cid.service.dto.BomDTO;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;
import com.streeam.cid.service.dto.ProductDTO;
import com.streeam.cid.service.dto.RoutingDTO;
import com.streeam.cid.service.mapper.ProductMapper;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
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
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    @Autowired
    private BomService bomService;
    @Autowired
    private NonConformanceDetailsService nonConformanceDetailsService;
    @Autowired
    private RoutingService routingService;

    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save.
     * @return the persisted entity.
     */
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO.getId());
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable)
            .map(productMapper::toDto);
    }

    /**
     * Get all the products with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ProductDTO> findAllWithEagerRelationships(Pageable pageable) {
        return productRepository.findAllWithEagerRelationships(pageable).map(productMapper::toDto);
    }


    /**
     * Get one product by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findOneWithEagerRelationships(id)
            .map(productMapper::toDto);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        ProductDTO productDTO = findOne(id).orElseThrow(()-> new BadRequestAlertException("Invalid id", "product", "idnull"));
        Set<BomDTO> boms = productDTO.getBoms();
        Set<RoutingDTO> routings = productDTO.getRoutings();
        List<NonConformanceDetailsDTO> nonConformanceDetailsDTOList = nonConformanceDetailsService.findAll().stream().
        filter(nonConformanceDetailsDTO -> nonConformanceDetailsDTO.getProducts().contains(productDTO)).collect(Collectors.toList());
        nonConformanceDetailsDTOList.forEach(nonConformanceDetailsDTO -> nonConformanceDetailsService.delete(nonConformanceDetailsDTO.getId()));
        boms.forEach(bom -> bomService.delete(bom.getId()));
        routings.forEach(routing -> routingService.delete(routing.getId()));
        productRepository.deleteById(id);
    }

    public void saveInBatch(List<ProductDTO> list) {
        List<Product> products = productMapper.toEntity(list);
        productRepository.saveAll(products);
    }

    public List<ProductDTO> findAll() {
        log.debug("Request to get all Products");
        return productRepository.findAllWithEagerRelationships().
            stream().
            map(productMapper::toDto).
            collect(Collectors.toList());
    }

    public List<ProductDTO> findAllProductsChildren(Long id) {
        Optional<ProductDTO> product = productRepository.findOneWithEagerRelationships(id)
            .map(productMapper::toDto);
        List<ProductDTO> products = new LinkedList<>();
        if (product.isPresent()) {
            Set<BomDTO> productsBoms = product.get().getBoms();
            productsBoms.forEach(item -> {
                productRepository.findOneByPartNumber(item.getChildPartNumber()).ifPresent(product1 -> products.add(productMapper.toDto(product1)));
            });
            return products;
        } else {
            return products;
        }
    }
    @Transactional(readOnly = true)
    public Optional<ProductDTO>  findOneByPartNumber(String partNumber) {
        return productRepository.findOneByPartNumber(partNumber)
            .map(productMapper::toDto);
    }
}
