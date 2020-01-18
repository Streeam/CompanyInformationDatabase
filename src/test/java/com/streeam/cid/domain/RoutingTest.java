package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class RoutingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Routing.class);
        Routing routing1 = new Routing();
        routing1.setId(1L);
        Routing routing2 = new Routing();
        routing2.setId(routing1.getId());
        assertThat(routing1).isEqualTo(routing2);
        routing2.setId(2L);
        assertThat(routing1).isNotEqualTo(routing2);
        routing1.setId(null);
        assertThat(routing1).isNotEqualTo(routing2);
    }
}
