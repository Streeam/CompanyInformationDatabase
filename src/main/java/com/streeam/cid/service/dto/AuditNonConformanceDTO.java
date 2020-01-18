package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.streeam.cid.domain.enumeration.AuditNonconformaceFirstType;
import com.streeam.cid.domain.enumeration.AuditNonconformaceSecondType;

/**
 * A DTO for the {@link com.streeam.cid.domain.AuditNonConformance} entity.
 */
public class AuditNonConformanceDTO implements Serializable {

    private Long id;

    @NotNull
    private AuditNonconformaceFirstType auditNonConformanceFirstType;

    @NotNull
    private AuditNonconformaceSecondType auditNonConformanceSecondType;


    private Long employeeId;

    private Long nonConformanceDetailsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuditNonconformaceFirstType getAuditNonConformanceFirstType() {
        return auditNonConformanceFirstType;
    }

    public void setAuditNonConformanceFirstType(AuditNonconformaceFirstType auditNonConformanceFirstType) {
        this.auditNonConformanceFirstType = auditNonConformanceFirstType;
    }

    public AuditNonconformaceSecondType getAuditNonConformanceSecondType() {
        return auditNonConformanceSecondType;
    }

    public void setAuditNonConformanceSecondType(AuditNonconformaceSecondType auditNonConformanceSecondType) {
        this.auditNonConformanceSecondType = auditNonConformanceSecondType;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getNonConformanceDetailsId() {
        return nonConformanceDetailsId;
    }

    public void setNonConformanceDetailsId(Long nonConformanceDetailsId) {
        this.nonConformanceDetailsId = nonConformanceDetailsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AuditNonConformanceDTO auditNonConformanceDTO = (AuditNonConformanceDTO) o;
        if (auditNonConformanceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), auditNonConformanceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AuditNonConformanceDTO{" +
            "id=" + getId() +
            ", auditNonConformanceFirstType='" + getAuditNonConformanceFirstType() + "'" +
            ", auditNonConformanceSecondType='" + getAuditNonConformanceSecondType() + "'" +
            ", employee=" + getEmployeeId() +
            ", nonConformanceDetails=" + getNonConformanceDetailsId() +
            "}";
    }
}
