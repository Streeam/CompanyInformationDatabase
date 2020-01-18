package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ExtraRoutingsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtraRoutings.class);
        ExtraRoutings extraRoutings1 = new ExtraRoutings();
        extraRoutings1.setId(1L);
        ExtraRoutings extraRoutings2 = new ExtraRoutings();
        extraRoutings2.setId(extraRoutings1.getId());
        assertThat(extraRoutings1).isEqualTo(extraRoutings2);
        extraRoutings2.setId(2L);
        assertThat(extraRoutings1).isNotEqualTo(extraRoutings2);
        extraRoutings1.setId(null);
        assertThat(extraRoutings1).isNotEqualTo(extraRoutings2);
    }
}
