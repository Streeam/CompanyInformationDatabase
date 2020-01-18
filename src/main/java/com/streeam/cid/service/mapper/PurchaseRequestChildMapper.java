package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.PurchaseRequestChildDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PurchaseRequestChild} and its DTO {@link PurchaseRequestChildDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, PurchaseRequestParentMapper.class, SalesOrderMapper.class})
public interface PurchaseRequestChildMapper extends EntityMapper<PurchaseRequestChildDTO, PurchaseRequestChild> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "purchaseRequestParent.id", target = "purchaseRequestParentId")
    @Mapping(source = "salesOrder.id", target = "salesOrderId")
    PurchaseRequestChildDTO toDto(PurchaseRequestChild purchaseRequestChild);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "purchaseRequestParentId", target = "purchaseRequestParent")
    @Mapping(source = "salesOrderId", target = "salesOrder")
    PurchaseRequestChild toEntity(PurchaseRequestChildDTO purchaseRequestChildDTO);

    default PurchaseRequestChild fromId(Long id) {
        if (id == null) {
            return null;
        }
        PurchaseRequestChild purchaseRequestChild = new PurchaseRequestChild();
        purchaseRequestChild.setId(id);
        return purchaseRequestChild;
    }
}
