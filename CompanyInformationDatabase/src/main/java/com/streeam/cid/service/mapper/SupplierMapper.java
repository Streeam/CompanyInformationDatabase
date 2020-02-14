package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.SupplierDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Supplier} and its DTO {@link SupplierDTO}.
 */
@Mapper(componentModel = "spring", uses = {CompanyMapper.class, ProductMapper.class})
public interface SupplierMapper extends EntityMapper<SupplierDTO, Supplier> {

    @Mapping(source = "company.id", target = "companyId")
    SupplierDTO toDto(Supplier supplier);

    @Mapping(source = "companyId", target = "company")
    @Mapping(target = "removeProducts", ignore = true)
    Supplier toEntity(SupplierDTO supplierDTO);

    default Supplier fromId(Long id) {
        if (id == null) {
            return null;
        }
        Supplier supplier = new Supplier();
        supplier.setId(id);
        return supplier;
    }
}
