package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import com.streeam.cid.domain.enumeration.PurchaseRequestStatus;

/**
 * A PurchaseRequestChild.
 */
@Entity
@Table(name = "purchase_request_child")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseRequestChild implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Double quantity;

    @NotNull
    @Column(name = "ordered_date", nullable = false)
    private LocalDate orderedDate;

    @NotNull
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @NotNull
    @Column(name = "commited", nullable = false)
    private Boolean commited;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PurchaseRequestStatus status;

    @Size(max = 200)
    @Column(name = "comment", length = 200)
    private String comment;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("purchaseRequestChildren")
    private PurchaseRequestParent purchaseRequestParent;

    @ManyToOne
    @JsonIgnoreProperties("purchaseRequestChildren")
    private SalesOrder salesOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public PurchaseRequestChild quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public LocalDate getOrderedDate() {
        return orderedDate;
    }

    public PurchaseRequestChild orderedDate(LocalDate orderedDate) {
        this.orderedDate = orderedDate;
        return this;
    }

    public void setOrderedDate(LocalDate orderedDate) {
        this.orderedDate = orderedDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public PurchaseRequestChild dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Boolean isCommited() {
        return commited;
    }

    public PurchaseRequestChild commited(Boolean commited) {
        this.commited = commited;
        return this;
    }

    public void setCommited(Boolean commited) {
        this.commited = commited;
    }

    public PurchaseRequestStatus getStatus() {
        return status;
    }

    public PurchaseRequestChild status(PurchaseRequestStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(PurchaseRequestStatus status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public PurchaseRequestChild comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Product getProduct() {
        return product;
    }

    public PurchaseRequestChild product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public PurchaseRequestParent getPurchaseRequestParent() {
        return purchaseRequestParent;
    }

    public PurchaseRequestChild purchaseRequestParent(PurchaseRequestParent purchaseRequestParent) {
        this.purchaseRequestParent = purchaseRequestParent;
        return this;
    }

    public void setPurchaseRequestParent(PurchaseRequestParent purchaseRequestParent) {
        this.purchaseRequestParent = purchaseRequestParent;
    }

    public SalesOrder getSalesOrder() {
        return salesOrder;
    }

    public PurchaseRequestChild salesOrder(SalesOrder salesOrder) {
        this.salesOrder = salesOrder;
        return this;
    }

    public void setSalesOrder(SalesOrder salesOrder) {
        this.salesOrder = salesOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseRequestChild)) {
            return false;
        }
        return id != null && id.equals(((PurchaseRequestChild) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PurchaseRequestChild{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", orderedDate='" + getOrderedDate() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", commited='" + isCommited() + "'" +
            ", status='" + getStatus() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
