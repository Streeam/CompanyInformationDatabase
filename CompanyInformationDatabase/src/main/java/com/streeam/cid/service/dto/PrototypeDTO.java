package com.streeam.cid.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.domain.enumeration.Priority;

/**
 * A DTO for the {@link com.streeam.cid.domain.Prototype} entity.
 */
public class PrototypeDTO implements Serializable {

    private Long id;

    @NotNull
    private Status status;

    private LocalDate deadline;

    @NotNull
    private Priority priority;

    private LocalDate proposedDate;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    private Integer progress;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
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

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PrototypeDTO prototypeDTO = (PrototypeDTO) o;
        if (prototypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prototypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrototypeDTO{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", deadline='" + getDeadline() + "'" +
            ", priority='" + getPriority() + "'" +
            ", proposedDate='" + getProposedDate() + "'" +
            ", progress=" + getProgress() +
            "}";
    }
}
