package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ClientNonConformanceDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientNonConformanceDTO.class);
        ClientNonConformanceDTO clientNonConformanceDTO1 = new ClientNonConformanceDTO();
        clientNonConformanceDTO1.setId(1L);
        ClientNonConformanceDTO clientNonConformanceDTO2 = new ClientNonConformanceDTO();
        assertThat(clientNonConformanceDTO1).isNotEqualTo(clientNonConformanceDTO2);
        clientNonConformanceDTO2.setId(clientNonConformanceDTO1.getId());
        assertThat(clientNonConformanceDTO1).isEqualTo(clientNonConformanceDTO2);
        clientNonConformanceDTO2.setId(2L);
        assertThat(clientNonConformanceDTO1).isNotEqualTo(clientNonConformanceDTO2);
        clientNonConformanceDTO1.setId(null);
        assertThat(clientNonConformanceDTO1).isNotEqualTo(clientNonConformanceDTO2);
    }
}
