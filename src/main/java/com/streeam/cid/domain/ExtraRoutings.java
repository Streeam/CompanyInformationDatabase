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
 * A ExtraRoutings.
 */
@Entity
@Table(name = "extra_routings")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExtraRoutings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "overhead", nullable = false)
    private Double overhead;

    @NotNull
    @Column(name = "resource_name", nullable = false)
    private String resourceName;

    @NotNull
    @Min(value = 0)
    @Column(name = "runtime", nullable = false)
    private Integer runtime;

    @Min(value = 0L)
    @Column(name = "internal_non_conformance_id")
    private Long internalNonConformanceId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nonconformance_type", nullable = false)
    private Nonconformance nonconformanceType;

    @Enumerated(EnumType.STRING)
    @Column(name = "nonconformance_action")
    private NonconformanceAction nonconformanceAction;

    @Column(name = "customer_non_conformace_id")
    private Long customerNonConformaceId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getOverhead() {
        return overhead;
    }

    public ExtraRoutings overhead(Double overhead) {
        this.overhead = overhead;
        return this;
    }

    public void setOverhead(Double overhead) {
        this.overhead = overhead;
    }

    public String getResourceName() {
        return resourceName;
    }

    public ExtraRoutings resourceName(String resourceName) {
        this.resourceName = resourceName;
        return this;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public ExtraRoutings runtime(Integer runtime) {
        this.runtime = runtime;
        return this;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public Long getInternalNonConformanceId() {
        return internalNonConformanceId;
    }

    public ExtraRoutings internalNonConformanceId(Long internalNonConformanceId) {
        this.internalNonConformanceId = internalNonConformanceId;
        return this;
    }

    public void setInternalNonConformanceId(Long internalNonConformanceId) {
        this.internalNonConformanceId = internalNonConformanceId;
    }

    public Nonconformance getNonconformanceType() {
        return nonconformanceType;
    }

    public ExtraRoutings nonconformanceType(Nonconformance nonconformanceType) {
        this.nonconformanceType = nonconformanceType;
        return this;
    }

    public void setNonconformanceType(Nonconformance nonconformanceType) {
        this.nonconformanceType = nonconformanceType;
    }

    public NonconformanceAction getNonconformanceAction() {
        return nonconformanceAction;
    }

    public ExtraRoutings nonconformanceAction(NonconformanceAction nonconformanceAction) {
        this.nonconformanceAction = nonconformanceAction;
        return this;
    }

    public void setNonconformanceAction(NonconformanceAction nonconformanceAction) {
        this.nonconformanceAction = nonconformanceAction;
    }

    public Long getCustomerNonConformaceId() {
        return customerNonConformaceId;
    }

    public ExtraRoutings customerNonConformaceId(Long customerNonConformaceId) {
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
        if (!(o instanceof ExtraRoutings)) {
            return false;
        }
        return id != null && id.equals(((ExtraRoutings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ExtraRoutings{" +
            "id=" + getId() +
            ", overhead=" + getOverhead() +
            ", resourceName='" + getResourceName() + "'" +
            ", runtime=" + getRuntime() +
            ", internalNonConformanceId=" + getInternalNonConformanceId() +
            ", nonconformanceType='" + getNonconformanceType() + "'" +
            ", nonconformanceAction='" + getNonconformanceAction() + "'" +
            ", customerNonConformaceId=" + getCustomerNonConformaceId() +
            "}";
    }
}
