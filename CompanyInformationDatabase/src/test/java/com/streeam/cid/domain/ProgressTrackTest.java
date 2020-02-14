package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ProgressTrackTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgressTrack.class);
        ProgressTrack progressTrack1 = new ProgressTrack();
        progressTrack1.setId(1L);
        ProgressTrack progressTrack2 = new ProgressTrack();
        progressTrack2.setId(progressTrack1.getId());
        assertThat(progressTrack1).isEqualTo(progressTrack2);
        progressTrack2.setId(2L);
        assertThat(progressTrack1).isNotEqualTo(progressTrack2);
        progressTrack1.setId(null);
        assertThat(progressTrack1).isNotEqualTo(progressTrack2);
    }
}
