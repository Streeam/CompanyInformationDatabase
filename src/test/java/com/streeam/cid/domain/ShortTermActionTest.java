package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ShortTermActionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ShortTermAction.class);
        ShortTermAction shortTermAction1 = new ShortTermAction();
        shortTermAction1.setId(1L);
        ShortTermAction shortTermAction2 = new ShortTermAction();
        shortTermAction2.setId(shortTermAction1.getId());
        assertThat(shortTermAction1).isEqualTo(shortTermAction2);
        shortTermAction2.setId(2L);
        assertThat(shortTermAction1).isNotEqualTo(shortTermAction2);
        shortTermAction1.setId(null);
        assertThat(shortTermAction1).isNotEqualTo(shortTermAction2);
    }
}
