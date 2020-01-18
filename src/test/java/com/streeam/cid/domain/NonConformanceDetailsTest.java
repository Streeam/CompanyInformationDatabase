package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class NonConformanceDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NonConformanceDetails.class);
        NonConformanceDetails nonConformanceDetails1 = new NonConformanceDetails();
        nonConformanceDetails1.setId(1L);
        NonConformanceDetails nonConformanceDetails2 = new NonConformanceDetails();
        nonConformanceDetails2.setId(nonConformanceDetails1.getId());
        assertThat(nonConformanceDetails1).isEqualTo(nonConformanceDetails2);
        nonConformanceDetails2.setId(2L);
        assertThat(nonConformanceDetails1).isNotEqualTo(nonConformanceDetails2);
        nonConformanceDetails1.setId(null);
        assertThat(nonConformanceDetails1).isNotEqualTo(nonConformanceDetails2);
    }
}
