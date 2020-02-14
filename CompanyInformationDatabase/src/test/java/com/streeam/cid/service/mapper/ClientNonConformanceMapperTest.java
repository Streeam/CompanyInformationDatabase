package com.streeam.cid.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ClientNonConformanceMapperTest {

    private ClientNonConformanceMapper clientNonConformanceMapper;

    @BeforeEach
    public void setUp() {
        clientNonConformanceMapper = new ClientNonConformanceMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(clientNonConformanceMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(clientNonConformanceMapper.fromId(null)).isNull();
    }
}
