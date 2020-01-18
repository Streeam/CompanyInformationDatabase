package com.streeam.cid.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.streeam.cid.domain.enumeration.CustomerNonconformaceType;
import com.streeam.cid.domain.enumeration.Status;

/**
 * A DTO for the {@link com.streeam.cid.domain.ClientNonConformance} entity.
 */
public class ClientNonConformanceDTO implements Serializable {

    private Long id;

    @NotNull
    private CustomerNonconformaceType nonConformanceType;

    @NotNull
    private Status status;

    @NotNull
    private Long nonconformanceDetailsId;

    private String rejectionReasonDetails;

    private String actionToBeTakenDetails;

    private String shortTermDetails;

    private String longTermDetails;

    @NotNull
    private Instant currentDate;

    @NotNull
    private Instant rejectionDate;

    @NotNull
    private Boolean underWarranty;

    @Min(value = 1)
    private Integer quantity;

    @DecimalMin(value = "0")
    private Double labourRate;


    private Long customerId;

    private Set<EmployeeDTO> culpableEmployees = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerNonconformaceType getNonConformanceType() {
        return nonConformanceType;
    }

    public void setNonConformanceType(CustomerNonconformaceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getNonconformanceDetailsId() {
        return nonconformanceDetailsId;
    }

    public void setNonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
    }

    public String getRejectionReasonDetails() {
        return rejectionReasonDetails;
    }

    public void setRejectionReasonDetails(String rejectionReasonDetails) {
        this.rejectionReasonDetails = rejectionReasonDetails;
    }

    public String getActionToBeTakenDetails() {
        return actionToBeTakenDetails;
    }

    public void setActionToBeTakenDetails(String actionToBeTakenDetails) {
        this.actionToBeTakenDetails = actionToBeTakenDetails;
    }

    public String getShortTermDetails() {
        return shortTermDetails;
    }

    public void setShortTermDetails(String shortTermDetails) {
        this.shortTermDetails = shortTermDetails;
    }

    public String getLongTermDetails() {
        return longTermDetails;
    }

    public void setLongTermDetails(String longTermDetails) {
        this.longTermDetails = longTermDetails;
    }

    public Instant getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(Instant currentDate) {
        this.currentDate = currentDate;
    }

    public Instant getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(Instant rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public Boolean isUnderWarranty() {
        return underWarranty;
    }

    public void setUnderWarranty(Boolean underWarranty) {
        this.underWarranty = underWarranty;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getLabourRate() {
        return labourRate;
    }

    public void setLabourRate(Double labourRate) {
        this.labourRate = labourRate;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Set<EmployeeDTO> getCulpableEmployees() {
        return culpableEmployees;
    }

    public void setCulpableEmployees(Set<EmployeeDTO> employees) {
        this.culpableEmployees = employees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClientNonConformanceDTO clientNonConformanceDTO = (ClientNonConformanceDTO) o;
        if (clientNonConformanceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientNonConformanceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientNonConformanceDTO{" +
            "id=" + getId() +
            ", nonConformanceType='" + getNonConformanceType() + "'" +
            ", status='" + getStatus() + "'" +
            ", nonconformanceDetailsId=" + getNonconformanceDetailsId() +
            ", rejectionReasonDetails='" + getRejectionReasonDetails() + "'" +
            ", actionToBeTakenDetails='" + getActionToBeTakenDetails() + "'" +
            ", shortTermDetails='" + getShortTermDetails() + "'" +
            ", longTermDetails='" + getLongTermDetails() + "'" +
            ", currentDate='" + getCurrentDate() + "'" +
            ", rejectionDate='" + getRejectionDate() + "'" +
            ", underWarranty='" + isUnderWarranty() + "'" +
            ", quantity=" + getQuantity() +
            ", labourRate=" + getLabourRate() +
            ", customer=" + getCustomerId() +
            "}";
    }
}
