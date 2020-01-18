package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Image.
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Image implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "url_path", nullable = false)
    private String urlPath;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @Column(name = "size")
    private Long size;

    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "task_id")
    private Long taskId;

    @Column(name = "nonconformance_details_id")
    private Long nonconformanceDetailsId;

    @Column(name = "progress_track_id")
    private Long progressTrackId;

    @ManyToOne
    @JsonIgnoreProperties("images")
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("images")
    private Amendment amendment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public Image urlPath(String urlPath) {
        this.urlPath = urlPath;
        return this;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
    }

    public String getName() {
        return name;
    }

    public Image name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public Image lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Long getSize() {
        return size;
    }

    public Image size(Long size) {
        this.size = size;
        return this;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getType() {
        return type;
    }

    public Image type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getTaskId() {
        return taskId;
    }

    public Image taskId(Long taskId) {
        this.taskId = taskId;
        return this;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getNonconformanceDetailsId() {
        return nonconformanceDetailsId;
    }

    public Image nonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
        return this;
    }

    public void setNonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
    }

    public Long getProgressTrackId() {
        return progressTrackId;
    }

    public Image progressTrackId(Long progressTrackId) {
        this.progressTrackId = progressTrackId;
        return this;
    }

    public void setProgressTrackId(Long progressTrackId) {
        this.progressTrackId = progressTrackId;
    }

    public Product getProduct() {
        return product;
    }

    public Image product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Amendment getAmendment() {
        return amendment;
    }

    public Image amendment(Amendment amendment) {
        this.amendment = amendment;
        return this;
    }

    public void setAmendment(Amendment amendment) {
        this.amendment = amendment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Image)) {
            return false;
        }
        return id != null && id.equals(((Image) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + getId() +
            ", urlPath='" + getUrlPath() + "'" +
            ", name='" + getName() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", size=" + getSize() +
            ", type='" + getType() + "'" +
            ", taskId=" + getTaskId() +
            ", nonconformanceDetailsId=" + getNonconformanceDetailsId() +
            ", progressTrackId=" + getProgressTrackId() +
            "}";
    }
}
