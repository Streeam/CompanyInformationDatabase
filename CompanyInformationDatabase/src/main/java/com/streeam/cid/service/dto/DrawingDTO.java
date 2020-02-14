package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Drawing} entity.
 */
public class DrawingDTO implements Serializable {

    private Long id;

    @NotNull
    private String drawingNumber;

    @NotNull
    private String drawingIssue;

    @NotNull
    private String urlPath;


    private Long productId;

    private Long amendmentId;

    private Long nonConformanceDetailsId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDrawingNumber() {
        return drawingNumber;
    }

    public void setDrawingNumber(String drawingNumber) {
        this.drawingNumber = drawingNumber;
    }

    public String getDrawingIssue() {
        return drawingIssue;
    }

    public void setDrawingIssue(String drawingIssue) {
        this.drawingIssue = drawingIssue;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
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

    public Long getNonConformanceDetailsId() {
        return nonConformanceDetailsId;
    }

    public void setNonConformanceDetailsId(Long nonConformanceDetailsId) {
        this.nonConformanceDetailsId = nonConformanceDetailsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DrawingDTO drawingDTO = (DrawingDTO) o;
        if (drawingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), drawingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DrawingDTO{" +
            "id=" + getId() +
            ", drawingNumber='" + getDrawingNumber() + "'" +
            ", drawingIssue='" + getDrawingIssue() + "'" +
            ", urlPath='" + getUrlPath() + "'" +
            ", product=" + getProductId() +
            ", amendment=" + getAmendmentId() +
            ", nonConformanceDetails=" + getNonConformanceDetailsId() +
            "}";
    }
}
