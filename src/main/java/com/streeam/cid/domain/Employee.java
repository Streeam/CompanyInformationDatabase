package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "hired_date")
    private LocalDate hiredDate;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @OneToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(unique = true)
    private Roles role;

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NonConformanceDetails> nonConformanceDetails = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employee_internal_non_conformance",
        joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "internal_non_conformance_id", referencedColumnName = "id"))
    private Set<InternalNonConformance> internalNonConformances = new HashSet<>();

    @ManyToMany(mappedBy = "culpableEmployees", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ClientNonConformance> clientNonConformances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public Employee image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Employee imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public Employee jobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
        return this;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDate getHiredDate() {
        return hiredDate;
    }

    public Employee hiredDate(LocalDate hiredDate) {
        this.hiredDate = hiredDate;
        return this;
    }

    public void setHiredDate(LocalDate hiredDate) {
        this.hiredDate = hiredDate;
    }

    public User getUser() {
        return user;
    }

    public Employee user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Roles getRole() {
        return role;
    }

    public Employee role(Roles roles) {
        this.role = roles;
        return this;
    }

    public void setRole(Roles roles) {
        this.role = roles;
    }

    public Set<NonConformanceDetails> getNonConformanceDetails() {
        return nonConformanceDetails;
    }

    public Employee nonConformanceDetails(Set<NonConformanceDetails> nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
        return this;
    }

    public Employee addNonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails.add(nonConformanceDetails);
        nonConformanceDetails.setEmployee(this);
        return this;
    }

    public Employee removeNonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails.remove(nonConformanceDetails);
        nonConformanceDetails.setEmployee(null);
        return this;
    }

    public void setNonConformanceDetails(Set<NonConformanceDetails> nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
    }

    public Set<InternalNonConformance> getInternalNonConformances() {
        return internalNonConformances;
    }

    public Employee internalNonConformances(Set<InternalNonConformance> internalNonConformances) {
        this.internalNonConformances = internalNonConformances;
        return this;
    }

    public Employee addInternalNonConformance(InternalNonConformance internalNonConformance) {
        this.internalNonConformances.add(internalNonConformance);
        internalNonConformance.getEmployees().add(this);
        return this;
    }

    public Employee removeInternalNonConformance(InternalNonConformance internalNonConformance) {
        this.internalNonConformances.remove(internalNonConformance);
        internalNonConformance.getEmployees().remove(this);
        return this;
    }

    public void setInternalNonConformances(Set<InternalNonConformance> internalNonConformances) {
        this.internalNonConformances = internalNonConformances;
    }

    public Set<ClientNonConformance> getClientNonConformances() {
        return clientNonConformances;
    }

    public Employee clientNonConformances(Set<ClientNonConformance> clientNonConformances) {
        this.clientNonConformances = clientNonConformances;
        return this;
    }

    public Employee addClientNonConformances(ClientNonConformance clientNonConformance) {
        this.clientNonConformances.add(clientNonConformance);
        clientNonConformance.getCulpableEmployees().add(this);
        return this;
    }

    public Employee removeClientNonConformances(ClientNonConformance clientNonConformance) {
        this.clientNonConformances.remove(clientNonConformance);
        clientNonConformance.getCulpableEmployees().remove(this);
        return this;
    }

    public void setClientNonConformances(Set<ClientNonConformance> clientNonConformances) {
        this.clientNonConformances = clientNonConformances;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", jobTitle='" + getJobTitle() + "'" +
            ", hiredDate='" + getHiredDate() + "'" +
            "}";
    }
}
