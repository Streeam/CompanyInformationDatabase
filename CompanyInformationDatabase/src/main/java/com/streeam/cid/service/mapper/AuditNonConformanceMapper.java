package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.AuditNonConformanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AuditNonConformance} and its DTO {@link AuditNonConformanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, NonConformanceDetailsMapper.class})
public interface AuditNonConformanceMapper extends EntityMapper<AuditNonConformanceDTO, AuditNonConformance> {

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "nonConformanceDetails.id", target = "nonConformanceDetailsId")
    AuditNonConformanceDTO toDto(AuditNonConformance auditNonConformance);

    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "nonConformanceDetailsId", target = "nonConformanceDetails")
    AuditNonConformance toEntity(AuditNonConformanceDTO auditNonConformanceDTO);

    default AuditNonConformance fromId(Long id) {
        if (id == null) {
            return null;
        }
        AuditNonConformance auditNonConformance = new AuditNonConformance();
        auditNonConformance.setId(id);
        return auditNonConformance;
    }
}
