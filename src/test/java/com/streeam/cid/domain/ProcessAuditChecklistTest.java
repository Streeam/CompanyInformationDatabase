package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class ProcessAuditChecklistTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcessAuditChecklist.class);
        ProcessAuditChecklist processAuditChecklist1 = new ProcessAuditChecklist();
        processAuditChecklist1.setId(1L);
        ProcessAuditChecklist processAuditChecklist2 = new ProcessAuditChecklist();
        processAuditChecklist2.setId(processAuditChecklist1.getId());
        assertThat(processAuditChecklist1).isEqualTo(processAuditChecklist2);
        processAuditChecklist2.setId(2L);
        assertThat(processAuditChecklist1).isNotEqualTo(processAuditChecklist2);
        processAuditChecklist1.setId(null);
        assertThat(processAuditChecklist1).isNotEqualTo(processAuditChecklist2);
    }
}
