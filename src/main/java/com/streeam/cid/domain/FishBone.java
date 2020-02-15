package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.streeam.cid.domain.enumeration.FishBoneTypes;

/**
 * A FishBone.
 */
@Entity
@Table(name = "fish_bone")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FishBone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "fishbone_types", nullable = false)
    private FishBoneTypes fishboneTypes;

    @Column(name = "sub_category")
    private String subCategory;

    @NotNull
    @Column(name = "root_cause_id", nullable = false)
    private Long rootCauseId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FishBoneTypes getFishboneTypes() {
        return fishboneTypes;
    }

    public FishBone fishboneTypes(FishBoneTypes fishboneTypes) {
        this.fishboneTypes = fishboneTypes;
        return this;
    }

    public void setFishboneTypes(FishBoneTypes fishboneTypes) {
        this.fishboneTypes = fishboneTypes;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public FishBone subCategory(String subCategory) {
        this.subCategory = subCategory;
        return this;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public Long getRootCauseId() {
        return rootCauseId;
    }

    public FishBone rootCauseId(Long rootCauseId) {
        this.rootCauseId = rootCauseId;
        return this;
    }

    public void setRootCauseId(Long rootCauseId) {
        this.rootCauseId = rootCauseId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FishBone)) {
            return false;
        }
        return id != null && id.equals(((FishBone) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FishBone{" +
            "id=" + getId() +
            ", fishboneTypes='" + getFishboneTypes() + "'" +
            ", subCategory='" + getSubCategory() + "'" +
            ", rootCauseId=" + getRootCauseId() +
            "}";
    }
}
