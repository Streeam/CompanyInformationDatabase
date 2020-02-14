package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class InternalNonConformanceDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InternalNonConformanceDTO.class);
        InternalNonConformanceDTO internalNonConformanceDTO1 = new InternalNonConformanceDTO();
        internalNonConformanceDTO1.setId(1L);
        InternalNonConformanceDTO internalNonConformanceDTO2 = new InternalNonConformanceDTO();
        assertThat(internalNonConformanceDTO1).isNotEqualTo(internalNonConformanceDTO2);
        internalNonConformanceDTO2.setId(internalNonConformanceDTO1.getId());
        assertThat(internalNonConformanceDTO1).isEqualTo(internalNonConformanceDTO2);
        internalNonConformanceDTO2.setId(2L);
        assertThat(internalNonConformanceDTO1).isNotEqualTo(internalNonConformanceDTO2);
        internalNonConformanceDTO1.setId(null);
        assertThat(internalNonConformanceDTO1).isNotEqualTo(internalNonConformanceDTO2);
    }
}
