package com.streeam.cid.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ProgressTrackMapperTest {

    private ProgressTrackMapper progressTrackMapper;

    @BeforeEach
    public void setUp() {
        progressTrackMapper = new ProgressTrackMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(progressTrackMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(progressTrackMapper.fromId(null)).isNull();
    }
}
