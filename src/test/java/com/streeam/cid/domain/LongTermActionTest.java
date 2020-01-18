package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class LongTermActionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LongTermAction.class);
        LongTermAction longTermAction1 = new LongTermAction();
        longTermAction1.setId(1L);
        LongTermAction longTermAction2 = new LongTermAction();
        longTermAction2.setId(longTermAction1.getId());
        assertThat(longTermAction1).isEqualTo(longTermAction2);
        longTermAction2.setId(2L);
        assertThat(longTermAction1).isNotEqualTo(longTermAction2);
        longTermAction1.setId(null);
        assertThat(longTermAction1).isNotEqualTo(longTermAction2);
    }
}
