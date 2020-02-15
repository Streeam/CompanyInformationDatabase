package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.streeam.cid.domain.enumeration.Status;

import com.streeam.cid.domain.enumeration.Priority;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "task_description")
    private String taskDescription;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "progress", nullable = false)
    private Integer progress;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @Column(name = "nonconformance_id")
    private Long nonconformanceId;

    @NotNull
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private Amendment amendment;

    @OneToMany(mappedBy = "task")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProgressTrack> progressTracks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public Task taskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
        return this;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Task startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Task endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getProgress() {
        return progress;
    }

    public Task progress(Integer progress) {
        this.progress = progress;
        return this;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Status getStatus() {
        return status;
    }

    public Task status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public Task priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Long getNonconformanceId() {
        return nonconformanceId;
    }

    public Task nonconformanceId(Long nonconformanceId) {
        this.nonconformanceId = nonconformanceId;
        return this;
    }

    public void setNonconformanceId(Long nonconformanceId) {
        this.nonconformanceId = nonconformanceId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public Task employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Amendment getAmendment() {
        return amendment;
    }

    public Task amendment(Amendment amendment) {
        this.amendment = amendment;
        return this;
    }

    public void setAmendment(Amendment amendment) {
        this.amendment = amendment;
    }

    public Set<ProgressTrack> getProgressTracks() {
        return progressTracks;
    }

    public Task progressTracks(Set<ProgressTrack> progressTracks) {
        this.progressTracks = progressTracks;
        return this;
    }

    public Task addProgressTrack(ProgressTrack progressTrack) {
        this.progressTracks.add(progressTrack);
        progressTrack.setTask(this);
        return this;
    }

    public Task removeProgressTrack(ProgressTrack progressTrack) {
        this.progressTracks.remove(progressTrack);
        progressTrack.setTask(null);
        return this;
    }

    public void setProgressTracks(Set<ProgressTrack> progressTracks) {
        this.progressTracks = progressTracks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", taskDescription='" + getTaskDescription() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", progress=" + getProgress() +
            ", status='" + getStatus() + "'" +
            ", priority='" + getPriority() + "'" +
            ", nonconformanceId=" + getNonconformanceId() +
            ", employeeId=" + getEmployeeId() +
            "}";
    }
}
