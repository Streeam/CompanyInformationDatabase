package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Department.
 */
@Entity
@Table(name = "department")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "department")
    private String department;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("departments")
    private Site site;

    @ManyToMany(mappedBy = "departments")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<InternalNonConformance> internalNonConformances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public Department department(String department) {
        this.department = department;
        return this;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Site getSite() {
        return site;
    }

    public Department site(Site site) {
        this.site = site;
        return this;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Set<InternalNonConformance> getInternalNonConformances() {
        return internalNonConformances;
    }

    public Department internalNonConformances(Set<InternalNonConformance> internalNonConformances) {
        this.internalNonConformances = internalNonConformances;
        return this;
    }

    public Department addInternalNonConformance(InternalNonConformance internalNonConformance) {
        this.internalNonConformances.add(internalNonConformance);
        internalNonConformance.getDepartments().add(this);
        return this;
    }

    public Department removeInternalNonConformance(InternalNonConformance internalNonConformance) {
        this.internalNonConformances.remove(internalNonConformance);
        internalNonConformance.getDepartments().remove(this);
        return this;
    }

    public void setInternalNonConformances(Set<InternalNonConformance> internalNonConformances) {
        this.internalNonConformances = internalNonConformances;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Department)) {
            return false;
        }
        return id != null && id.equals(((Department) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", department='" + getDepartment() + "'" +
            "}";
    }
}
