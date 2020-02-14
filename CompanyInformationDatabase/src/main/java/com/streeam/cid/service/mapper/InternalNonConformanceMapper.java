package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.InternalNonConformanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link InternalNonConformance} and its DTO {@link InternalNonConformanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, SiteMapper.class, DepartmentMapper.class})
public interface InternalNonConformanceMapper extends EntityMapper<InternalNonConformanceDTO, InternalNonConformance> {


    @Mapping(target = "removeEmployee", ignore = true)
    @Mapping(target = "removeSite", ignore = true)
    @Mapping(target = "removeDepartment", ignore = true)

    default InternalNonConformance fromId(Long id) {
        if (id == null) {
            return null;
        }
        InternalNonConformance internalNonConformance = new InternalNonConformance();
        internalNonConformance.setId(id);
        return internalNonConformance;
    }
}
