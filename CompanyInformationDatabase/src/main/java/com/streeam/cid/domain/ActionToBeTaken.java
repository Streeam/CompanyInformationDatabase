package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ActionToBeTaken.
 */
@Entity
@Table(name = "action_to_be_taken")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ActionToBeTaken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "why_1_occurrance")
    private String why1Occurrance;

    @Column(name = "why_2_occurrance")
    private String why2Occurrance;

    @Column(name = "why_3_occurrance")
    private String why3Occurrance;

    @Column(name = "why_4_occurrance")
    private String why4Occurrance;

    @Column(name = "why_5_occurrance")
    private String why5Occurrance;

    @Column(name = "why_1_detection")
    private String why1Detection;

    @Column(name = "why_2_detection")
    private String why2Detection;

    @Column(name = "why_3_detaction")
    private String why3Detaction;

    @Column(name = "why_4_detection")
    private String why4Detection;

    @Column(name = "why_5_detection")
    private String why5Detection;

    @Column(name = "root_cause")
    private String rootCause;

    @Column(name = "problem")
    private String problem;

    @NotNull
    @Column(name = "nonconformance_id", nullable = false)
    private Long nonconformanceId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWhy1Occurrance() {
        return why1Occurrance;
    }

    public ActionToBeTaken why1Occurrance(String why1Occurrance) {
        this.why1Occurrance = why1Occurrance;
        return this;
    }

    public void setWhy1Occurrance(String why1Occurrance) {
        this.why1Occurrance = why1Occurrance;
    }

    public String getWhy2Occurrance() {
        return why2Occurrance;
    }

    public ActionToBeTaken why2Occurrance(String why2Occurrance) {
        this.why2Occurrance = why2Occurrance;
        return this;
    }

    public void setWhy2Occurrance(String why2Occurrance) {
        this.why2Occurrance = why2Occurrance;
    }

    public String getWhy3Occurrance() {
        return why3Occurrance;
    }

    public ActionToBeTaken why3Occurrance(String why3Occurrance) {
        this.why3Occurrance = why3Occurrance;
        return this;
    }

    public void setWhy3Occurrance(String why3Occurrance) {
        this.why3Occurrance = why3Occurrance;
    }

    public String getWhy4Occurrance() {
        return why4Occurrance;
    }

    public ActionToBeTaken why4Occurrance(String why4Occurrance) {
        this.why4Occurrance = why4Occurrance;
        return this;
    }

    public void setWhy4Occurrance(String why4Occurrance) {
        this.why4Occurrance = why4Occurrance;
    }

    public String getWhy5Occurrance() {
        return why5Occurrance;
    }

    public ActionToBeTaken why5Occurrance(String why5Occurrance) {
        this.why5Occurrance = why5Occurrance;
        return this;
    }

    public void setWhy5Occurrance(String why5Occurrance) {
        this.why5Occurrance = why5Occurrance;
    }

    public String getWhy1Detection() {
        return why1Detection;
    }

    public ActionToBeTaken why1Detection(String why1Detection) {
        this.why1Detection = why1Detection;
        return this;
    }

    public void setWhy1Detection(String why1Detection) {
        this.why1Detection = why1Detection;
    }

    public String getWhy2Detection() {
        return why2Detection;
    }

    public ActionToBeTaken why2Detection(String why2Detection) {
        this.why2Detection = why2Detection;
        return this;
    }

    public void setWhy2Detection(String why2Detection) {
        this.why2Detection = why2Detection;
    }

    public String getWhy3Detaction() {
        return why3Detaction;
    }

    public ActionToBeTaken why3Detaction(String why3Detaction) {
        this.why3Detaction = why3Detaction;
        return this;
    }

    public void setWhy3Detaction(String why3Detaction) {
        this.why3Detaction = why3Detaction;
    }

    public String getWhy4Detection() {
        return why4Detection;
    }

    public ActionToBeTaken why4Detection(String why4Detection) {
        this.why4Detection = why4Detection;
        return this;
    }

    public void setWhy4Detection(String why4Detection) {
        this.why4Detection = why4Detection;
    }

    public String getWhy5Detection() {
        return why5Detection;
    }

    public ActionToBeTaken why5Detection(String why5Detection) {
        this.why5Detection = why5Detection;
        return this;
    }

    public void setWhy5Detection(String why5Detection) {
        this.why5Detection = why5Detection;
    }

    public String getRootCause() {
        return rootCause;
    }

    public ActionToBeTaken rootCause(String rootCause) {
        this.rootCause = rootCause;
        return this;
    }

    public void setRootCause(String rootCause) {
        this.rootCause = rootCause;
    }

    public String getProblem() {
        return problem;
    }

    public ActionToBeTaken problem(String problem) {
        this.problem = problem;
        return this;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public Long getNonconformanceId() {
        return nonconformanceId;
    }

    public ActionToBeTaken nonconformanceId(Long nonconformanceId) {
        this.nonconformanceId = nonconformanceId;
        return this;
    }

    public void setNonconformanceId(Long nonconformanceId) {
        this.nonconformanceId = nonconformanceId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ActionToBeTaken)) {
            return false;
        }
        return id != null && id.equals(((ActionToBeTaken) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ActionToBeTaken{" +
            "id=" + getId() +
            ", why1Occurrance='" + getWhy1Occurrance() + "'" +
            ", why2Occurrance='" + getWhy2Occurrance() + "'" +
            ", why3Occurrance='" + getWhy3Occurrance() + "'" +
            ", why4Occurrance='" + getWhy4Occurrance() + "'" +
            ", why5Occurrance='" + getWhy5Occurrance() + "'" +
            ", why1Detection='" + getWhy1Detection() + "'" +
            ", why2Detection='" + getWhy2Detection() + "'" +
            ", why3Detaction='" + getWhy3Detaction() + "'" +
            ", why4Detection='" + getWhy4Detection() + "'" +
            ", why5Detection='" + getWhy5Detection() + "'" +
            ", rootCause='" + getRootCause() + "'" +
            ", problem='" + getProblem() + "'" +
            ", nonconformanceId=" + getNonconformanceId() +
            "}";
    }
}
