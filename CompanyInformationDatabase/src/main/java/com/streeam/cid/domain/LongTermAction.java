package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A LongTermAction.
 */
@Entity
@Table(name = "long_term_action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LongTermAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "non_conformance_id", nullable = false)
    private Long nonConformanceId;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNonConformanceId() {
        return nonConformanceId;
    }

    public LongTermAction nonConformanceId(Long nonConformanceId) {
        this.nonConformanceId = nonConformanceId;
        return this;
    }

    public void setNonConformanceId(Long nonConformanceId) {
        this.nonConformanceId = nonConformanceId;
    }

    public String getDescription() {
        return description;
    }

    public LongTermAction description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LongTermAction)) {
            return false;
        }
        return id != null && id.equals(((LongTermAction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LongTermAction{" +
            "id=" + getId() +
            ", nonConformanceId=" + getNonConformanceId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
