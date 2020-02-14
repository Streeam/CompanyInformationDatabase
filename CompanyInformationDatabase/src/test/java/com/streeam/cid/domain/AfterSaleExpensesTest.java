package com.streeam.cid.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.streeam.cid.web.rest.TestUtil;

public class AfterSaleExpensesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AfterSaleExpenses.class);
        AfterSaleExpenses afterSaleExpenses1 = new AfterSaleExpenses();
        afterSaleExpenses1.setId(1L);
        AfterSaleExpenses afterSaleExpenses2 = new AfterSaleExpenses();
        afterSaleExpenses2.setId(afterSaleExpenses1.getId());
        assertThat(afterSaleExpenses1).isEqualTo(afterSaleExpenses2);
        afterSaleExpenses2.setId(2L);
        assertThat(afterSaleExpenses1).isNotEqualTo(afterSaleExpenses2);
        afterSaleExpenses1.setId(null);
        assertThat(afterSaleExpenses1).isNotEqualTo(afterSaleExpenses2);
    }
}
