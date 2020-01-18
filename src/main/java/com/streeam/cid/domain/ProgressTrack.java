package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A ProgressTrack.
 */
@Entity
@Table(name = "progress_track")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProgressTrack implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "progress_description")
    private String progressDescription;

    @Column(name = "complete")
    private Boolean complete;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("progressTracks")
    private Task task;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgressDescription() {
        return progressDescription;
    }

    public ProgressTrack progressDescription(String progressDescription) {
        this.progressDescription = progressDescription;
        return this;
    }

    public void setProgressDescription(String progressDescription) {
        this.progressDescription = progressDescription;
    }

    public Boolean isComplete() {
        return complete;
    }

    public ProgressTrack complete(Boolean complete) {
        this.complete = complete;
        return this;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }

    public Instant getDate() {
        return date;
    }

    public ProgressTrack date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Task getTask() {
        return task;
    }

    public ProgressTrack task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProgressTrack)) {
            return false;
        }
        return id != null && id.equals(((ProgressTrack) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProgressTrack{" +
            "id=" + getId() +
            ", progressDescription='" + getProgressDescription() + "'" +
            ", complete='" + isComplete() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
