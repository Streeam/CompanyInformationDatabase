package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Bom} entity.
 */
public class BomDTO implements Serializable {

    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    private Double quantity;

    @NotNull
    @Min(value = 0)
    private Integer sequenceNumber;

    private String partNumber;

    private String childPartNumber;

    private String uniqueIdentifier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Integer getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(Integer sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public String getChildPartNumber() {
        return childPartNumber;
    }

    public void setChildPartNumber(String childPartNumber) {
        this.childPartNumber = childPartNumber;
    }

    public String getUniqueIdentifier() {
        return uniqueIdentifier;
    }

    public void setUniqueIdentifier(String uniqueIdentifier) {
        this.uniqueIdentifier = uniqueIdentifier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BomDTO bomDTO = (BomDTO) o;
        if (bomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BomDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", sequenceNumber=" + getSequenceNumber() +
            ", partNumber='" + getPartNumber() + "'" +
            ", childPartNumber='" + getChildPartNumber() + "'" +
            ", uniqueIdentifier='" + getUniqueIdentifier() + "'" +
            "}";
    }
}
