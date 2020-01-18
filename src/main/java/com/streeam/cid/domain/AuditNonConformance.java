package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.streeam.cid.domain.enumeration.AuditNonconformaceFirstType;

import com.streeam.cid.domain.enumeration.AuditNonconformaceSecondType;

/**
 * A AuditNonConformance.
 */
@Entity
@Table(name = "audit_non_conformance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AuditNonConformance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "audit_non_conformance_first_type", nullable = false)
    private AuditNonconformaceFirstType auditNonConformanceFirstType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "audit_non_conformance_second_type", nullable = false)
    private AuditNonconformaceSecondType auditNonConformanceSecondType;

    @ManyToOne
    @JsonIgnoreProperties("auditNonConformances")
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties("auditNonConformances")
    private NonConformanceDetails nonConformanceDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuditNonconformaceFirstType getAuditNonConformanceFirstType() {
        return auditNonConformanceFirstType;
    }

    public AuditNonConformance auditNonConformanceFirstType(AuditNonconformaceFirstType auditNonConformanceFirstType) {
        this.auditNonConformanceFirstType = auditNonConformanceFirstType;
        return this;
    }

    public void setAuditNonConformanceFirstType(AuditNonconformaceFirstType auditNonConformanceFirstType) {
        this.auditNonConformanceFirstType = auditNonConformanceFirstType;
    }

    public AuditNonconformaceSecondType getAuditNonConformanceSecondType() {
        return auditNonConformanceSecondType;
    }

    public AuditNonConformance auditNonConformanceSecondType(AuditNonconformaceSecondType auditNonConformanceSecondType) {
        this.auditNonConformanceSecondType = auditNonConformanceSecondType;
        return this;
    }

    public void setAuditNonConformanceSecondType(AuditNonconformaceSecondType auditNonConformanceSecondType) {
        this.auditNonConformanceSecondType = auditNonConformanceSecondType;
    }

    public Employee getEmployee() {
        return employee;
    }

    public AuditNonConformance employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public NonConformanceDetails getNonConformanceDetails() {
        return nonConformanceDetails;
    }

    public AuditNonConformance nonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
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
        if (!(o instanceof AuditNonConformance)) {
            return false;
        }
        return id != null && id.equals(((AuditNonConformance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AuditNonConformance{" +
            "id=" + getId() +
            ", auditNonConformanceFirstType='" + getAuditNonConformanceFirstType() + "'" +
            ", auditNonConformanceSecondType='" + getAuditNonConformanceSecondType() + "'" +
            "}";
    }
}
