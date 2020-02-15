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

import com.streeam.cid.domain.enumeration.AmendmentStatus;

import com.streeam.cid.domain.enumeration.Priority;

/**
 * A Amendment.
 */
@Entity
@Table(name = "amendment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Amendment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private AmendmentStatus status;

    @Column(name = "deadline")
    private LocalDate deadline;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @Column(name = "proposed_date")
    private LocalDate proposedDate;

    @Column(name = "current_condition")
    private String currentCondition;

    @NotNull
    @Column(name = "propose_amendment", nullable = false)
    private String proposeAmendment;

    @NotNull
    @Column(name = "reason_for_change", nullable = false)
    private String reasonForChange;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "progress", nullable = false)
    private Integer progress;

    @ManyToOne
    @JsonIgnoreProperties("amendments")
    private Employee employee;

    @OneToMany(mappedBy = "amendment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @OneToMany(mappedBy = "amendment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "amendment")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Drawing> drawings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AmendmentStatus getStatus() {
        return status;
    }

    public Amendment status(AmendmentStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(AmendmentStatus status) {
        this.status = status;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public Amendment deadline(LocalDate deadline) {
        this.deadline = deadline;
        return this;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Priority getPriority() {
        return priority;
    }

    public Amendment priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getProposedDate() {
        return proposedDate;
    }

    public Amendment proposedDate(LocalDate proposedDate) {
        this.proposedDate = proposedDate;
        return this;
    }

    public void setProposedDate(LocalDate proposedDate) {
        this.proposedDate = proposedDate;
    }

    public String getCurrentCondition() {
        return currentCondition;
    }

    public Amendment currentCondition(String currentCondition) {
        this.currentCondition = currentCondition;
        return this;
    }

    public void setCurrentCondition(String currentCondition) {
        this.currentCondition = currentCondition;
    }

    public String getProposeAmendment() {
        return proposeAmendment;
    }

    public Amendment proposeAmendment(String proposeAmendment) {
        this.proposeAmendment = proposeAmendment;
        return this;
    }

    public void setProposeAmendment(String proposeAmendment) {
        this.proposeAmendment = proposeAmendment;
    }

    public String getReasonForChange() {
        return reasonForChange;
    }

    public Amendment reasonForChange(String reasonForChange) {
        this.reasonForChange = reasonForChange;
        return this;
    }

    public void setReasonForChange(String reasonForChange) {
        this.reasonForChange = reasonForChange;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public Amendment rejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
        return this;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public Integer getProgress() {
        return progress;
    }

    public Amendment progress(Integer progress) {
        this.progress = progress;
        return this;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Amendment employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Amendment tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Amendment addTasks(Task task) {
        this.tasks.add(task);
        task.setAmendment(this);
        return this;
    }

    public Amendment removeTasks(Task task) {
        this.tasks.remove(task);
        task.setAmendment(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Amendment images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Amendment addImage(Image image) {
        this.images.add(image);
        image.setAmendment(this);
        return this;
    }

    public Amendment removeImage(Image image) {
        this.images.remove(image);
        image.setAmendment(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Drawing> getDrawings() {
        return drawings;
    }

    public Amendment drawings(Set<Drawing> drawings) {
        this.drawings = drawings;
        return this;
    }

    public Amendment addDrawing(Drawing drawing) {
        this.drawings.add(drawing);
        drawing.setAmendment(this);
        return this;
    }

    public Amendment removeDrawing(Drawing drawing) {
        this.drawings.remove(drawing);
        drawing.setAmendment(null);
        return this;
    }

    public void setDrawings(Set<Drawing> drawings) {
        this.drawings = drawings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Amendment)) {
            return false;
        }
        return id != null && id.equals(((Amendment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Amendment{" +
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
            "}";
    }
}
