package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class FishBoneTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FishBone.class);
        FishBone fishBone1 = new FishBone();
        fishBone1.setId(1L);
        FishBone fishBone2 = new FishBone();
        fishBone2.setId(fishBone1.getId());
        assertThat(fishBone1).isEqualTo(fishBone2);
        fishBone2.setId(2L);
        assertThat(fishBone1).isNotEqualTo(fishBone2);
        fishBone1.setId(null);
        assertThat(fishBone1).isNotEqualTo(fishBone2);
    }
}
