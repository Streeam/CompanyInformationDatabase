package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Version.
 */
@Entity
@Table(name = "version")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Version implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "version_number", nullable = false)
    private String versionNumber;

    @NotNull
    @Column(name = "version_status", nullable = false)
    private String versionStatus;

    @Column(name = "issue_number")
    private String issueNumber;

    @ManyToOne
    @JsonIgnoreProperties("versions")
    private Product product;

    @OneToOne
    @JoinColumn(unique = true)
    private Amendment amendment;

    @OneToOne
    @JoinColumn(unique = true)
    private Prototype prototype;

    @ManyToOne
    @JsonIgnoreProperties("versions")
    private Routing routing;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersionNumber() {
        return versionNumber;
    }

    public Version versionNumber(String versionNumber) {
        this.versionNumber = versionNumber;
        return this;
    }

    public void setVersionNumber(String versionNumber) {
        this.versionNumber = versionNumber;
    }

    public String getVersionStatus() {
        return versionStatus;
    }

    public Version versionStatus(String versionStatus) {
        this.versionStatus = versionStatus;
        return this;
    }

    public void setVersionStatus(String versionStatus) {
        this.versionStatus = versionStatus;
    }

    public String getIssueNumber() {
        return issueNumber;
    }

    public Version issueNumber(String issueNumber) {
        this.issueNumber = issueNumber;
        return this;
    }

    public void setIssueNumber(String issueNumber) {
        this.issueNumber = issueNumber;
    }

    public Product getProduct() {
        return product;
    }

    public Version product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Amendment getAmendment() {
        return amendment;
    }

    public Version amendment(Amendment amendment) {
        this.amendment = amendment;
        return this;
    }

    public void setAmendment(Amendment amendment) {
        this.amendment = amendment;
    }

    public Prototype getPrototype() {
        return prototype;
    }

    public Version prototype(Prototype prototype) {
        this.prototype = prototype;
        return this;
    }

    public void setPrototype(Prototype prototype) {
        this.prototype = prototype;
    }

    public Routing getRouting() {
        return routing;
    }

    public Version routing(Routing routing) {
        this.routing = routing;
        return this;
    }

    public void setRouting(Routing routing) {
        this.routing = routing;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Version)) {
            return false;
        }
        return id != null && id.equals(((Version) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Version{" +
            "id=" + getId() +
            ", versionNumber='" + getVersionNumber() + "'" +
            ", versionStatus='" + getVersionStatus() + "'" +
            ", issueNumber='" + getIssueNumber() + "'" +
            "}";
    }
}
