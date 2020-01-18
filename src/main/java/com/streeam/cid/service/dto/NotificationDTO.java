package com.streeam.cid.service.dto;
import com.streeam.cid.domain.enumeration.NotificationType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Notification} entity.
 */
public class NotificationDTO implements Serializable {

    private Long id;

    private String comment;

    @NotNull
    private Boolean read;

    @NotNull
    private NotificationType format;

    private String referencedEmployee;

    private Instant sentDate;

    @NotNull
    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean isRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public NotificationType getFormat() {
        return format;
    }

    public void setFormat(NotificationType format) {
        this.format = format;
    }

    public String getReferencedEmployee() {
        return referencedEmployee;
    }

    public void setReferencedEmployee(String referencedEmployee) {
        this.referencedEmployee = referencedEmployee;
    }

    public Instant getSentDate() {
        return sentDate;
    }

    public void setSentDate(Instant sentDate) {
        this.sentDate = sentDate;
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

        NotificationDTO notificationDTO = (NotificationDTO) o;
        if (notificationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notificationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NotificationDTO{" +
            "id=" + getId() +
            ", comment='" + getComment() + "'" +
            ", read='" + isRead() + "'" +
            ", format='" + getFormat() + "'" +
            ", referencedEmployee='" + getReferencedEmployee() + "'" +
            ", sentDate='" + getSentDate() + "'" +
            ", employeeId=" + getEmployeeId() +
            "}";
    }
}
