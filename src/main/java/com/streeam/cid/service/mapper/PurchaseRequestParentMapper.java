package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.PurchaseRequestParentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link PurchaseRequestParent} and its DTO {@link PurchaseRequestParentDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface PurchaseRequestParentMapper extends EntityMapper<PurchaseRequestParentDTO, PurchaseRequestParent> {

    @Mapping(source = "employee.id", target = "employeeId")
    PurchaseRequestParentDTO toDto(PurchaseRequestParent purchaseRequestParent);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(target = "purchaseRequestChildren", ignore = true)
    @Mapping(target = "removePurchaseRequestChild", ignore = true)
    PurchaseRequestParent toEntity(PurchaseRequestParentDTO purchaseRequestParentDTO);

    default PurchaseRequestParent fromId(Long id) {
        if (id == null) {
            return null;
        }
        PurchaseRequestParent purchaseRequestParent = new PurchaseRequestParent();
        purchaseRequestParent.setId(id);
        return purchaseRequestParent;
    }
}
