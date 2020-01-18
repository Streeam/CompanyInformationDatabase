package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.Department;
import com.streeam.cid.domain.NonConformanceType;
import com.streeam.cid.service.dto.DepartmentDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link NonConformanceType} and its DTO {@link com.streeam.cid.service.dto.DepartmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {

    default Department fromId(Long id) {
        if (id == null) {
            return null;
        }
        Department department = new Department();
        department.setId(id);
        return department;
    }
}
