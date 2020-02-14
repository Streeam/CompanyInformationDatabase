package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A NonConformanceType.
 */
@Entity
@Table(name = "non_conformance_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NonConformanceType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "rejection_code", nullable = false)
    private String rejectionCode;

    @NotNull
    @Column(name = "rejection_title", nullable = false)
    private String rejectionTitle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRejectionCode() {
        return rejectionCode;
    }

    public NonConformanceType rejectionCode(String rejectionCode) {
        this.rejectionCode = rejectionCode;
        return this;
    }

    public void setRejectionCode(String rejectionCode) {
        this.rejectionCode = rejectionCode;
    }

    public String getRejectionTitle() {
        return rejectionTitle;
    }

    public NonConformanceType rejectionTitle(String rejectionTitle) {
        this.rejectionTitle = rejectionTitle;
        return this;
    }

    public void setRejectionTitle(String rejectionTitle) {
        this.rejectionTitle = rejectionTitle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NonConformanceType)) {
            return false;
        }
        return id != null && id.equals(((NonConformanceType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NonConformanceType{" +
            "id=" + getId() +
            ", rejectionCode='" + getRejectionCode() + "'" +
            ", rejectionTitle='" + getRejectionTitle() + "'" +
            "}";
    }
}
