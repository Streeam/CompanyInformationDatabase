package com.streeam.cid.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class BomDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BomDTO.class);
        BomDTO bomDTO1 = new BomDTO();
        bomDTO1.setId(1L);
        BomDTO bomDTO2 = new BomDTO();
        assertThat(bomDTO1).isNotEqualTo(bomDTO2);
        bomDTO2.setId(bomDTO1.getId());
        assertThat(bomDTO1).isEqualTo(bomDTO2);
        bomDTO2.setId(2L);
        assertThat(bomDTO1).isNotEqualTo(bomDTO2);
        bomDTO1.setId(null);
        assertThat(bomDTO1).isNotEqualTo(bomDTO2);
    }
}
