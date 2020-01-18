package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class RoutingDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoutingDTO.class);
        RoutingDTO routingDTO1 = new RoutingDTO();
        routingDTO1.setId(1L);
        RoutingDTO routingDTO2 = new RoutingDTO();
        assertThat(routingDTO1).isNotEqualTo(routingDTO2);
        routingDTO2.setId(routingDTO1.getId());
        assertThat(routingDTO1).isEqualTo(routingDTO2);
        routingDTO2.setId(2L);
        assertThat(routingDTO1).isNotEqualTo(routingDTO2);
        routingDTO1.setId(null);
        assertThat(routingDTO1).isNotEqualTo(routingDTO2);
    }
}
