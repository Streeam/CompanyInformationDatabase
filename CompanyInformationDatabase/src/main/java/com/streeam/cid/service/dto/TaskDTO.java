package com.streeam.cid.service.dto;
import com.streeam.cid.domain.enumeration.Priority;
import com.streeam.cid.domain.enumeration.Status;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Task} entity.
 */
public class TaskDTO implements Serializable {

    private Long id;

    private String taskDescription;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    private Integer progress;

    @NotNull
    private Status status;

    @NotNull
    private Priority priority;

    private Long nonconformanceId;

    @NotNull
    private Long employeeId;


    private Long amendmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Long getNonconformanceId() {
        return nonconformanceId;
    }

    public void setNonconformanceId(Long nonconformanceId) {
        this.nonconformanceId = nonconformanceId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getAmendmentId() {
        return amendmentId;
    }

    public void setAmendmentId(Long amendmentId) {
        this.amendmentId = amendmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if (taskDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taskDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
            "id=" + getId() +
            ", taskDescription='" + getTaskDescription() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", progress=" + getProgress() +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", nonconformanceId=" + getNonconformanceId() +
            ", employeeId=" + getEmployeeId() +
            ", amendment=" + getAmendmentId() +
            "}";
    }
}
