package com.streeam.cid.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.streeam.cid.domain.ProgressTrack} entity.
 */
public class ProgressTrackDTO implements Serializable {

    private Long id;

    @Lob
    private String progressDescription;

    private Boolean complete;

    @NotNull
    private Instant date;


    private Long taskId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProgressDescription() {
        return progressDescription;
    }

    public void setProgressDescription(String progressDescription) {
        this.progressDescription = progressDescription;
    }

    public Boolean isComplete() {
        return complete;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProgressTrackDTO progressTrackDTO = (ProgressTrackDTO) o;
        if (progressTrackDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), progressTrackDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProgressTrackDTO{" +
            "id=" + getId() +
            ", progressDescription='" + getProgressDescription() + "'" +
            ", complete='" + isComplete() + "'" +
            ", date='" + getDate() + "'" +
            ", task=" + getTaskId() +
            "}";
    }
}
