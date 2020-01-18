package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ClientNonConformanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientNonConformance.class);
        ClientNonConformance clientNonConformance1 = new ClientNonConformance();
        clientNonConformance1.setId(1L);
        ClientNonConformance clientNonConformance2 = new ClientNonConformance();
        clientNonConformance2.setId(clientNonConformance1.getId());
        assertThat(clientNonConformance1).isEqualTo(clientNonConformance2);
        clientNonConformance2.setId(2L);
        assertThat(clientNonConformance1).isNotEqualTo(clientNonConformance2);
        clientNonConformance1.setId(null);
        assertThat(clientNonConformance1).isNotEqualTo(clientNonConformance2);
    }
}
