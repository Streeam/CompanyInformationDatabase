package com.streeam.cid.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.NotNull;

/**
 * A DTO for the {@link com.streeam.cid.domain.PurchaseRequestParent} entity.
 */
public class PurchaseRequestParentDTO implements Serializable {

    private Long id;

    @NotNull
    private String pdfURLPath;

    private Set<PurchaseRequestChildDTO> purchaseRequestChildren = new HashSet<>();

    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPurchaseRequestChildren(Set<PurchaseRequestChildDTO> children) {
        this.purchaseRequestChildren = children;
    }
    public Set<PurchaseRequestChildDTO> getPurchaseRequestChildren() {
        return this.purchaseRequestChildren;
    }

    public String getPdfURLPath() {
        return pdfURLPath;
    }

    public void setPdfURLPath(String pdfURLPath) {
        this.pdfURLPath = pdfURLPath;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PurchaseRequestParentDTO purchaseRequestParentDTO = (PurchaseRequestParentDTO) o;
        if (purchaseRequestParentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseRequestParentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseRequestParentDTO{" +
            "id=" + getId() +
            ", pdfURLPath='" + getPdfURLPath() + "'" +
            ", employee=" + getEmployeeId() +
            "}";
    }
}
