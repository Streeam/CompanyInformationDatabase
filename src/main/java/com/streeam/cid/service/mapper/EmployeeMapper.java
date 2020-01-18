package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.EmployeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, RolesMapper.class, InternalNonConformanceMapper.class})
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "role.id", target = "roleId")
    EmployeeDTO toDto(Employee employee);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "roleId", target = "role")
    @Mapping(target = "nonConformanceDetails", ignore = true)
    @Mapping(target = "removeNonConformanceDetails", ignore = true)
    @Mapping(target = "removeInternalNonConformance", ignore = true)
    @Mapping(target = "clientNonConformances", ignore = true)
    @Mapping(target = "removeClientNonConformances", ignore = true)
    Employee toEntity(EmployeeDTO employeeDTO);

    default Employee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }
}
