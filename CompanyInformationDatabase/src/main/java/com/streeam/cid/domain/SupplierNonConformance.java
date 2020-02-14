package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.streeam.cid.domain.enumeration.NonconformanceAction;

import com.streeam.cid.domain.enumeration.SupplierNonconformaceType;

/**
 * A SupplierNonConformance.
 */
@Entity
@Table(name = "supplier_non_conformance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplierNonConformance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private NonconformanceAction action;

    @Min(value = 0)
    @Column(name = "labour")
    private Integer labour;

    @Column(name = "concesion_details")
    private String concesionDetails;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "rejection_fee", nullable = false)
    private Double rejectionFee;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "non_conformance_type", nullable = false)
    private SupplierNonconformaceType nonConformanceType;

    @ManyToOne
    @JsonIgnoreProperties("supplierNonConformances")
    private Employee employee;

    @OneToOne
    @JoinColumn(unique = true)
    private Supplier supplier;

    @ManyToOne
    @JsonIgnoreProperties("supplierNonConformances")
    private NonConformanceDetails nonConformanceDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NonconformanceAction getAction() {
        return action;
    }

    public SupplierNonConformance action(NonconformanceAction action) {
        this.action = action;
        return this;
    }

    public void setAction(NonconformanceAction action) {
        this.action = action;
    }

    public Integer getLabour() {
        return labour;
    }

    public SupplierNonConformance labour(Integer labour) {
        this.labour = labour;
        return this;
    }

    public void setLabour(Integer labour) {
        this.labour = labour;
    }

    public String getConcesionDetails() {
        return concesionDetails;
    }

    public SupplierNonConformance concesionDetails(String concesionDetails) {
        this.concesionDetails = concesionDetails;
        return this;
    }

    public void setConcesionDetails(String concesionDetails) {
        this.concesionDetails = concesionDetails;
    }

    public Double getRejectionFee() {
        return rejectionFee;
    }

    public SupplierNonConformance rejectionFee(Double rejectionFee) {
        this.rejectionFee = rejectionFee;
        return this;
    }

    public void setRejectionFee(Double rejectionFee) {
        this.rejectionFee = rejectionFee;
    }

    public SupplierNonconformaceType getNonConformanceType() {
        return nonConformanceType;
    }

    public SupplierNonConformance nonConformanceType(SupplierNonconformaceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
        return this;
    }

    public void setNonConformanceType(SupplierNonconformaceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
    }

    public Employee getEmployee() {
        return employee;
    }

    public SupplierNonConformance employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public SupplierNonConformance supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public NonConformanceDetails getNonConformanceDetails() {
        return nonConformanceDetails;
    }

    public SupplierNonConformance nonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
        return this;
    }

    public void setNonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SupplierNonConformance)) {
            return false;
        }
        return id != null && id.equals(((SupplierNonConformance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SupplierNonConformance{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", labour=" + getLabour() +
            ", concesionDetails='" + getConcesionDetails() + "'" +
            ", rejectionFee=" + getRejectionFee() +
            ", nonConformanceType='" + getNonConformanceType() + "'" +
            "}";
    }
}
