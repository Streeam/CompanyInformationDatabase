package com.streeam.cid.domain;
import com.streeam.cid.domain.enumeration.Nonconformance;
import com.streeam.cid.domain.enumeration.NonconformanceAction;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * A ExtraBoms.
 */
@Entity
@Table(name = "extra_boms")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtraBoms implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "part_number", nullable = false)
    private String partNumber;

    @Column(name = "part_description")
    private String partDescription;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "quantity", nullable = false)
    private Double quantity;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nonconformance_type", nullable = false)
    private Nonconformance nonconformanceType;

    @Enumerated(EnumType.STRING)
    @Column(name = "nonconformance_action")
    private NonconformanceAction nonconformanceAction;

    @Min(value = 0L)
    @Column(name = "internal_nonconformance_id")
    private Long internalNonconformanceId;

    @Column(name = "customer_non_conformace_id")
    private Long customerNonConformaceId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public ExtraBoms partNumber(String partNumber) {
        this.partNumber = partNumber;
        return this;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getPartDescription() {
        return partDescription;
    }

    public ExtraBoms partDescription(String partDescription) {
        this.partDescription = partDescription;
        return this;
    }

    public void setPartDescription(String partDescription) {
        this.partDescription = partDescription;
    }

    public Double getPrice() {
        return price;
    }

    public ExtraBoms price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getQuantity() {
        return quantity;
    }

    public ExtraBoms quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Nonconformance getNonconformanceType() {
        return nonconformanceType;
    }

    public ExtraBoms nonconformanceType(Nonconformance nonconformanceType) {
        this.nonconformanceType = nonconformanceType;
        return this;
    }

    public void setNonconformanceType(Nonconformance nonconformanceType) {
        this.nonconformanceType = nonconformanceType;
    }

    public NonconformanceAction getNonconformanceAction() {
        return nonconformanceAction;
    }

    public ExtraBoms nonconformanceAction(NonconformanceAction nonconformanceAction) {
        this.nonconformanceAction = nonconformanceAction;
        return this;
    }

    public void setNonconformanceAction(NonconformanceAction nonconformanceAction) {
        this.nonconformanceAction = nonconformanceAction;
    }

    public Long getInternalNonconformanceId() {
        return internalNonconformanceId;
    }

    public ExtraBoms internalNonconformanceId(Long internalNonconformanceId) {
        this.internalNonconformanceId = internalNonconformanceId;
        return this;
    }

    public void setInternalNonconformanceId(Long internalNonconformanceId) {
        this.internalNonconformanceId = internalNonconformanceId;
    }

    public Long getCustomerNonConformaceId() {
        return customerNonConformaceId;
    }

    public ExtraBoms customerNonConformaceId(Long customerNonConformaceId) {
        this.customerNonConformaceId = customerNonConformaceId;
        return this;
    }

    public void setCustomerNonConformaceId(Long customerNonConformaceId) {
        this.customerNonConformaceId = customerNonConformaceId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExtraBoms)) {
            return false;
        }
        return id != null && id.equals(((ExtraBoms) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtraBoms{" +
            "id=" + getId() +
            ", partNumber='" + getPartNumber() + "'" +
            ", partDescription='" + getPartDescription() + "'" +
            ", price=" + getPrice() +
            ", quantity=" + getQuantity() +
            ", nonconformanceType='" + getNonconformanceType() + "'" +
            ", nonconformanceAction='" + getNonconformanceAction() + "'" +
            ", internalNonconformanceId=" + getInternalNonconformanceId() +
            ", customerNonConformaceId=" + getCustomerNonConformaceId() +
            "}";
    }
}
