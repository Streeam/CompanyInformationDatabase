package com.streeam.cid.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class NonConformanceDetailsMapperTest {

    private NonConformanceDetailsMapper nonConformanceDetailsMapper;

    @BeforeEach
    public void setUp() {
        nonConformanceDetailsMapper = new NonConformanceDetailsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(nonConformanceDetailsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(nonConformanceDetailsMapper.fromId(null)).isNull();
    }
}
