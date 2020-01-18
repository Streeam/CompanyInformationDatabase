package com.streeam.cid.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.streeam.cid.domain.enumeration.AmendmentStatus;
import com.streeam.cid.domain.enumeration.Priority;

/**
 * A DTO for the {@link com.streeam.cid.domain.Amendment} entity.
 */
public class AmendmentDTO implements Serializable {

    private Long id;

    @NotNull
    private AmendmentStatus status;

    private LocalDate deadline;

    @NotNull
    private Priority priority;

    private LocalDate proposedDate;

    private String currentCondition;

    @NotNull
    private String proposeAmendment;

    @NotNull
    private String reasonForChange;

    private String rejectionReason;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    private Integer progress;


    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AmendmentStatus getStatus() {
        return status;
    }

    public void setStatus(AmendmentStatus status) {
        this.status = status;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getProposedDate() {
        return proposedDate;
    }

    public void setProposedDate(LocalDate proposedDate) {
        this.proposedDate = proposedDate;
    }

    public String getCurrentCondition() {
        return currentCondition;
    }

    public void setCurrentCondition(String currentCondition) {
        this.currentCondition = currentCondition;
    }

    public String getProposeAmendment() {
        return proposeAmendment;
    }

    public void setProposeAmendment(String proposeAmendment) {
        this.proposeAmendment = proposeAmendment;
    }

    public String getReasonForChange() {
        return reasonForChange;
    }

    public void setReasonForChange(String reasonForChange) {
        this.reasonForChange = reasonForChange;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AmendmentDTO amendmentDTO = (AmendmentDTO) o;
        if (amendmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), amendmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AmendmentDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", deadline='" + getDeadline() + "'" +
            ", priority='" + getPriority() + "'" +
            ", proposedDate='" + getProposedDate() + "'" +
            ", currentCondition='" + getCurrentCondition() + "'" +
            ", proposeAmendment='" + getProposeAmendment() + "'" +
            ", reasonForChange='" + getReasonForChange() + "'" +
            ", rejectionReason='" + getRejectionReason() + "'" +
            ", progress=" + getProgress() +
            ", employee=" + getEmployeeId() +
            "}";
    }
}
