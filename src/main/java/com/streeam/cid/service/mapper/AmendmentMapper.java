package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.AmendmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Amendment} and its DTO {@link AmendmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface AmendmentMapper extends EntityMapper<AmendmentDTO, Amendment> {

    @Mapping(source = "employee.id", target = "employeeId")
    AmendmentDTO toDto(Amendment amendment);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "removeTasks", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "removeImage", ignore = true)
    @Mapping(target = "drawings", ignore = true)
    @Mapping(target = "removeDrawing", ignore = true)
    Amendment toEntity(AmendmentDTO amendmentDTO);

    default Amendment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Amendment amendment = new Amendment();
        amendment.setId(id);
        return amendment;
    }
}
