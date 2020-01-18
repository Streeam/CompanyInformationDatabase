package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.streeam.cid.domain.enumeration.Nonconformance;
import com.streeam.cid.domain.enumeration.Priority;
import com.streeam.cid.domain.enumeration.Status;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A NonConformanceDetails.
 */
@Entity
@Table(name = "non_conformance_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NonConformanceDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "deadline", nullable = false)
    private LocalDate deadline;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "progress", nullable = false)
    private Integer progress;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(name = "nonconformance")
    private Nonconformance nonconformance;

    @Column(name = "jhi_current_date")
    private Instant currentDate;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "non_conformance_details_product",
               joinColumns = @JoinColumn(name = "non_conformance_details_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "non_conformance_details_routing",
               joinColumns = @JoinColumn(name = "non_conformance_details_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "routing_id", referencedColumnName = "id"))
    private Set<Routing> routings = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("nonConformanceDetails")
    private Employee employee;

    @OneToOne
    private NonConformanceType nonConformanceType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public NonConformanceDetails deadline(LocalDate deadline) {
        this.deadline = deadline;
        return this;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Status getStatus() {
        return status;
    }

    public NonConformanceDetails status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getProgress() {
        return progress;
    }

    public NonConformanceDetails progress(Integer progress) {
        this.progress = progress;
        return this;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Priority getPriority() {
        return priority;
    }

    public NonConformanceDetails priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Nonconformance getNonconformance() {
        return nonconformance;
    }

    public NonConformanceDetails nonconformance(Nonconformance nonconformance) {
        this.nonconformance = nonconformance;
        return this;
    }

    public void setNonconformance(Nonconformance nonconformance) {
        this.nonconformance = nonconformance;
    }

    public Instant getCurrentDate() {
        return currentDate;
    }

    public NonConformanceDetails currentDate(Instant currentDate) {
        this.currentDate = currentDate;
        return this;
    }

    public void setCurrentDate(Instant currentDate) {
        this.currentDate = currentDate;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public NonConformanceDetails products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public NonConformanceDetails addProduct(Product product) {
        this.products.add(product);
        product.getNonConformanceDetails().add(this);
        return this;
    }

    public NonConformanceDetails removeProduct(Product product) {
        this.products.remove(product);
        product.getNonConformanceDetails().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<Routing> getRoutings() {
        return routings;
    }

    public NonConformanceDetails routings(Set<Routing> routings) {
        this.routings = routings;
        return this;
    }

    public NonConformanceDetails addRouting(Routing routing) {
        this.routings.add(routing);
        routing.getNonConformanceDetails().add(this);
        return this;
    }

    public NonConformanceDetails removeRouting(Routing routing) {
        this.routings.remove(routing);
        routing.getNonConformanceDetails().remove(this);
        return this;
    }

    public void setRoutings(Set<Routing> routings) {
        this.routings = routings;
    }

    public Employee getEmployee() {
        return employee;
    }

    public NonConformanceDetails employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public NonConformanceType getNonConformanceType() {
        return nonConformanceType;
    }

    public NonConformanceDetails nonConformanceType(NonConformanceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
        return this;
    }

    public void setNonConformanceType(NonConformanceType nonConformanceType) {
        this.nonConformanceType = nonConformanceType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NonConformanceDetails)) {
            return false;
        }
        return id != null && id.equals(((NonConformanceDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NonConformanceDetails{" +
            "id=" + getId() +
            ", deadline='" + getDeadline() + "'" +
            ", status='" + getStatus() + "'" +
            ", progress=" + getProgress() +
            ", priority='" + getPriority() + "'" +
            ", nonconformance='" + getNonconformance() + "'" +
            ", currentDate='" + getCurrentDate() + "'" +
            "}";
    }
}
