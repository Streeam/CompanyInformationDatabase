package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.SalesOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SalesOrder} and its DTO {@link SalesOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface SalesOrderMapper extends EntityMapper<SalesOrderDTO, SalesOrder> {

    @Mapping(source = "customer.id", target = "customerId")
    SalesOrderDTO toDto(SalesOrder salesOrder);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "purchaseRequestChildren", ignore = true)
    @Mapping(target = "removePurchaseRequestChild", ignore = true)
    @Mapping(target = "products", ignore = true)
    @Mapping(target = "removeProducts", ignore = true)
    SalesOrder toEntity(SalesOrderDTO salesOrderDTO);

    default SalesOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        SalesOrder salesOrder = new SalesOrder();
        salesOrder.setId(id);
        return salesOrder;
    }
}
