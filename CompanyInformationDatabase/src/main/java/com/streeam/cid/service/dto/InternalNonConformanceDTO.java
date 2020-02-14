package com.streeam.cid.service.dto;
import com.streeam.cid.domain.enumeration.NonconformanceAction;
import com.streeam.cid.domain.enumeration.Status;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.streeam.cid.domain.InternalNonConformance} entity.
 */
public class InternalNonConformanceDTO implements Serializable {

    private Long id;

    @NotNull
    private NonconformanceAction action;

    private LocalDate curentDate;

    private LocalDate rejectionDate;

    private String rejectionReasonDetails;

    @NotNull
    @DecimalMin(value = "0")
    private Double labourRate;

    private Long nonconformanceDetailsId;

    @NotNull
    private Status status;

    @Min(value = 1)
    private Integer quantity;


    private Set<EmployeeDTO> employees = new HashSet<>();

    private Set<SiteDTO> sites = new HashSet<>();

    private Set<DepartmentDTO> departments = new HashSet<>();

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

    public LocalDate getCurentDate() {
        return curentDate;
    }

    public void setCurentDate(LocalDate curentDate) {
        this.curentDate = curentDate;
    }

    public LocalDate getRejectionDate() {
        return rejectionDate;
    }

    public void setRejectionDate(LocalDate rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public String getRejectionReasonDetails() {
        return rejectionReasonDetails;
    }

    public void setRejectionReasonDetails(String rejectionReasonDetails) {
        this.rejectionReasonDetails = rejectionReasonDetails;
    }

    public Double getLabourRate() {
        return labourRate;
    }

    public void setLabourRate(Double labourRate) {
        this.labourRate = labourRate;
    }

    public Long getNonconformanceDetailsId() {
        return nonconformanceDetailsId;
    }

    public void setNonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<EmployeeDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<EmployeeDTO> employees) {
        this.employees = employees;
    }

    public Set<SiteDTO> getSites() {
        return sites;
    }

    public void setSites(Set<SiteDTO> sites) {
        this.sites = sites;
    }

    public Set<DepartmentDTO> getDepartments() {
        return departments;
    }

    public void setDepartments(Set<DepartmentDTO> departments) {
        this.departments = departments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InternalNonConformanceDTO internalNonConformanceDTO = (InternalNonConformanceDTO) o;
        if (internalNonConformanceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), internalNonConformanceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InternalNonConformanceDTO{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", curentDate='" + getCurentDate() + "'" +
            ", rejectionDate='" + getRejectionDate() + "'" +
            ", rejectionReasonDetails='" + getRejectionReasonDetails() + "'" +
            ", labourRate=" + getLabourRate() +
            ", nonconformanceDetailsId=" + getNonconformanceDetailsId() +
            ", status='" + getStatus() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
