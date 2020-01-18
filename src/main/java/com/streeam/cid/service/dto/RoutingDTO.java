package com.streeam.cid.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Routing} entity.
 */
public class RoutingDTO implements Serializable {

    private Long id;

    @NotNull
    private String resourceName;

    @NotNull
    private String resourceType;

    @NotNull
    private Integer unitRunTime;

    private String partNumber;

    @Min(value = 0)
    private Integer layoutTime;

    private String uniqueIdentifier;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public Integer getUnitRunTime() {
        return unitRunTime;
    }

    public void setUnitRunTime(Integer unitRunTime) {
        this.unitRunTime = unitRunTime;
    }

    public String getPartNumber() {
        return partNumber;
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
    }

    public Integer getLayoutTime() {
        return layoutTime;
    }

    public void setLayoutTime(Integer layoutTime) {
        this.layoutTime = layoutTime;
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

        RoutingDTO routingDTO = (RoutingDTO) o;
        if (routingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoutingDTO{" +
            "id=" + getId() +
            ", resourceName='" + getResourceName() + "'" +
            ", resourceType='" + getResourceType() + "'" +
            ", unitRunTime=" + getUnitRunTime() +
            ", partNumber='" + getPartNumber() + "'" +
            ", layoutTime=" + getLayoutTime() +
            ", uniqueIdentifier='" + getUniqueIdentifier() + "'" +
            "}";
    }
}
