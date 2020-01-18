package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Site.
 */
@Entity
@Table(name = "site")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Site implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "site")
    private String site;

    @ManyToMany(mappedBy = "sites")
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

    public String getSite() {
        return site;
    }

    public Site site(String site) {
        this.site = site;
        return this;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public Set<InternalNonConformance> getInternalNonConformances() {
        return internalNonConformances;
    }

    public Site internalNonConformances(Set<InternalNonConformance> internalNonConformances) {
        this.internalNonConformances = internalNonConformances;
        return this;
    }

    public Site addInternalNonConformance(InternalNonConformance internalNonConformance) {
        this.internalNonConformances.add(internalNonConformance);
        internalNonConformance.getSites().add(this);
        return this;
    }

    public Site removeInternalNonConformance(InternalNonConformance internalNonConformance) {
        this.internalNonConformances.remove(internalNonConformance);
        internalNonConformance.getSites().remove(this);
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
        if (!(o instanceof Site)) {
            return false;
        }
        return id != null && id.equals(((Site) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Site{" +
            "id=" + getId() +
            ", site='" + getSite() + "'" +
            "}";
    }
}
