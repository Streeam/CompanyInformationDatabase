package com.streeam.cid.service.dto;
import lombok.Data;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.streeam.cid.domain.Version} entity.
 */
@Data
public class VersionDTO implements Serializable {

    private Long id;

    @NotNull
    private String versionNumber;

    @NotNull
    private String versionStatus;

    private String issueNumber;


    private Long productId;

    private Long amendmentId;

    private Long prototypeId;

    private Long routingId;


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VersionDTO versionDTO = (VersionDTO) o;
        if (versionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), versionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VersionDTO{" +
            "id=" + getId() +
            ", versionNumber='" + getVersionNumber() + "'" +
            ", versionStatus='" + getVersionStatus() + "'" +
            ", issueNumber='" + getIssueNumber() + "'" +
            ", product=" + getProductId() +
            ", amendment=" + getAmendmentId() +
            ", prototype=" + getPrototypeId() +
            ", routing=" + getRoutingId() +
            "}";
    }
}
