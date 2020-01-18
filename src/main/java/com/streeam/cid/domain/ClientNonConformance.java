package com.streeam.cid.domain;
import com.streeam.cid.domain.enumeration.CustomerNonconformaceType;
import com.streeam.cid.domain.enumeration.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A ClientNonConformance.
 */
@Entity
@Table(name = "client_non_conformance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClientNonConformance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "non_conformance_type", nullable = false)
    private CustomerNonconformaceType nonConformanceType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @NotNull
    @Column(name = "nonconformance_details_id", nullable = false)
    private Long nonconformanceDetailsId;

    @Column(name = "rejection_reason_details")
    private String rejectionReasonDetails;

    @Column(name = "action_to_be_taken_details")
    private String actionToBeTakenDetails;

    @Column(name = "short_term_details")
    private String shortTermDetails;

    @Column(name = "long_term_details")
    private String longTermDetails;

    @NotNull
    @Column(name = "jhi_current_date", nullable = false)
    private Instant currentDate;

    @NotNull
    @Column(name = "rejection_date", nullable = false)
    private Instant rejectionDate;

    @NotNull
    @Column(name = "under_warranty", nullable = false)
    private Boolean underWarranty;

    @Min(value = 1)
    @Column(name = "quantity")
    private Integer quantity;

    @DecimalMin(value = "0")
    @Column(name = "labour_rate")
    private Double labourRate;

    @OneToOne
    @JoinColumn
    private Customer customer;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "client_non_conformance_culpable_employees",
               joinColumns = @JoinColumn(name = "client_non_conformance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "culpable_employees_id", referencedColumnName = "id"))
    private Set<Employee> culpableEmployees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerNonconformaceType getNonConformanceType() {
        return nonConformanceType;
    }

    public ClientNonConformance nonConformanceType(CustomerNonconformaceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
        return this;
    }

    public void setNonConformanceType(CustomerNonconformaceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
    }

    public Status getStatus() {
        return status;
    }

    public ClientNonConformance status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getNonconformanceDetailsId() {
        return nonconformanceDetailsId;
    }

    public ClientNonConformance nonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
        return this;
    }

    public void setNonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
    }

    public String getRejectionReasonDetails() {
        return rejectionReasonDetails;
    }

    public ClientNonConformance rejectionReasonDetails(String rejectionReasonDetails) {
        this.rejectionReasonDetails = rejectionReasonDetails;
        return this;
    }

    public void setRejectionReasonDetails(String rejectionReasonDetails) {
        this.rejectionReasonDetails = rejectionReasonDetails;
    }

    public String getActionToBeTakenDetails() {
        return actionToBeTakenDetails;
    }

    public ClientNonConformance actionToBeTakenDetails(String actionToBeTakenDetails) {
        this.actionToBeTakenDetails = actionToBeTakenDetails;
        return this;
    }

    public void setActionToBeTakenDetails(String actionToBeTakenDetails) {
        this.actionToBeTakenDetails = actionToBeTakenDetails;
    }

    public String getShortTermDetails() {
        return shortTermDetails;
    }

    public ClientNonConformance shortTermDetails(String shortTermDetails) {
        this.shortTermDetails = shortTermDetails;
        return this;
    }

    public void setShortTermDetails(String shortTermDetails) {
        this.shortTermDetails = shortTermDetails;
    }

    public String getLongTermDetails() {
        return longTermDetails;
    }

    public ClientNonConformance longTermDetails(String longTermDetails) {
        this.longTermDetails = longTermDetails;
        return this;
    }

    public void setLongTermDetails(String longTermDetails) {
        this.longTermDetails = longTermDetails;
    }

    public Instant getCurrentDate() {
        return currentDate;
    }

    public ClientNonConformance currentDate(Instant currentDate) {
        this.currentDate = currentDate;
        return this;
    }

    public void setCurrentDate(Instant currentDate) {
        this.currentDate = currentDate;
    }

    public Instant getRejectionDate() {
        return rejectionDate;
    }

    public ClientNonConformance rejectionDate(Instant rejectionDate) {
        this.rejectionDate = rejectionDate;
        return this;
    }

    public void setRejectionDate(Instant rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public Boolean isUnderWarranty() {
        return underWarranty;
    }

    public ClientNonConformance underWarranty(Boolean underWarranty) {
        this.underWarranty = underWarranty;
        return this;
    }

    public void setUnderWarranty(Boolean underWarranty) {
        this.underWarranty = underWarranty;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public ClientNonConformance quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getLabourRate() {
        return labourRate;
    }

    public ClientNonConformance labourRate(Double labourRate) {
        this.labourRate = labourRate;
        return this;
    }

    public void setLabourRate(Double labourRate) {
        this.labourRate = labourRate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public ClientNonConformance customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<Employee> getCulpableEmployees() {
        return culpableEmployees;
    }

    public ClientNonConformance culpableEmployees(Set<Employee> employees) {
        this.culpableEmployees = employees;
        return this;
    }

    public ClientNonConformance addCulpableEmployees(Employee employee) {
        this.culpableEmployees.add(employee);
        employee.getClientNonConformances().add(this);
        return this;
    }

    public ClientNonConformance removeCulpableEmployees(Employee employee) {
        this.culpableEmployees.remove(employee);
        employee.getClientNonConformances().remove(this);
        return this;
    }

    public void setCulpableEmployees(Set<Employee> employees) {
        this.culpableEmployees = employees;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientNonConformance)) {
            return false;
        }
        return id != null && id.equals(((ClientNonConformance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ClientNonConformance{" +
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
            "}";
    }
}
