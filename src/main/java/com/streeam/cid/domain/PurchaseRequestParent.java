package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PurchaseRequestParent.
 */
@Entity
@Table(name = "purchase_request_parent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PurchaseRequestParent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "pdf_url_path", nullable = false)
    private String pdfURLPath;

    @ManyToOne
    @JsonIgnoreProperties("purchaseRequestParents")
    private Employee employee;

    @OneToMany(mappedBy = "purchaseRequestParent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PurchaseRequestChild> purchaseRequestChildren = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPdfURLPath() {
        return pdfURLPath;
    }

    public PurchaseRequestParent pdfURLPath(String pdfURLPath) {
        this.pdfURLPath = pdfURLPath;
        return this;
    }

    public void setPdfURLPath(String pdfURLPath) {
        this.pdfURLPath = pdfURLPath;
    }

    public Employee getEmployee() {
        return employee;
    }

    public PurchaseRequestParent employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<PurchaseRequestChild> getPurchaseRequestChildren() {
        return purchaseRequestChildren;
    }

    public PurchaseRequestParent purchaseRequestChildren(Set<PurchaseRequestChild> purchaseRequestChildren) {
        this.purchaseRequestChildren = purchaseRequestChildren;
        return this;
    }

    public PurchaseRequestParent addPurchaseRequestChild(PurchaseRequestChild purchaseRequestChild) {
        this.purchaseRequestChildren.add(purchaseRequestChild);
        purchaseRequestChild.setPurchaseRequestParent(this);
        return this;
    }

    public PurchaseRequestParent removePurchaseRequestChild(PurchaseRequestChild purchaseRequestChild) {
        this.purchaseRequestChildren.remove(purchaseRequestChild);
        purchaseRequestChild.setPurchaseRequestParent(null);
        return this;
    }

    public void setPurchaseRequestChildren(Set<PurchaseRequestChild> purchaseRequestChildren) {
        this.purchaseRequestChildren = purchaseRequestChildren;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseRequestParent)) {
            return false;
        }
        return id != null && id.equals(((PurchaseRequestParent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PurchaseRequestParent{" +
            "id=" + getId() +
            ", pdfURLPath='" + getPdfURLPath() + "'" +
            "}";
    }
}
