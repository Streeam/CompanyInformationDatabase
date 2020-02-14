package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Drawing.
 */
@Entity
@Table(name = "drawing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Drawing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "drawing_number", nullable = false, unique = true)
    private String drawingNumber;

    @NotNull
    @Column(name = "drawing_issue", nullable = false)
    private String drawingIssue;

    @NotNull
    @Column(name = "url_path", nullable = false)
    private String urlPath;

    @ManyToOne
    @JsonIgnoreProperties("drawings")
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties("drawings")
    private Amendment amendment;

    @ManyToOne
    @JsonIgnoreProperties("drawings")
    private NonConformanceDetails nonConformanceDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDrawingNumber() {
        return drawingNumber;
    }

    public Drawing drawingNumber(String drawingNumber) {
        this.drawingNumber = drawingNumber;
        return this;
    }

    public void setDrawingNumber(String drawingNumber) {
        this.drawingNumber = drawingNumber;
    }

    public String getDrawingIssue() {
        return drawingIssue;
    }

    public Drawing drawingIssue(String drawingIssue) {
        this.drawingIssue = drawingIssue;
        return this;
    }

    public void setDrawingIssue(String drawingIssue) {
        this.drawingIssue = drawingIssue;
    }

    public String getUrlPath() {
        return urlPath;
    }

    public Drawing urlPath(String urlPath) {
        this.urlPath = urlPath;
        return this;
    }

    public void setUrlPath(String urlPath) {
        this.urlPath = urlPath;
    }

    public Product getProduct() {
        return product;
    }

    public Drawing product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Amendment getAmendment() {
        return amendment;
    }

    public Drawing amendment(Amendment amendment) {
        this.amendment = amendment;
        return this;
    }

    public void setAmendment(Amendment amendment) {
        this.amendment = amendment;
    }

    public NonConformanceDetails getNonConformanceDetails() {
        return nonConformanceDetails;
    }

    public Drawing nonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
        return this;
    }

    public void setNonConformanceDetails(NonConformanceDetails nonConformanceDetails) {
        this.nonConformanceDetails = nonConformanceDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Drawing)) {
            return false;
        }
        return id != null && id.equals(((Drawing) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Drawing{" +
            "id=" + getId() +
            ", drawingNumber='" + getDrawingNumber() + "'" +
            ", drawingIssue='" + getDrawingIssue() + "'" +
            ", urlPath='" + getUrlPath() + "'" +
            "}";
    }
}
