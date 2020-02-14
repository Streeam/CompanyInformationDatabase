package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.SupplierNonConformanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SupplierNonConformance} and its DTO {@link SupplierNonConformanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, SupplierMapper.class, NonConformanceDetailsMapper.class})
public interface SupplierNonConformanceMapper extends EntityMapper<SupplierNonConformanceDTO, SupplierNonConformance> {

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "supplier.id", target = "supplierId")
    @Mapping(source = "nonConformanceDetails.id", target = "nonConformanceDetailsId")
    SupplierNonConformanceDTO toDto(SupplierNonConformance supplierNonConformance);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "supplierId", target = "supplier")
    @Mapping(source = "nonConformanceDetailsId", target = "nonConformanceDetails")
    SupplierNonConformance toEntity(SupplierNonConformanceDTO supplierNonConformanceDTO);

    default SupplierNonConformance fromId(Long id) {
        if (id == null) {
            return null;
        }
        SupplierNonConformance supplierNonConformance = new SupplierNonConformance();
        supplierNonConformance.setId(id);
        return supplierNonConformance;
    }
}
