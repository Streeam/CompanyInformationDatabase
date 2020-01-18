package com.streeam.cid.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.streeam.cid.domain.enumeration.PurchaseRequestStatus;

/**
 * A DTO for the {@link com.streeam.cid.domain.PurchaseRequestChild} entity.
 */
public class PurchaseRequestChildDTO implements Serializable {

    private Long id;

    @NotNull
    private Double quantity;

    @NotNull
    private LocalDate orderedDate;

    @NotNull
    private LocalDate dueDate;

    @NotNull
    private Boolean commited;

    @NotNull
    private PurchaseRequestStatus status;

    @Size(max = 200)
    private String comment;


    private Long productId;

    private Long purchaseRequestParentId;

    private Long salesOrderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public LocalDate getOrderedDate() {
        return orderedDate;
    }

    public void setOrderedDate(LocalDate orderedDate) {
        this.orderedDate = orderedDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Boolean isCommited() {
        return commited;
    }

    public void setCommited(Boolean commited) {
        this.commited = commited;
    }

    public PurchaseRequestStatus getStatus() {
        return status;
    }

    public void setStatus(PurchaseRequestStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getPurchaseRequestParentId() {
        return purchaseRequestParentId;
    }

    public void setPurchaseRequestParentId(Long purchaseRequestParentId) {
        this.purchaseRequestParentId = purchaseRequestParentId;
    }

    public Long getSalesOrderId() {
        return salesOrderId;
    }

    public void setSalesOrderId(Long salesOrderId) {
        this.salesOrderId = salesOrderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PurchaseRequestChildDTO purchaseRequestChildDTO = (PurchaseRequestChildDTO) o;
        if (purchaseRequestChildDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), purchaseRequestChildDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PurchaseRequestChildDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", orderedDate='" + getOrderedDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", commited='" + isCommited() + "'" +
            ", status='" + getStatus() + "'" +
            ", comment='" + getComment() + "'" +
            ", product=" + getProductId() +
            ", purchaseRequestParent=" + getPurchaseRequestParentId() +
            ", salesOrder=" + getSalesOrderId() +
            "}";
    }
}
