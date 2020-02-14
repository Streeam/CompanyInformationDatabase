package com.streeam.cid.service.dto;
import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.ActionToBeTaken} entity.
 */
@Data
public class ActionToBeTakenDTO implements Serializable {

    private Long id;

    @NotNull
    private String code;

    @NotNull
    private String title;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NonConformanceTypeDTO nonConformanceTypeDTO = (NonConformanceTypeDTO) o;
        if (nonConformanceTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nonConformanceTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
