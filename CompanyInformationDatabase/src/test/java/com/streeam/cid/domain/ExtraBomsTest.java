package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ExtraBomsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExtraBoms.class);
        ExtraBoms extraBoms1 = new ExtraBoms();
        extraBoms1.setId(1L);
        ExtraBoms extraBoms2 = new ExtraBoms();
        extraBoms2.setId(extraBoms1.getId());
        assertThat(extraBoms1).isEqualTo(extraBoms2);
        extraBoms2.setId(2L);
        assertThat(extraBoms1).isNotEqualTo(extraBoms2);
        extraBoms1.setId(null);
        assertThat(extraBoms1).isNotEqualTo(extraBoms2);
    }
}
