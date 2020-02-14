package com.streeam.cid.service.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A DTO for the {@link com.streeam.cid.domain.Department} entity.
 */
@Data
public class DepartmentDTO implements Serializable {

    private Long id;

    @NotNull
    private String department;

}
