package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ActionToBeTakenTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ActionToBeTaken.class);
        ActionToBeTaken actionToBeTaken1 = new ActionToBeTaken();
        actionToBeTaken1.setId(1L);
        ActionToBeTaken actionToBeTaken2 = new ActionToBeTaken();
        actionToBeTaken2.setId(actionToBeTaken1.getId());
        assertThat(actionToBeTaken1).isEqualTo(actionToBeTaken2);
        actionToBeTaken2.setId(2L);
        assertThat(actionToBeTaken1).isNotEqualTo(actionToBeTaken2);
        actionToBeTaken1.setId(null);
        assertThat(actionToBeTaken1).isNotEqualTo(actionToBeTaken2);
    }
}
