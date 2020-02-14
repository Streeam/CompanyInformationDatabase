package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {BomMapper.class, RoutingMapper.class, SalesOrderMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "salesOrder.id", target = "salesOrderId")
    ProductDTO toDto(Product product);

    @Mapping(target = "images", ignore = true)
    @Mapping(target = "removeImages", ignore = true)
    @Mapping(target = "drawings", ignore = true)
    @Mapping(target = "removeDrawings", ignore = true)
    @Mapping(target = "versions", ignore = true)
    @Mapping(target = "removeVersion", ignore = true)
    @Mapping(target = "removeBom", ignore = true)
    @Mapping(target = "removeRoutings", ignore = true)
    @Mapping(target = "suppliers", ignore = true)
    @Mapping(target = "removeSupplier", ignore = true)
    @Mapping(source = "salesOrderId", target = "salesOrder")
    @Mapping(target = "nonConformanceDetails", ignore = true)
    @Mapping(target = "removeNonConformanceDetails", ignore = true)
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
