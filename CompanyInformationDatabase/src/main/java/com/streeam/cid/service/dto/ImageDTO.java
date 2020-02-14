package com.streeam.cid.service.dto;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Image} entity.
 */
public class ImageDTO implements Serializable {

    private Long id;

    @NotNull
    private String urlPath;

    @NotNull
    private String name;

    private Instant lastModifiedDate;

    private Long size;

    @NotNull
    private String type;

    private Long taskId;

    private Long nonconformanceDetailsId;

    private Long progressTrackId;

    private Long productId;

    private Long amendmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getNonconformanceDetailsId() {
        return nonconformanceDetailsId;
    }

    public void setNonconformanceDetailsId(Long nonconformanceDetailsId) {
        this.nonconformanceDetailsId = nonconformanceDetailsId;
    }

    public Long getProgressTrackId() {
        return progressTrackId;
    }

    public void setProgressTrackId(Long progressTrackId) {
        this.progressTrackId = progressTrackId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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

        ImageDTO imageDTO = (ImageDTO) o;
        if (imageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImageDTO{" +
            "id=" + getId() +
            ", urlPath='" + getUrlPath() + "'" +
            ", name='" + getName() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", size=" + getSize() +
            ", type='" + getType() + "'" +
            ", taskId=" + getTaskId() +
            ", nonconformanceDetailsId=" + getNonconformanceDetailsId() +
            ", progressTrackId=" + getProgressTrackId() +
            ", product=" + getProductId() +
            ", amendment=" + getAmendmentId() +
            "}";
    }
}
