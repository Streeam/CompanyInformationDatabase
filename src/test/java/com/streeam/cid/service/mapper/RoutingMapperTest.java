package com.streeam.cid.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class RoutingMapperTest {

    private RoutingMapper routingMapper;

    @BeforeEach
    public void setUp() {
        routingMapper = new RoutingMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(routingMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(routingMapper.fromId(null)).isNull();
    }
}
