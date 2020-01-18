package com.streeam.cid.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Bom.
 */
@Entity
@Table(name = "bom")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "quantity", nullable = false)
    private Double quantity;

    @NotNull
    @Min(value = 0)
    @Column(name = "sequence_number", nullable = false)
    private Integer sequenceNumber;

    @Column(name = "part_number")
    private String partNumber;

    @Column(name = "child_part_number")
    private String childPartNumber;

    @Column(name = "unique_identifier")
    private String uniqueIdentifier;

    @ManyToMany(mappedBy = "boms")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public Bom quantity(Double quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Integer getSequenceNumber() {
        return sequenceNumber;
    }

    public Bom sequenceNumber(Integer sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
        return this;
    }

    public void setSequenceNumber(Integer sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public Bom partNumber(String partNumber) {
        this.partNumber = partNumber;
        return this;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getChildPartNumber() {
        return childPartNumber;
    }

    public Bom childPartNumber(String childPartNumber) {
        this.childPartNumber = childPartNumber;
        return this;
    }

    public void setChildPartNumber(String childPartNumber) {
        this.childPartNumber = childPartNumber;
    }

    public String getUniqueIdentifier() {
        return uniqueIdentifier;
    }

    public Bom uniqueIdentifier(String uniqueIdentifier) {
        this.uniqueIdentifier = uniqueIdentifier;
        return this;
    }

    public void setUniqueIdentifier(String uniqueIdentifier) {
        this.uniqueIdentifier = uniqueIdentifier;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Bom products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Bom addProduct(Product product) {
        this.products.add(product);
        product.getBoms().add(this);
        return this;
    }

    public Bom removeProduct(Product product) {
        this.products.remove(product);
        product.getBoms().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bom)) {
            return false;
        }
        return id != null && id.equals(((Bom) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Bom{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", sequenceNumber=" + getSequenceNumber() +
            ", partNumber='" + getPartNumber() + "'" +
            ", childPartNumber='" + getChildPartNumber() + "'" +
            ", uniqueIdentifier='" + getUniqueIdentifier() + "'" +
            "}";
    }
}
