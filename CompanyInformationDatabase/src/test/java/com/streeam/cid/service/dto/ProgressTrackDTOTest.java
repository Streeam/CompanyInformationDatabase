package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ProgressTrackDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgressTrackDTO.class);
        ProgressTrackDTO progressTrackDTO1 = new ProgressTrackDTO();
        progressTrackDTO1.setId(1L);
        ProgressTrackDTO progressTrackDTO2 = new ProgressTrackDTO();
        assertThat(progressTrackDTO1).isNotEqualTo(progressTrackDTO2);
        progressTrackDTO2.setId(progressTrackDTO1.getId());
        assertThat(progressTrackDTO1).isEqualTo(progressTrackDTO2);
        progressTrackDTO2.setId(2L);
        assertThat(progressTrackDTO1).isNotEqualTo(progressTrackDTO2);
        progressTrackDTO1.setId(null);
        assertThat(progressTrackDTO1).isNotEqualTo(progressTrackDTO2);
    }
}
