package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class RolesDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolesDTO.class);
        RolesDTO rolesDTO1 = new RolesDTO();
        rolesDTO1.setId(1L);
        RolesDTO rolesDTO2 = new RolesDTO();
        assertThat(rolesDTO1).isNotEqualTo(rolesDTO2);
        rolesDTO2.setId(rolesDTO1.getId());
        assertThat(rolesDTO1).isEqualTo(rolesDTO2);
        rolesDTO2.setId(2L);
        assertThat(rolesDTO1).isNotEqualTo(rolesDTO2);
        rolesDTO1.setId(null);
        assertThat(rolesDTO1).isNotEqualTo(rolesDTO2);
    }
}
