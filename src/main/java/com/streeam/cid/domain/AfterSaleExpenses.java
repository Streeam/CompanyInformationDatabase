package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A AfterSaleExpenses.
 */
@Entity
@Table(name = "after_sale_expenses")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AfterSaleExpenses implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "description")
    private String description;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "cost", nullable = false)
    private Double cost;

    @NotNull
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @NotNull
    @Column(name = "customer_non_conformance_id", nullable = false)
    private Long customerNonConformanceId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public AfterSaleExpenses date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public AfterSaleExpenses description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getCost() {
        return cost;
    }

    public AfterSaleExpenses cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public AfterSaleExpenses employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getCustomerNonConformanceId() {
        return customerNonConformanceId;
    }

    public AfterSaleExpenses customerNonConformanceId(Long customerNonConformanceId) {
        this.customerNonConformanceId = customerNonConformanceId;
        return this;
    }

    public void setCustomerNonConformanceId(Long customerNonConformanceId) {
        this.customerNonConformanceId = customerNonConformanceId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AfterSaleExpenses)) {
            return false;
        }
        return id != null && id.equals(((AfterSaleExpenses) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AfterSaleExpenses{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", cost=" + getCost() +
            ", employeeId=" + getEmployeeId() +
            ", customerNonConformanceId=" + getCustomerNonConformanceId() +
            "}";
    }
}
