package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Routing.
 */
@Entity
@Table(name = "routing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Routing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "resource_name", nullable = false)
    private String resourceName;

    @NotNull
    @Column(name = "resource_type", nullable = false)
    private String resourceType;

    @NotNull
    @Column(name = "unit_run_time", nullable = false)
    private Integer unitRunTime;

    @Column(name = "part_number")
    private String partNumber;

    @Min(value = 0)
    @Column(name = "layout_time")
    private Integer layoutTime;

    @Column(name = "unique_identifier")
    private String uniqueIdentifier;

    @OneToMany(mappedBy = "routing")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Version> versions = new HashSet<>();

    @ManyToMany(mappedBy = "routings")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    @ManyToMany(mappedBy = "routings")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<NonConformanceDetails> nonConformanceDetails = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResourceName() {
        return resourceName;
    }

    public Routing resourceName(String resourceName) {
        this.resourceName = resourceName;
        return this;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getResourceType() {
        return resourceType;
    }

    public Routing resourceType(String resourceType) {
        this.resourceType = resourceType;
        return this;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public Integer getUnitRunTime() {
        return unitRunTime;
    }

    public Routing unitRunTime(Integer unitRunTime) {
        this.unitRunTime = unitRunTime;
        return this;
    }

    public void setUnitRunTime(Integer unitRunTime) {
        this.unitRunTime = unitRunTime;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public Routing partNumber(String partNumber) {
        this.partNumber = partNumber;
        return this;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public Integer getLayoutTime() {
        return layoutTime;
    }

    public Routing layoutTime(Integer layoutTime) {
        this.layoutTime = layoutTime;
        return this;
    }

    public void setLayoutTime(Integer layoutTime) {
        this.layoutTime = layoutTime;
    }

    public String getUniqueIdentifier() {
        return uniqueIdentifier;
    }

    public Routing uniqueIdentifier(String uniqueIdentifier) {
        this.uniqueIdentifier = uniqueIdentifier;
        return this;
    }

    public void setUniqueIdentifier(String uniqueIdentifier) {
        this.uniqueIdentifier = uniqueIdentifier;
    }

    public Set<Version> getVersions() {
        return versions;
    }

    public Routing versions(Set<Version> versions) {
        this.versions = versions;
        return this;
    }

    public Routing addVersion(Version version) {
        this.versions.add(version);
        version.setRouting(this);
        return this;
    }

    public Routing removeVersion(Version version) {
        this.versions.remove(version);
        version.setRouting(null);
        return this;
    }

    public void setVersions(Set<Version> versions) {
        this.versions = versions;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Routing products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Routing addProducts(Product product) {
        this.products.add(product);
        product.getRoutings().add(this);
        return this;
    }

    public Routing removeProducts(Product product) {
        this.products.remove(product);
        product.getRoutings().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<NonConformanceDetails> getNonConformanceDetails() {
        return nonConformanceDetails;
    }

    public Routing nonConformanceDetails(Set<NonConformanceDetails> nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
        return this;
    }

    public Routing addNonConformancesDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails.add(nonConformanceDetails);
        nonConformanceDetails.getRoutings().add(this);
        return this;
    }

    public Routing removeNonConformancesDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails.remove(nonConformanceDetails);
        nonConformanceDetails.getRoutings().remove(this);
        return this;
    }

    public void setNonConformanceDetails(Set<NonConformanceDetails> nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Routing)) {
            return false;
        }
        return id != null && id.equals(((Routing) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Routing{" +
            "id=" + getId() +
            ", resourceName='" + getResourceName() + "'" +
            ", resourceType='" + getResourceType() + "'" +
            ", unitRunTime=" + getUnitRunTime() +
            ", partNumber='" + getPartNumber() + "'" +
            ", layoutTime=" + getLayoutTime() +
            ", uniqueIdentifier='" + getUniqueIdentifier() + "'" +
            "}";
    }
}
