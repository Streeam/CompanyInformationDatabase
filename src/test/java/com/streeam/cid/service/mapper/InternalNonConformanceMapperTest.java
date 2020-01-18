package com.streeam.cid.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class InternalNonConformanceMapperTest {

    private InternalNonConformanceMapper internalNonConformanceMapper;

    @BeforeEach
    public void setUp() {
        internalNonConformanceMapper = new InternalNonConformanceMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(internalNonConformanceMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(internalNonConformanceMapper.fromId(null)).isNull();
    }
}
