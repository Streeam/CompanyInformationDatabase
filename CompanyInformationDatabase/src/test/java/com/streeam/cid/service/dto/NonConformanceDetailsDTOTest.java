package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class NonConformanceDetailsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NonConformanceDetailsDTO.class);
        NonConformanceDetailsDTO nonConformanceDetailsDTO1 = new NonConformanceDetailsDTO();
        nonConformanceDetailsDTO1.setId(1L);
        NonConformanceDetailsDTO nonConformanceDetailsDTO2 = new NonConformanceDetailsDTO();
        assertThat(nonConformanceDetailsDTO1).isNotEqualTo(nonConformanceDetailsDTO2);
        nonConformanceDetailsDTO2.setId(nonConformanceDetailsDTO1.getId());
        assertThat(nonConformanceDetailsDTO1).isEqualTo(nonConformanceDetailsDTO2);
        nonConformanceDetailsDTO2.setId(2L);
        assertThat(nonConformanceDetailsDTO1).isNotEqualTo(nonConformanceDetailsDTO2);
        nonConformanceDetailsDTO1.setId(null);
        assertThat(nonConformanceDetailsDTO1).isNotEqualTo(nonConformanceDetailsDTO2);
    }
}
