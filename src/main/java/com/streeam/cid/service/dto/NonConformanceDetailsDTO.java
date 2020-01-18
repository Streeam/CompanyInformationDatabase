package com.streeam.cid.service.dto;

import com.streeam.cid.domain.*;
import com.streeam.cid.domain.enumeration.Nonconformance;
import com.streeam.cid.domain.enumeration.Priority;
import com.streeam.cid.domain.enumeration.Status;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.streeam.cid.domain.NonConformanceDetails} entity.
 */
@Data
public class NonConformanceDetailsDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate deadline;

    @NotNull
    private Status status;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    private Integer progress;

    @NotNull
    private Priority priority;

    private Nonconformance nonconformance;

    private Set<ProductDTO> products = new HashSet<>();

    private Set<RoutingDTO> routings = new HashSet<>();

    private Employee employee;

    private NonConformanceType nonConformanceType;

    private Instant currentDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NonConformanceDetailsDTO nonConformanceDetailsDTO = (NonConformanceDetailsDTO) o;
        if (nonConformanceDetailsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nonConformanceDetailsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
