package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.NonConformanceTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NonConformanceType} and its DTO {@link NonConformanceTypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NonConformanceTypeMapper extends EntityMapper<NonConformanceTypeDTO, NonConformanceType> {



    default NonConformanceType fromId(Long id) {
        if (id == null) {
            return null;
        }
        NonConformanceType nonConformanceType = new NonConformanceType();
        nonConformanceType.setId(id);
        return nonConformanceType;
    }
}
