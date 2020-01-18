package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.NonConformanceType} entity.
 */
public class NonConformanceTypeDTO implements Serializable {

    private Long id;

    @NotNull
    private String rejectionCode;

    @NotNull
    private String rejectionTitle;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRejectionCode() {
        return rejectionCode;
    }

    public void setRejectionCode(String rejectionCode) {
        this.rejectionCode = rejectionCode;
    }

    public String getRejectionTitle() {
        return rejectionTitle;
    }

    public void setRejectionTitle(String rejectionTitle) {
        this.rejectionTitle = rejectionTitle;
    }

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

    @Override
    public String toString() {
        return "NonConformanceTypeDTO{" +
            "id=" + getId() +
            ", rejectionCode='" + getRejectionCode() + "'" +
            ", rejectionTitle='" + getRejectionTitle() + "'" +
            "}";
    }
}
