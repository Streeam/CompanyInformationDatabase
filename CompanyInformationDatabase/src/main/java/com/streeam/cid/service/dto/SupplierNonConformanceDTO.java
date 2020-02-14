package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.streeam.cid.domain.enumeration.NonconformanceAction;
import com.streeam.cid.domain.enumeration.SupplierNonconformaceType;

/**
 * A DTO for the {@link com.streeam.cid.domain.SupplierNonConformance} entity.
 */
public class SupplierNonConformanceDTO implements Serializable {

    private Long id;

    @NotNull
    private NonconformanceAction action;

    @Min(value = 0)
    private Integer labour;

    private String concesionDetails;

    @NotNull
    @DecimalMin(value = "0")
    private Double rejectionFee;

    @NotNull
    private SupplierNonconformaceType nonConformanceType;


    private Long employeeId;

    private Long supplierId;

    private Long nonConformanceDetailsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NonconformanceAction getAction() {
        return action;
    }

    public void setAction(NonconformanceAction action) {
        this.action = action;
    }

    public Integer getLabour() {
        return labour;
    }

    public void setLabour(Integer labour) {
        this.labour = labour;
    }

    public String getConcesionDetails() {
        return concesionDetails;
    }

    public void setConcesionDetails(String concesionDetails) {
        this.concesionDetails = concesionDetails;
    }

    public Double getRejectionFee() {
        return rejectionFee;
    }

    public void setRejectionFee(Double rejectionFee) {
        this.rejectionFee = rejectionFee;
    }

    public SupplierNonconformaceType getNonConformanceType() {
        return nonConformanceType;
    }

    public void setNonConformanceType(SupplierNonconformaceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
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

        SupplierNonConformanceDTO supplierNonConformanceDTO = (SupplierNonConformanceDTO) o;
        if (supplierNonConformanceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplierNonConformanceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplierNonConformanceDTO{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", labour=" + getLabour() +
            ", concesionDetails='" + getConcesionDetails() + "'" +
            ", rejectionFee=" + getRejectionFee() +
            ", nonConformanceType='" + getNonConformanceType() + "'" +
            ", employee=" + getEmployeeId() +
            ", supplier=" + getSupplierId() +
            ", nonConformanceDetails=" + getNonConformanceDetailsId() +
            "}";
    }
}
