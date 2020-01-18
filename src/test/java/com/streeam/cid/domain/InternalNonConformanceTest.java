package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class InternalNonConformanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InternalNonConformance.class);
        InternalNonConformance internalNonConformance1 = new InternalNonConformance();
        internalNonConformance1.setId(1L);
        InternalNonConformance internalNonConformance2 = new InternalNonConformance();
        internalNonConformance2.setId(internalNonConformance1.getId());
        assertThat(internalNonConformance1).isEqualTo(internalNonConformance2);
        internalNonConformance2.setId(2L);
        assertThat(internalNonConformance1).isNotEqualTo(internalNonConformance2);
        internalNonConformance1.setId(null);
        assertThat(internalNonConformance1).isNotEqualTo(internalNonConformance2);
    }
}
