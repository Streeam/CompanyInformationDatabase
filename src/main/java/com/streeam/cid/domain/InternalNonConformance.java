package com.streeam.cid.domain;
import com.streeam.cid.domain.enumeration.NonconformanceAction;
import com.streeam.cid.domain.enumeration.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A InternalNonConformance.
 */
@Entity
@Table(name = "internal_non_conformance")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class InternalNonConformance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private NonconformanceAction action;

    @Column(name = "curent_date")
    private LocalDate curentDate;

    @Column(name = "rejection_date")
    private LocalDate rejectionDate;

    @Column(name = "rejection_reason_details")
    private String rejectionReasonDetails;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "labour_rate", nullable = false)
    private Double labourRate;

    @Column(name = "nonconformance_details_id")
    private Long nonconformanceDetailsId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Min(value = 1)
    @Column(name = "quantity")
    private Integer quantity;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "internal_non_conformance_employee",
               joinColumns = @JoinColumn(name = "internal_non_conformance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"))
    private Set<Employee> employees = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "internal_non_conformance_site",
               joinColumns = @JoinColumn(name = "internal_non_conformance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "site_id", referencedColumnName = "id"))
    private Set<Site> sites = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "internal_non_conformance_department",
               joinColumns = @JoinColumn(name = "internal_non_conformance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "department_id", referencedColumnName = "id"))
    private Set<Department> departments = new HashSet<>();

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

    public InternalNonConformance action(NonconformanceAction action) {
        this.action = action;
        return this;
    }

    public void setAction(NonconformanceAction action) {
        this.action = action;
    }

    public LocalDate getCurentDate() {
        return curentDate;
    }

    public InternalNonConformance curentDate(LocalDate curentDate) {
        this.curentDate = curentDate;
        return this;
    }

    public void setCurentDate(LocalDate curentDate) {
        this.curentDate = curentDate;
    }

    public LocalDate getRejectionDate() {
        return rejectionDate;
    }

    public InternalNonConformance rejectionDate(LocalDate rejectionDate) {
        this.rejectionDate = rejectionDate;
        return this;
    }

    public void setRejectionDate(LocalDate rejectionDate) {
        this.rejectionDate = rejectionDate;
    }

    public String getRejectionReasonDetails() {
        return rejectionReasonDetails;
    }

    public InternalNonConformance rejectionReasonDetails(String rejectionReasonDetails) {
        this.rejectionReasonDetails = rejectionReasonDetails;
        return this;
    }

    public void setRejectionReasonDetails(String rejectionReasonDetails) {
        this.rejectionReasonDetails = rejectionReasonDetails;
    }

    public Double getLabourRate() {
        return labourRate;
    }

    public InternalNonConformance labourRate(Double labourRate) {
        this.labourRate = labourRate;
        return this;
    }

    public void setLabourRate(Double labourRate) {
        this.labourRate = labourRate;
    }

    public Long getNonconformanceDetailsId() {
        return nonconformanceDetailsId;
    }

    public InternalNonConformance nonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
        return this;
    }

    public void setNonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
    }

    public Status getStatus() {
        return status;
    }

    public InternalNonConformance status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public InternalNonConformance quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public InternalNonConformance employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public InternalNonConformance addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.getInternalNonConformances().add(this);
        return this;
    }

    public InternalNonConformance removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.getInternalNonConformances().remove(this);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Site> getSites() {
        return sites;
    }

    public InternalNonConformance sites(Set<Site> sites) {
        this.sites = sites;
        return this;
    }

    public InternalNonConformance addSite(Site site) {
        this.sites.add(site);
        site.getInternalNonConformances().add(this);
        return this;
    }

    public InternalNonConformance removeSite(Site site) {
        this.sites.remove(site);
        site.getInternalNonConformances().remove(this);
        return this;
    }

    public void setSites(Set<Site> sites) {
        this.sites = sites;
    }

    public Set<Department> getDepartments() {
        return departments;
    }

    public InternalNonConformance departments(Set<Department> departments) {
        this.departments = departments;
        return this;
    }

    public InternalNonConformance addDepartment(Department department) {
        this.departments.add(department);
        department.getInternalNonConformances().add(this);
        return this;
    }

    public InternalNonConformance removeDepartment(Department department) {
        this.departments.remove(department);
        department.getInternalNonConformances().remove(this);
        return this;
    }

    public void setDepartments(Set<Department> departments) {
        this.departments = departments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InternalNonConformance)) {
            return false;
        }
        return id != null && id.equals(((InternalNonConformance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InternalNonConformance{" +
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
