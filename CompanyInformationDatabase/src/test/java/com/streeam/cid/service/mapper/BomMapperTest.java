package com.streeam.cid.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class BomMapperTest {

    private BomMapper bomMapper;

    @BeforeEach
    public void setUp() {
        bomMapper = new BomMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(bomMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(bomMapper.fromId(null)).isNull();
    }
}
