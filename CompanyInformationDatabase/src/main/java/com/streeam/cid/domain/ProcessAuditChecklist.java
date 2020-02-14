package com.streeam.cid.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A ProcessAuditChecklist.
 */
@Entity
@Table(name = "process_audit_checklist")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProcessAuditChecklist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "audit_question")
    private String auditQuestion;

    @NotNull
    @Column(name = "compliant", nullable = false)
    private Boolean compliant;

    @NotNull
    @Column(name = "ofi", nullable = false)
    private Boolean ofi;

    @NotNull
    @Column(name = "minor_nc", nullable = false)
    private Boolean minorNC;

    @NotNull
    @Column(name = "major_nc", nullable = false)
    private Boolean majorNC;

    @Column(name = "audit_answer")
    private String auditAnswer;

    @Column(name = "opportunities_for_improvement")
    private String opportunitiesForImprovement;

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

    public String getAuditQuestion() {
        return auditQuestion;
    }

    public ProcessAuditChecklist auditQuestion(String auditQuestion) {
        this.auditQuestion = auditQuestion;
        return this;
    }

    public void setAuditQuestion(String auditQuestion) {
        this.auditQuestion = auditQuestion;
    }

    public Boolean isCompliant() {
        return compliant;
    }

    public ProcessAuditChecklist compliant(Boolean compliant) {
        this.compliant = compliant;
        return this;
    }

    public void setCompliant(Boolean compliant) {
        this.compliant = compliant;
    }

    public Boolean isOfi() {
        return ofi;
    }

    public ProcessAuditChecklist ofi(Boolean ofi) {
        this.ofi = ofi;
        return this;
    }

    public void setOfi(Boolean ofi) {
        this.ofi = ofi;
    }

    public Boolean isMinorNC() {
        return minorNC;
    }

    public ProcessAuditChecklist minorNC(Boolean minorNC) {
        this.minorNC = minorNC;
        return this;
    }

    public void setMinorNC(Boolean minorNC) {
        this.minorNC = minorNC;
    }

    public Boolean isMajorNC() {
        return majorNC;
    }

    public ProcessAuditChecklist majorNC(Boolean majorNC) {
        this.majorNC = majorNC;
        return this;
    }

    public void setMajorNC(Boolean majorNC) {
        this.majorNC = majorNC;
    }

    public String getAuditAnswer() {
        return auditAnswer;
    }

    public ProcessAuditChecklist auditAnswer(String auditAnswer) {
        this.auditAnswer = auditAnswer;
        return this;
    }

    public void setAuditAnswer(String auditAnswer) {
        this.auditAnswer = auditAnswer;
    }

    public String getOpportunitiesForImprovement() {
        return opportunitiesForImprovement;
    }

    public ProcessAuditChecklist opportunitiesForImprovement(String opportunitiesForImprovement) {
        this.opportunitiesForImprovement = opportunitiesForImprovement;
        return this;
    }

    public void setOpportunitiesForImprovement(String opportunitiesForImprovement) {
        this.opportunitiesForImprovement = opportunitiesForImprovement;
    }

    public Long getNonConformanceId() {
        return nonConformanceId;
    }

    public ProcessAuditChecklist nonConformanceId(Long nonConformanceId) {
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
        if (!(o instanceof ProcessAuditChecklist)) {
            return false;
        }
        return id != null && id.equals(((ProcessAuditChecklist) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProcessAuditChecklist{" +
            "id=" + getId() +
            ", auditQuestion='" + getAuditQuestion() + "'" +
            ", compliant='" + isCompliant() + "'" +
            ", ofi='" + isOfi() + "'" +
            ", minorNC='" + isMinorNC() + "'" +
            ", majorNC='" + isMajorNC() + "'" +
            ", auditAnswer='" + getAuditAnswer() + "'" +
            ", opportunitiesForImprovement='" + getOpportunitiesForImprovement() + "'" +
            ", nonConformanceId=" + getNonConformanceId() +
            "}";
    }
}
