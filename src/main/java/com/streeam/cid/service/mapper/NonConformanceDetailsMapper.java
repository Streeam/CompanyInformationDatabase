package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NonConformanceDetails} and its DTO {@link NonConformanceDetailsDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, RoutingMapper.class, EmployeeMapper.class, NonConformanceTypeMapper.class})
public interface NonConformanceDetailsMapper extends EntityMapper<NonConformanceDetailsDTO, NonConformanceDetails> {

    @Mapping(source = "employee", target = "employee")
    @Mapping(source = "nonConformanceType", target = "nonConformanceType")
    NonConformanceDetailsDTO toDto(NonConformanceDetails nonConformanceDetails);

    @Mapping(target = "removeProduct", ignore = true)
    @Mapping(target = "removeRouting", ignore = true)
    @Mapping(source = "employee", target = "employee")
    @Mapping(source = "nonConformanceType", target = "nonConformanceType")
    NonConformanceDetails toEntity(NonConformanceDetailsDTO nonConformanceDetailsDTO);

    default NonConformanceDetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        NonConformanceDetails nonConformanceDetails = new NonConformanceDetails();
        nonConformanceDetails.setId(id);
        return nonConformanceDetails;
    }
}
