package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ShortTermAction.
 */
@Entity
@Table(name = "short_term_action")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ShortTermAction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "non_conformance_id", nullable = false)
    private Long nonConformanceId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public ShortTermAction description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getNonConformanceId() {
        return nonConformanceId;
    }

    public ShortTermAction nonConformanceId(Long nonConformanceId) {
        this.nonConformanceId = nonConformanceId;
        return this;
    }

    public void setNonConformanceId(Long nonConformanceId) {
        this.nonConformanceId = nonConformanceId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShortTermAction)) {
            return false;
        }
        return id != null && id.equals(((ShortTermAction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ShortTermAction{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", nonConformanceId=" + getNonConformanceId() +
            "}";
    }
}
