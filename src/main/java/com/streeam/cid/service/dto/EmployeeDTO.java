package com.streeam.cid.service.dto;

import com.streeam.cid.domain.Roles;
import com.streeam.cid.domain.User;
import lombok.Data;

import javax.persistence.Lob;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.streeam.cid.domain.Employee} entity.
 */
@Data
public class EmployeeDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] image;

    private String imageContentType;

    private String jobTitle;

    private LocalDate hiredDate;

    private Long companyId;

    private User user;

    private  Roles role;

    private Long userId;

    private Long roleId;

    private Set<InternalNonConformanceDTO> internalNonConformances = new HashSet<>();

    private Set<ClientNonConformanceDTO> clientNonConformances = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EmployeeDTO employeeDTO = (EmployeeDTO) o;
        if (employeeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
