package com.streeam.cid.domain;
import com.streeam.cid.domain.enumeration.NotificationType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment")
    private String comment;

    @NotNull
    @Column(name = "jhi_read", nullable = false)
    private Boolean read;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "format", nullable = false)
    private NotificationType format;

    @Column(name = "referenced_employee")
    private String referencedEmployee;

    @Column(name = "sent_date")
    private Instant sentDate;

    @NotNull
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public Notification comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean isRead() {
        return read;
    }

    public Notification read(Boolean read) {
        this.read = read;
        return this;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public NotificationType getFormat() {
        return format;
    }

    public Notification format(NotificationType format) {
        this.format = format;
        return this;
    }

    public void setFormat(NotificationType format) {
        this.format = format;
    }

    public String getReferencedEmployee() {
        return referencedEmployee;
    }

    public Notification referencedEmployee(String referencedEmployee) {
        this.referencedEmployee = referencedEmployee;
        return this;
    }

    public void setReferencedEmployee(String referencedEmployee) {
        this.referencedEmployee = referencedEmployee;
    }

    public Instant getSentDate() {
        return sentDate;
    }

    public Notification sentDate(Instant sentDate) {
        this.sentDate = sentDate;
        return this;
    }

    public void setSentDate(Instant sentDate) {
        this.sentDate = sentDate;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public Notification employeeId(Long employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Notification{" +
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
