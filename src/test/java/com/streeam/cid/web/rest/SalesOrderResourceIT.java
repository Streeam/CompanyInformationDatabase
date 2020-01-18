package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.SalesOrder;
import com.streeam.cid.repository.SalesOrderRepository;
import com.streeam.cid.service.SalesOrderService;
import com.streeam.cid.service.dto.SalesOrderDTO;
import com.streeam.cid.service.mapper.SalesOrderMapper;
import com.streeam.cid.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SalesOrderResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class SalesOrderResourceIT {

    private static final String DEFAULT_SALES_ORDER_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ORDER_NUMBER = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_RAISED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RAISED = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SO_SALES_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_SO_SALES_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_SECOND_SALES_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_SECOND_SALES_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_CURRENCY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_EXCHANGE_RATE = "AAAAAAAAAA";
    private static final String UPDATED_EXCHANGE_RATE = "BBBBBBBBBB";

    private static final Double DEFAULT_DISCOUNT_PERCENT = 0D;
    private static final Double UPDATED_DISCOUNT_PERCENT = 1D;

    private static final String DEFAULT_CONTACT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_OUR_CONTACT = "AAAAAAAAAA";
    private static final String UPDATED_OUR_CONTACT = "BBBBBBBBBB";

    private static final String DEFAULT_INVOICE_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_INVOICE_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_INVOICE_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ORDER_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ORDER_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ANALYSIS_1 = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ANALYSIS_1 = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ANALYSIS_2 = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ANALYSIS_2 = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ANALYSIS_3 = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ANALYSIS_3 = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ANALYSIS_4 = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ANALYSIS_4 = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ANALYSIS_5 = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ANALYSIS_5 = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ANALYSIS_6 = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ANALYSIS_6 = "BBBBBBBBBB";

    private static final String DEFAULT_MEMO_1 = "AAAAAAAAAA";
    private static final String UPDATED_MEMO_1 = "BBBBBBBBBB";

    private static final String DEFAULT_MEMO_2 = "AAAAAAAAAA";
    private static final String UPDATED_MEMO_2 = "BBBBBBBBBB";

    private static final String DEFAULT_MEMO_3 = "AAAAAAAAAA";
    private static final String UPDATED_MEMO_3 = "BBBBBBBBBB";

    private static final String DEFAULT_MEMO_4 = "AAAAAAAAAA";
    private static final String UPDATED_MEMO_4 = "BBBBBBBBBB";

    private static final String DEFAULT_MEMO_5 = "AAAAAAAAAA";
    private static final String UPDATED_MEMO_5 = "BBBBBBBBBB";

    private static final String DEFAULT_MEMO_6 = "AAAAAAAAAA";
    private static final String UPDATED_MEMO_6 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_01 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_01 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_02 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_02 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_03 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_03 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_04 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_04 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_05 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_05 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_06 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_06 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_07 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_07 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_08 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_08 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_09 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_09 = "BBBBBBBBBB";

    private static final String DEFAULT_STOCK_ANALYSIS_10 = "AAAAAAAAAA";
    private static final String UPDATED_STOCK_ANALYSIS_10 = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_TRANSACTION_CODE = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ORDER_STATUS_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ORDER_STATUS_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESPATCH_STATUS_ID = "AAAAAAAAAA";
    private static final String UPDATED_DESPATCH_STATUS_ID = "BBBBBBBBBB";

    private static final String DEFAULT_DIVISION = "AAAAAAAAAA";
    private static final String UPDATED_DIVISION = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LINE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DESPATCH_STATUS_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DESPATCH_STATUS_CODE = "BBBBBBBBBB";

    private static final Double DEFAULT_QUANTITY_ORDERED = 0D;
    private static final Double UPDATED_QUANTITY_ORDERED = 1D;

    private static final Double DEFAULT_QUANTITY_OUTSTANDING = 0D;
    private static final Double UPDATED_QUANTITY_OUTSTANDING = 1D;

    private static final Double DEFAULT_QUANTITY_DESPATCHED = 0D;
    private static final Double UPDATED_QUANTITY_DESPATCHED = 1D;

    private static final LocalDate DEFAULT_DESPATCH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DESPATCH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_CUST_REQUIRED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CUST_REQUIRED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_UNIT_PRICE = 0D;
    private static final Double UPDATED_UNIT_PRICE = 1D;

    private static final Double DEFAULT_UNIT_PRICEIN_BASE = 0D;
    private static final Double UPDATED_UNIT_PRICEIN_BASE = 1D;

    private static final Double DEFAULT_LINE_DISCOUNT_PERCENT = 0D;
    private static final Double UPDATED_LINE_DISCOUNT_PERCENT = 1D;

    private static final Double DEFAULT_MARGIN_PERCENT = 0D;
    private static final Double UPDATED_MARGIN_PERCENT = 1D;

    private static final Double DEFAULT_LINE_TOTAL = 0D;
    private static final Double UPDATED_LINE_TOTAL = 1D;

    private static final Double DEFAULT_LINE_TOTALIN_BASE = 0D;
    private static final Double UPDATED_LINE_TOTALIN_BASE = 1D;

    private static final String DEFAULT_TAX_CODE = "AAAAAAAAAA";
    private static final String UPDATED_TAX_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NOMINAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_NOMINAL_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ON_HOLD = false;
    private static final Boolean UPDATED_ON_HOLD = true;

    private static final String DEFAULT_R_CODE = "AAAAAAAAAA";
    private static final String UPDATED_R_CODE = "BBBBBBBBBB";

    private static final Double DEFAULT_STANDARD_MARGIN = 0D;
    private static final Double UPDATED_STANDARD_MARGIN = 1D;

    private static final String DEFAULT_DELIVERY_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_ADDRESS_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_ADDRESS_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_DELIVERY_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SALES_ORDER_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_SALES_ORDER_STATUS = "BBBBBBBBBB";

    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Autowired
    private SalesOrderMapper salesOrderMapper;

    @Autowired
    private SalesOrderService salesOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSalesOrderMockMvc;

    private SalesOrder salesOrder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalesOrderResource salesOrderResource = new SalesOrderResource(salesOrderService);
        this.restSalesOrderMockMvc = MockMvcBuilders.standaloneSetup(salesOrderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalesOrder createEntity(EntityManager em) {
        SalesOrder salesOrder = new SalesOrder()
            .salesOrderNumber(DEFAULT_SALES_ORDER_NUMBER)
            .dateRaised(DEFAULT_DATE_RAISED)
            .soSalesStatus(DEFAULT_SO_SALES_STATUS)
            .secondSalesReference(DEFAULT_SECOND_SALES_REFERENCE)
            .currencyCode(DEFAULT_CURRENCY_CODE)
            .exchangeRate(DEFAULT_EXCHANGE_RATE)
            .discountPercent(DEFAULT_DISCOUNT_PERCENT)
            .contactName(DEFAULT_CONTACT_NAME)
            .ourContact(DEFAULT_OUR_CONTACT)
            .invoiceAddress(DEFAULT_INVOICE_ADDRESS)
            .invoiceCountryCode(DEFAULT_INVOICE_COUNTRY_CODE)
            .salesOrderTitle(DEFAULT_SALES_ORDER_TITLE)
            .salesAnalysis1(DEFAULT_SALES_ANALYSIS_1)
            .salesAnalysis2(DEFAULT_SALES_ANALYSIS_2)
            .salesAnalysis3(DEFAULT_SALES_ANALYSIS_3)
            .salesAnalysis4(DEFAULT_SALES_ANALYSIS_4)
            .salesAnalysis5(DEFAULT_SALES_ANALYSIS_5)
            .salesAnalysis6(DEFAULT_SALES_ANALYSIS_6)
            .memo1(DEFAULT_MEMO_1)
            .memo2(DEFAULT_MEMO_2)
            .memo3(DEFAULT_MEMO_3)
            .memo4(DEFAULT_MEMO_4)
            .memo5(DEFAULT_MEMO_5)
            .memo6(DEFAULT_MEMO_6)
            .stockAnalysis01(DEFAULT_STOCK_ANALYSIS_01)
            .stockAnalysis02(DEFAULT_STOCK_ANALYSIS_02)
            .stockAnalysis03(DEFAULT_STOCK_ANALYSIS_03)
            .stockAnalysis04(DEFAULT_STOCK_ANALYSIS_04)
            .stockAnalysis05(DEFAULT_STOCK_ANALYSIS_05)
            .stockAnalysis06(DEFAULT_STOCK_ANALYSIS_06)
            .stockAnalysis07(DEFAULT_STOCK_ANALYSIS_07)
            .stockAnalysis08(DEFAULT_STOCK_ANALYSIS_08)
            .stockAnalysis09(DEFAULT_STOCK_ANALYSIS_09)
            .stockAnalysis10(DEFAULT_STOCK_ANALYSIS_10)
            .deliveryCode(DEFAULT_DELIVERY_CODE)
            .transactionCode(DEFAULT_TRANSACTION_CODE)
            .code(DEFAULT_CODE)
            .salesOrderStatusCode(DEFAULT_SALES_ORDER_STATUS_CODE)
            .despatchStatusID(DEFAULT_DESPATCH_STATUS_ID)
            .division(DEFAULT_DIVISION)
            .lineNumber(DEFAULT_LINE_NUMBER)
            .despatchStatusCode(DEFAULT_DESPATCH_STATUS_CODE)
            .quantityOrdered(DEFAULT_QUANTITY_ORDERED)
            .quantityOutstanding(DEFAULT_QUANTITY_OUTSTANDING)
            .quantityDespatched(DEFAULT_QUANTITY_DESPATCHED)
            .despatchDate(DEFAULT_DESPATCH_DATE)
            .custRequiredDate(DEFAULT_CUST_REQUIRED_DATE)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .unitPriceinBase(DEFAULT_UNIT_PRICEIN_BASE)
            .lineDiscountPercent(DEFAULT_LINE_DISCOUNT_PERCENT)
            .marginPercent(DEFAULT_MARGIN_PERCENT)
            .lineTotal(DEFAULT_LINE_TOTAL)
            .lineTotalinBase(DEFAULT_LINE_TOTALIN_BASE)
            .taxCode(DEFAULT_TAX_CODE)
            .nominalCode(DEFAULT_NOMINAL_CODE)
            .onHold(DEFAULT_ON_HOLD)
            .rCode(DEFAULT_R_CODE)
            .standardMargin(DEFAULT_STANDARD_MARGIN)
            .deliveryAddress(DEFAULT_DELIVERY_ADDRESS)
            .deliveryAddressDescription(DEFAULT_DELIVERY_ADDRESS_DESCRIPTION)
            .deliveryCountryCode(DEFAULT_DELIVERY_COUNTRY_CODE)
            .salesOrderStatus(DEFAULT_SALES_ORDER_STATUS);
        return salesOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalesOrder createUpdatedEntity(EntityManager em) {
        SalesOrder salesOrder = new SalesOrder()
            .salesOrderNumber(UPDATED_SALES_ORDER_NUMBER)
            .dateRaised(UPDATED_DATE_RAISED)
            .soSalesStatus(UPDATED_SO_SALES_STATUS)
            .secondSalesReference(UPDATED_SECOND_SALES_REFERENCE)
            .currencyCode(UPDATED_CURRENCY_CODE)
            .exchangeRate(UPDATED_EXCHANGE_RATE)
            .discountPercent(UPDATED_DISCOUNT_PERCENT)
            .contactName(UPDATED_CONTACT_NAME)
            .ourContact(UPDATED_OUR_CONTACT)
            .invoiceAddress(UPDATED_INVOICE_ADDRESS)
            .invoiceCountryCode(UPDATED_INVOICE_COUNTRY_CODE)
            .salesOrderTitle(UPDATED_SALES_ORDER_TITLE)
            .salesAnalysis1(UPDATED_SALES_ANALYSIS_1)
            .salesAnalysis2(UPDATED_SALES_ANALYSIS_2)
            .salesAnalysis3(UPDATED_SALES_ANALYSIS_3)
            .salesAnalysis4(UPDATED_SALES_ANALYSIS_4)
            .salesAnalysis5(UPDATED_SALES_ANALYSIS_5)
            .salesAnalysis6(UPDATED_SALES_ANALYSIS_6)
            .memo1(UPDATED_MEMO_1)
            .memo2(UPDATED_MEMO_2)
            .memo3(UPDATED_MEMO_3)
            .memo4(UPDATED_MEMO_4)
            .memo5(UPDATED_MEMO_5)
            .memo6(UPDATED_MEMO_6)
            .stockAnalysis01(UPDATED_STOCK_ANALYSIS_01)
            .stockAnalysis02(UPDATED_STOCK_ANALYSIS_02)
            .stockAnalysis03(UPDATED_STOCK_ANALYSIS_03)
            .stockAnalysis04(UPDATED_STOCK_ANALYSIS_04)
            .stockAnalysis05(UPDATED_STOCK_ANALYSIS_05)
            .stockAnalysis06(UPDATED_STOCK_ANALYSIS_06)
            .stockAnalysis07(UPDATED_STOCK_ANALYSIS_07)
            .stockAnalysis08(UPDATED_STOCK_ANALYSIS_08)
            .stockAnalysis09(UPDATED_STOCK_ANALYSIS_09)
            .stockAnalysis10(UPDATED_STOCK_ANALYSIS_10)
            .deliveryCode(UPDATED_DELIVERY_CODE)
            .transactionCode(UPDATED_TRANSACTION_CODE)
            .code(UPDATED_CODE)
            .salesOrderStatusCode(UPDATED_SALES_ORDER_STATUS_CODE)
            .despatchStatusID(UPDATED_DESPATCH_STATUS_ID)
            .division(UPDATED_DIVISION)
            .lineNumber(UPDATED_LINE_NUMBER)
            .despatchStatusCode(UPDATED_DESPATCH_STATUS_CODE)
            .quantityOrdered(UPDATED_QUANTITY_ORDERED)
            .quantityOutstanding(UPDATED_QUANTITY_OUTSTANDING)
            .quantityDespatched(UPDATED_QUANTITY_DESPATCHED)
            .despatchDate(UPDATED_DESPATCH_DATE)
            .custRequiredDate(UPDATED_CUST_REQUIRED_DATE)
            .unitPrice(UPDATED_UNIT_PRICE)
            .unitPriceinBase(UPDATED_UNIT_PRICEIN_BASE)
            .lineDiscountPercent(UPDATED_LINE_DISCOUNT_PERCENT)
            .marginPercent(UPDATED_MARGIN_PERCENT)
            .lineTotal(UPDATED_LINE_TOTAL)
            .lineTotalinBase(UPDATED_LINE_TOTALIN_BASE)
            .taxCode(UPDATED_TAX_CODE)
            .nominalCode(UPDATED_NOMINAL_CODE)
            .onHold(UPDATED_ON_HOLD)
            .rCode(UPDATED_R_CODE)
            .standardMargin(UPDATED_STANDARD_MARGIN)
            .deliveryAddress(UPDATED_DELIVERY_ADDRESS)
            .deliveryAddressDescription(UPDATED_DELIVERY_ADDRESS_DESCRIPTION)
            .deliveryCountryCode(UPDATED_DELIVERY_COUNTRY_CODE)
            .salesOrderStatus(UPDATED_SALES_ORDER_STATUS);
        return salesOrder;
    }

    @BeforeEach
    public void initTest() {
        salesOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalesOrder() throws Exception {
        int databaseSizeBeforeCreate = salesOrderRepository.findAll().size();

        // Create the SalesOrder
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);
        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeCreate + 1);
        SalesOrder testSalesOrder = salesOrderList.get(salesOrderList.size() - 1);
        assertThat(testSalesOrder.getSalesOrderNumber()).isEqualTo(DEFAULT_SALES_ORDER_NUMBER);
        assertThat(testSalesOrder.getDateRaised()).isEqualTo(DEFAULT_DATE_RAISED);
        assertThat(testSalesOrder.getSoSalesStatus()).isEqualTo(DEFAULT_SO_SALES_STATUS);
        assertThat(testSalesOrder.getSecondSalesReference()).isEqualTo(DEFAULT_SECOND_SALES_REFERENCE);
        assertThat(testSalesOrder.getCurrencyCode()).isEqualTo(DEFAULT_CURRENCY_CODE);
        assertThat(testSalesOrder.getExchangeRate()).isEqualTo(DEFAULT_EXCHANGE_RATE);
        assertThat(testSalesOrder.getDiscountPercent()).isEqualTo(DEFAULT_DISCOUNT_PERCENT);
        assertThat(testSalesOrder.getContactName()).isEqualTo(DEFAULT_CONTACT_NAME);
        assertThat(testSalesOrder.getOurContact()).isEqualTo(DEFAULT_OUR_CONTACT);
        assertThat(testSalesOrder.getInvoiceAddress()).isEqualTo(DEFAULT_INVOICE_ADDRESS);
        assertThat(testSalesOrder.getInvoiceCountryCode()).isEqualTo(DEFAULT_INVOICE_COUNTRY_CODE);
        assertThat(testSalesOrder.getSalesOrderTitle()).isEqualTo(DEFAULT_SALES_ORDER_TITLE);
        assertThat(testSalesOrder.getSalesAnalysis1()).isEqualTo(DEFAULT_SALES_ANALYSIS_1);
        assertThat(testSalesOrder.getSalesAnalysis2()).isEqualTo(DEFAULT_SALES_ANALYSIS_2);
        assertThat(testSalesOrder.getSalesAnalysis3()).isEqualTo(DEFAULT_SALES_ANALYSIS_3);
        assertThat(testSalesOrder.getSalesAnalysis4()).isEqualTo(DEFAULT_SALES_ANALYSIS_4);
        assertThat(testSalesOrder.getSalesAnalysis5()).isEqualTo(DEFAULT_SALES_ANALYSIS_5);
        assertThat(testSalesOrder.getSalesAnalysis6()).isEqualTo(DEFAULT_SALES_ANALYSIS_6);
        assertThat(testSalesOrder.getMemo1()).isEqualTo(DEFAULT_MEMO_1);
        assertThat(testSalesOrder.getMemo2()).isEqualTo(DEFAULT_MEMO_2);
        assertThat(testSalesOrder.getMemo3()).isEqualTo(DEFAULT_MEMO_3);
        assertThat(testSalesOrder.getMemo4()).isEqualTo(DEFAULT_MEMO_4);
        assertThat(testSalesOrder.getMemo5()).isEqualTo(DEFAULT_MEMO_5);
        assertThat(testSalesOrder.getMemo6()).isEqualTo(DEFAULT_MEMO_6);
        assertThat(testSalesOrder.getStockAnalysis01()).isEqualTo(DEFAULT_STOCK_ANALYSIS_01);
        assertThat(testSalesOrder.getStockAnalysis02()).isEqualTo(DEFAULT_STOCK_ANALYSIS_02);
        assertThat(testSalesOrder.getStockAnalysis03()).isEqualTo(DEFAULT_STOCK_ANALYSIS_03);
        assertThat(testSalesOrder.getStockAnalysis04()).isEqualTo(DEFAULT_STOCK_ANALYSIS_04);
        assertThat(testSalesOrder.getStockAnalysis05()).isEqualTo(DEFAULT_STOCK_ANALYSIS_05);
        assertThat(testSalesOrder.getStockAnalysis06()).isEqualTo(DEFAULT_STOCK_ANALYSIS_06);
        assertThat(testSalesOrder.getStockAnalysis07()).isEqualTo(DEFAULT_STOCK_ANALYSIS_07);
        assertThat(testSalesOrder.getStockAnalysis08()).isEqualTo(DEFAULT_STOCK_ANALYSIS_08);
        assertThat(testSalesOrder.getStockAnalysis09()).isEqualTo(DEFAULT_STOCK_ANALYSIS_09);
        assertThat(testSalesOrder.getStockAnalysis10()).isEqualTo(DEFAULT_STOCK_ANALYSIS_10);
        assertThat(testSalesOrder.getDeliveryCode()).isEqualTo(DEFAULT_DELIVERY_CODE);
        assertThat(testSalesOrder.getTransactionCode()).isEqualTo(DEFAULT_TRANSACTION_CODE);
        assertThat(testSalesOrder.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testSalesOrder.getSalesOrderStatusCode()).isEqualTo(DEFAULT_SALES_ORDER_STATUS_CODE);
        assertThat(testSalesOrder.getDespatchStatusID()).isEqualTo(DEFAULT_DESPATCH_STATUS_ID);
        assertThat(testSalesOrder.getDivision()).isEqualTo(DEFAULT_DIVISION);
        assertThat(testSalesOrder.getLineNumber()).isEqualTo(DEFAULT_LINE_NUMBER);
        assertThat(testSalesOrder.getDespatchStatusCode()).isEqualTo(DEFAULT_DESPATCH_STATUS_CODE);
        assertThat(testSalesOrder.getQuantityOrdered()).isEqualTo(DEFAULT_QUANTITY_ORDERED);
        assertThat(testSalesOrder.getQuantityOutstanding()).isEqualTo(DEFAULT_QUANTITY_OUTSTANDING);
        assertThat(testSalesOrder.getQuantityDespatched()).isEqualTo(DEFAULT_QUANTITY_DESPATCHED);
        assertThat(testSalesOrder.getDespatchDate()).isEqualTo(DEFAULT_DESPATCH_DATE);
        assertThat(testSalesOrder.getCustRequiredDate()).isEqualTo(DEFAULT_CUST_REQUIRED_DATE);
        assertThat(testSalesOrder.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testSalesOrder.getUnitPriceinBase()).isEqualTo(DEFAULT_UNIT_PRICEIN_BASE);
        assertThat(testSalesOrder.getLineDiscountPercent()).isEqualTo(DEFAULT_LINE_DISCOUNT_PERCENT);
        assertThat(testSalesOrder.getMarginPercent()).isEqualTo(DEFAULT_MARGIN_PERCENT);
        assertThat(testSalesOrder.getLineTotal()).isEqualTo(DEFAULT_LINE_TOTAL);
        assertThat(testSalesOrder.getLineTotalinBase()).isEqualTo(DEFAULT_LINE_TOTALIN_BASE);
        assertThat(testSalesOrder.getTaxCode()).isEqualTo(DEFAULT_TAX_CODE);
        assertThat(testSalesOrder.getNominalCode()).isEqualTo(DEFAULT_NOMINAL_CODE);
        assertThat(testSalesOrder.isOnHold()).isEqualTo(DEFAULT_ON_HOLD);
        assertThat(testSalesOrder.getrCode()).isEqualTo(DEFAULT_R_CODE);
        assertThat(testSalesOrder.getStandardMargin()).isEqualTo(DEFAULT_STANDARD_MARGIN);
        assertThat(testSalesOrder.getDeliveryAddress()).isEqualTo(DEFAULT_DELIVERY_ADDRESS);
        assertThat(testSalesOrder.getDeliveryAddressDescription()).isEqualTo(DEFAULT_DELIVERY_ADDRESS_DESCRIPTION);
        assertThat(testSalesOrder.getDeliveryCountryCode()).isEqualTo(DEFAULT_DELIVERY_COUNTRY_CODE);
        assertThat(testSalesOrder.getSalesOrderStatus()).isEqualTo(DEFAULT_SALES_ORDER_STATUS);
    }

    @Test
    @Transactional
    public void createSalesOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salesOrderRepository.findAll().size();

        // Create the SalesOrder with an existing ID
        salesOrder.setId(1L);
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSalesOrderNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setSalesOrderNumber(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateRaisedIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setDateRaised(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDiscountPercentIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setDiscountPercent(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDespatchDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setDespatchDate(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCustRequiredDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setCustRequiredDate(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTaxCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setTaxCode(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNominalCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setNominalCode(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOnHoldIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setOnHold(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkrCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setrCode(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeliveryAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = salesOrderRepository.findAll().size();
        // set the field null
        salesOrder.setDeliveryAddress(null);

        // Create the SalesOrder, which fails.
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        restSalesOrderMockMvc.perform(post("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSalesOrders() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);

        // Get all the salesOrderList
        restSalesOrderMockMvc.perform(get("/api/sales-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salesOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].salesOrderNumber").value(hasItem(DEFAULT_SALES_ORDER_NUMBER)))
            .andExpect(jsonPath("$.[*].dateRaised").value(hasItem(DEFAULT_DATE_RAISED.toString())))
            .andExpect(jsonPath("$.[*].soSalesStatus").value(hasItem(DEFAULT_SO_SALES_STATUS)))
            .andExpect(jsonPath("$.[*].secondSalesReference").value(hasItem(DEFAULT_SECOND_SALES_REFERENCE)))
            .andExpect(jsonPath("$.[*].currencyCode").value(hasItem(DEFAULT_CURRENCY_CODE)))
            .andExpect(jsonPath("$.[*].exchangeRate").value(hasItem(DEFAULT_EXCHANGE_RATE)))
            .andExpect(jsonPath("$.[*].discountPercent").value(hasItem(DEFAULT_DISCOUNT_PERCENT.doubleValue())))
            .andExpect(jsonPath("$.[*].contactName").value(hasItem(DEFAULT_CONTACT_NAME)))
            .andExpect(jsonPath("$.[*].ourContact").value(hasItem(DEFAULT_OUR_CONTACT)))
            .andExpect(jsonPath("$.[*].invoiceAddress").value(hasItem(DEFAULT_INVOICE_ADDRESS)))
            .andExpect(jsonPath("$.[*].invoiceCountryCode").value(hasItem(DEFAULT_INVOICE_COUNTRY_CODE)))
            .andExpect(jsonPath("$.[*].salesOrderTitle").value(hasItem(DEFAULT_SALES_ORDER_TITLE)))
            .andExpect(jsonPath("$.[*].salesAnalysis1").value(hasItem(DEFAULT_SALES_ANALYSIS_1)))
            .andExpect(jsonPath("$.[*].salesAnalysis2").value(hasItem(DEFAULT_SALES_ANALYSIS_2)))
            .andExpect(jsonPath("$.[*].salesAnalysis3").value(hasItem(DEFAULT_SALES_ANALYSIS_3)))
            .andExpect(jsonPath("$.[*].salesAnalysis4").value(hasItem(DEFAULT_SALES_ANALYSIS_4)))
            .andExpect(jsonPath("$.[*].salesAnalysis5").value(hasItem(DEFAULT_SALES_ANALYSIS_5)))
            .andExpect(jsonPath("$.[*].salesAnalysis6").value(hasItem(DEFAULT_SALES_ANALYSIS_6)))
            .andExpect(jsonPath("$.[*].memo1").value(hasItem(DEFAULT_MEMO_1)))
            .andExpect(jsonPath("$.[*].memo2").value(hasItem(DEFAULT_MEMO_2)))
            .andExpect(jsonPath("$.[*].memo3").value(hasItem(DEFAULT_MEMO_3)))
            .andExpect(jsonPath("$.[*].memo4").value(hasItem(DEFAULT_MEMO_4)))
            .andExpect(jsonPath("$.[*].memo5").value(hasItem(DEFAULT_MEMO_5)))
            .andExpect(jsonPath("$.[*].memo6").value(hasItem(DEFAULT_MEMO_6)))
            .andExpect(jsonPath("$.[*].stockAnalysis01").value(hasItem(DEFAULT_STOCK_ANALYSIS_01)))
            .andExpect(jsonPath("$.[*].stockAnalysis02").value(hasItem(DEFAULT_STOCK_ANALYSIS_02)))
            .andExpect(jsonPath("$.[*].stockAnalysis03").value(hasItem(DEFAULT_STOCK_ANALYSIS_03)))
            .andExpect(jsonPath("$.[*].stockAnalysis04").value(hasItem(DEFAULT_STOCK_ANALYSIS_04)))
            .andExpect(jsonPath("$.[*].stockAnalysis05").value(hasItem(DEFAULT_STOCK_ANALYSIS_05)))
            .andExpect(jsonPath("$.[*].stockAnalysis06").value(hasItem(DEFAULT_STOCK_ANALYSIS_06)))
            .andExpect(jsonPath("$.[*].stockAnalysis07").value(hasItem(DEFAULT_STOCK_ANALYSIS_07)))
            .andExpect(jsonPath("$.[*].stockAnalysis08").value(hasItem(DEFAULT_STOCK_ANALYSIS_08)))
            .andExpect(jsonPath("$.[*].stockAnalysis09").value(hasItem(DEFAULT_STOCK_ANALYSIS_09)))
            .andExpect(jsonPath("$.[*].stockAnalysis10").value(hasItem(DEFAULT_STOCK_ANALYSIS_10)))
            .andExpect(jsonPath("$.[*].deliveryCode").value(hasItem(DEFAULT_DELIVERY_CODE)))
            .andExpect(jsonPath("$.[*].transactionCode").value(hasItem(DEFAULT_TRANSACTION_CODE)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].salesOrderStatusCode").value(hasItem(DEFAULT_SALES_ORDER_STATUS_CODE)))
            .andExpect(jsonPath("$.[*].despatchStatusID").value(hasItem(DEFAULT_DESPATCH_STATUS_ID)))
            .andExpect(jsonPath("$.[*].division").value(hasItem(DEFAULT_DIVISION)))
            .andExpect(jsonPath("$.[*].lineNumber").value(hasItem(DEFAULT_LINE_NUMBER)))
            .andExpect(jsonPath("$.[*].despatchStatusCode").value(hasItem(DEFAULT_DESPATCH_STATUS_CODE)))
            .andExpect(jsonPath("$.[*].quantityOrdered").value(hasItem(DEFAULT_QUANTITY_ORDERED.doubleValue())))
            .andExpect(jsonPath("$.[*].quantityOutstanding").value(hasItem(DEFAULT_QUANTITY_OUTSTANDING.doubleValue())))
            .andExpect(jsonPath("$.[*].quantityDespatched").value(hasItem(DEFAULT_QUANTITY_DESPATCHED.doubleValue())))
            .andExpect(jsonPath("$.[*].despatchDate").value(hasItem(DEFAULT_DESPATCH_DATE.toString())))
            .andExpect(jsonPath("$.[*].custRequiredDate").value(hasItem(DEFAULT_CUST_REQUIRED_DATE.toString())))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].unitPriceinBase").value(hasItem(DEFAULT_UNIT_PRICEIN_BASE.doubleValue())))
            .andExpect(jsonPath("$.[*].lineDiscountPercent").value(hasItem(DEFAULT_LINE_DISCOUNT_PERCENT.doubleValue())))
            .andExpect(jsonPath("$.[*].marginPercent").value(hasItem(DEFAULT_MARGIN_PERCENT.doubleValue())))
            .andExpect(jsonPath("$.[*].lineTotal").value(hasItem(DEFAULT_LINE_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].lineTotalinBase").value(hasItem(DEFAULT_LINE_TOTALIN_BASE.doubleValue())))
            .andExpect(jsonPath("$.[*].taxCode").value(hasItem(DEFAULT_TAX_CODE)))
            .andExpect(jsonPath("$.[*].nominalCode").value(hasItem(DEFAULT_NOMINAL_CODE)))
            .andExpect(jsonPath("$.[*].onHold").value(hasItem(DEFAULT_ON_HOLD.booleanValue())))
            .andExpect(jsonPath("$.[*].rCode").value(hasItem(DEFAULT_R_CODE)))
            .andExpect(jsonPath("$.[*].standardMargin").value(hasItem(DEFAULT_STANDARD_MARGIN.doubleValue())))
            .andExpect(jsonPath("$.[*].deliveryAddress").value(hasItem(DEFAULT_DELIVERY_ADDRESS)))
            .andExpect(jsonPath("$.[*].deliveryAddressDescription").value(hasItem(DEFAULT_DELIVERY_ADDRESS_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].deliveryCountryCode").value(hasItem(DEFAULT_DELIVERY_COUNTRY_CODE)))
            .andExpect(jsonPath("$.[*].salesOrderStatus").value(hasItem(DEFAULT_SALES_ORDER_STATUS)));
    }
    
    @Test
    @Transactional
    public void getSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);

        // Get the salesOrder
        restSalesOrderMockMvc.perform(get("/api/sales-orders/{id}", salesOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salesOrder.getId().intValue()))
            .andExpect(jsonPath("$.salesOrderNumber").value(DEFAULT_SALES_ORDER_NUMBER))
            .andExpect(jsonPath("$.dateRaised").value(DEFAULT_DATE_RAISED.toString()))
            .andExpect(jsonPath("$.soSalesStatus").value(DEFAULT_SO_SALES_STATUS))
            .andExpect(jsonPath("$.secondSalesReference").value(DEFAULT_SECOND_SALES_REFERENCE))
            .andExpect(jsonPath("$.currencyCode").value(DEFAULT_CURRENCY_CODE))
            .andExpect(jsonPath("$.exchangeRate").value(DEFAULT_EXCHANGE_RATE))
            .andExpect(jsonPath("$.discountPercent").value(DEFAULT_DISCOUNT_PERCENT.doubleValue()))
            .andExpect(jsonPath("$.contactName").value(DEFAULT_CONTACT_NAME))
            .andExpect(jsonPath("$.ourContact").value(DEFAULT_OUR_CONTACT))
            .andExpect(jsonPath("$.invoiceAddress").value(DEFAULT_INVOICE_ADDRESS))
            .andExpect(jsonPath("$.invoiceCountryCode").value(DEFAULT_INVOICE_COUNTRY_CODE))
            .andExpect(jsonPath("$.salesOrderTitle").value(DEFAULT_SALES_ORDER_TITLE))
            .andExpect(jsonPath("$.salesAnalysis1").value(DEFAULT_SALES_ANALYSIS_1))
            .andExpect(jsonPath("$.salesAnalysis2").value(DEFAULT_SALES_ANALYSIS_2))
            .andExpect(jsonPath("$.salesAnalysis3").value(DEFAULT_SALES_ANALYSIS_3))
            .andExpect(jsonPath("$.salesAnalysis4").value(DEFAULT_SALES_ANALYSIS_4))
            .andExpect(jsonPath("$.salesAnalysis5").value(DEFAULT_SALES_ANALYSIS_5))
            .andExpect(jsonPath("$.salesAnalysis6").value(DEFAULT_SALES_ANALYSIS_6))
            .andExpect(jsonPath("$.memo1").value(DEFAULT_MEMO_1))
            .andExpect(jsonPath("$.memo2").value(DEFAULT_MEMO_2))
            .andExpect(jsonPath("$.memo3").value(DEFAULT_MEMO_3))
            .andExpect(jsonPath("$.memo4").value(DEFAULT_MEMO_4))
            .andExpect(jsonPath("$.memo5").value(DEFAULT_MEMO_5))
            .andExpect(jsonPath("$.memo6").value(DEFAULT_MEMO_6))
            .andExpect(jsonPath("$.stockAnalysis01").value(DEFAULT_STOCK_ANALYSIS_01))
            .andExpect(jsonPath("$.stockAnalysis02").value(DEFAULT_STOCK_ANALYSIS_02))
            .andExpect(jsonPath("$.stockAnalysis03").value(DEFAULT_STOCK_ANALYSIS_03))
            .andExpect(jsonPath("$.stockAnalysis04").value(DEFAULT_STOCK_ANALYSIS_04))
            .andExpect(jsonPath("$.stockAnalysis05").value(DEFAULT_STOCK_ANALYSIS_05))
            .andExpect(jsonPath("$.stockAnalysis06").value(DEFAULT_STOCK_ANALYSIS_06))
            .andExpect(jsonPath("$.stockAnalysis07").value(DEFAULT_STOCK_ANALYSIS_07))
            .andExpect(jsonPath("$.stockAnalysis08").value(DEFAULT_STOCK_ANALYSIS_08))
            .andExpect(jsonPath("$.stockAnalysis09").value(DEFAULT_STOCK_ANALYSIS_09))
            .andExpect(jsonPath("$.stockAnalysis10").value(DEFAULT_STOCK_ANALYSIS_10))
            .andExpect(jsonPath("$.deliveryCode").value(DEFAULT_DELIVERY_CODE))
            .andExpect(jsonPath("$.transactionCode").value(DEFAULT_TRANSACTION_CODE))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.salesOrderStatusCode").value(DEFAULT_SALES_ORDER_STATUS_CODE))
            .andExpect(jsonPath("$.despatchStatusID").value(DEFAULT_DESPATCH_STATUS_ID))
            .andExpect(jsonPath("$.division").value(DEFAULT_DIVISION))
            .andExpect(jsonPath("$.lineNumber").value(DEFAULT_LINE_NUMBER))
            .andExpect(jsonPath("$.despatchStatusCode").value(DEFAULT_DESPATCH_STATUS_CODE))
            .andExpect(jsonPath("$.quantityOrdered").value(DEFAULT_QUANTITY_ORDERED.doubleValue()))
            .andExpect(jsonPath("$.quantityOutstanding").value(DEFAULT_QUANTITY_OUTSTANDING.doubleValue()))
            .andExpect(jsonPath("$.quantityDespatched").value(DEFAULT_QUANTITY_DESPATCHED.doubleValue()))
            .andExpect(jsonPath("$.despatchDate").value(DEFAULT_DESPATCH_DATE.toString()))
            .andExpect(jsonPath("$.custRequiredDate").value(DEFAULT_CUST_REQUIRED_DATE.toString()))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.unitPriceinBase").value(DEFAULT_UNIT_PRICEIN_BASE.doubleValue()))
            .andExpect(jsonPath("$.lineDiscountPercent").value(DEFAULT_LINE_DISCOUNT_PERCENT.doubleValue()))
            .andExpect(jsonPath("$.marginPercent").value(DEFAULT_MARGIN_PERCENT.doubleValue()))
            .andExpect(jsonPath("$.lineTotal").value(DEFAULT_LINE_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.lineTotalinBase").value(DEFAULT_LINE_TOTALIN_BASE.doubleValue()))
            .andExpect(jsonPath("$.taxCode").value(DEFAULT_TAX_CODE))
            .andExpect(jsonPath("$.nominalCode").value(DEFAULT_NOMINAL_CODE))
            .andExpect(jsonPath("$.onHold").value(DEFAULT_ON_HOLD.booleanValue()))
            .andExpect(jsonPath("$.rCode").value(DEFAULT_R_CODE))
            .andExpect(jsonPath("$.standardMargin").value(DEFAULT_STANDARD_MARGIN.doubleValue()))
            .andExpect(jsonPath("$.deliveryAddress").value(DEFAULT_DELIVERY_ADDRESS))
            .andExpect(jsonPath("$.deliveryAddressDescription").value(DEFAULT_DELIVERY_ADDRESS_DESCRIPTION))
            .andExpect(jsonPath("$.deliveryCountryCode").value(DEFAULT_DELIVERY_COUNTRY_CODE))
            .andExpect(jsonPath("$.salesOrderStatus").value(DEFAULT_SALES_ORDER_STATUS));
    }

    @Test
    @Transactional
    public void getNonExistingSalesOrder() throws Exception {
        // Get the salesOrder
        restSalesOrderMockMvc.perform(get("/api/sales-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);

        int databaseSizeBeforeUpdate = salesOrderRepository.findAll().size();

        // Update the salesOrder
        SalesOrder updatedSalesOrder = salesOrderRepository.findById(salesOrder.getId()).get();
        // Disconnect from session so that the updates on updatedSalesOrder are not directly saved in db
        em.detach(updatedSalesOrder);
        updatedSalesOrder
            .salesOrderNumber(UPDATED_SALES_ORDER_NUMBER)
            .dateRaised(UPDATED_DATE_RAISED)
            .soSalesStatus(UPDATED_SO_SALES_STATUS)
            .secondSalesReference(UPDATED_SECOND_SALES_REFERENCE)
            .currencyCode(UPDATED_CURRENCY_CODE)
            .exchangeRate(UPDATED_EXCHANGE_RATE)
            .discountPercent(UPDATED_DISCOUNT_PERCENT)
            .contactName(UPDATED_CONTACT_NAME)
            .ourContact(UPDATED_OUR_CONTACT)
            .invoiceAddress(UPDATED_INVOICE_ADDRESS)
            .invoiceCountryCode(UPDATED_INVOICE_COUNTRY_CODE)
            .salesOrderTitle(UPDATED_SALES_ORDER_TITLE)
            .salesAnalysis1(UPDATED_SALES_ANALYSIS_1)
            .salesAnalysis2(UPDATED_SALES_ANALYSIS_2)
            .salesAnalysis3(UPDATED_SALES_ANALYSIS_3)
            .salesAnalysis4(UPDATED_SALES_ANALYSIS_4)
            .salesAnalysis5(UPDATED_SALES_ANALYSIS_5)
            .salesAnalysis6(UPDATED_SALES_ANALYSIS_6)
            .memo1(UPDATED_MEMO_1)
            .memo2(UPDATED_MEMO_2)
            .memo3(UPDATED_MEMO_3)
            .memo4(UPDATED_MEMO_4)
            .memo5(UPDATED_MEMO_5)
            .memo6(UPDATED_MEMO_6)
            .stockAnalysis01(UPDATED_STOCK_ANALYSIS_01)
            .stockAnalysis02(UPDATED_STOCK_ANALYSIS_02)
            .stockAnalysis03(UPDATED_STOCK_ANALYSIS_03)
            .stockAnalysis04(UPDATED_STOCK_ANALYSIS_04)
            .stockAnalysis05(UPDATED_STOCK_ANALYSIS_05)
            .stockAnalysis06(UPDATED_STOCK_ANALYSIS_06)
            .stockAnalysis07(UPDATED_STOCK_ANALYSIS_07)
            .stockAnalysis08(UPDATED_STOCK_ANALYSIS_08)
            .stockAnalysis09(UPDATED_STOCK_ANALYSIS_09)
            .stockAnalysis10(UPDATED_STOCK_ANALYSIS_10)
            .deliveryCode(UPDATED_DELIVERY_CODE)
            .transactionCode(UPDATED_TRANSACTION_CODE)
            .code(UPDATED_CODE)
            .salesOrderStatusCode(UPDATED_SALES_ORDER_STATUS_CODE)
            .despatchStatusID(UPDATED_DESPATCH_STATUS_ID)
            .division(UPDATED_DIVISION)
            .lineNumber(UPDATED_LINE_NUMBER)
            .despatchStatusCode(UPDATED_DESPATCH_STATUS_CODE)
            .quantityOrdered(UPDATED_QUANTITY_ORDERED)
            .quantityOutstanding(UPDATED_QUANTITY_OUTSTANDING)
            .quantityDespatched(UPDATED_QUANTITY_DESPATCHED)
            .despatchDate(UPDATED_DESPATCH_DATE)
            .custRequiredDate(UPDATED_CUST_REQUIRED_DATE)
            .unitPrice(UPDATED_UNIT_PRICE)
            .unitPriceinBase(UPDATED_UNIT_PRICEIN_BASE)
            .lineDiscountPercent(UPDATED_LINE_DISCOUNT_PERCENT)
            .marginPercent(UPDATED_MARGIN_PERCENT)
            .lineTotal(UPDATED_LINE_TOTAL)
            .lineTotalinBase(UPDATED_LINE_TOTALIN_BASE)
            .taxCode(UPDATED_TAX_CODE)
            .nominalCode(UPDATED_NOMINAL_CODE)
            .onHold(UPDATED_ON_HOLD)
            .rCode(UPDATED_R_CODE)
            .standardMargin(UPDATED_STANDARD_MARGIN)
            .deliveryAddress(UPDATED_DELIVERY_ADDRESS)
            .deliveryAddressDescription(UPDATED_DELIVERY_ADDRESS_DESCRIPTION)
            .deliveryCountryCode(UPDATED_DELIVERY_COUNTRY_CODE)
            .salesOrderStatus(UPDATED_SALES_ORDER_STATUS);
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(updatedSalesOrder);

        restSalesOrderMockMvc.perform(put("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isOk());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeUpdate);
        SalesOrder testSalesOrder = salesOrderList.get(salesOrderList.size() - 1);
        assertThat(testSalesOrder.getSalesOrderNumber()).isEqualTo(UPDATED_SALES_ORDER_NUMBER);
        assertThat(testSalesOrder.getDateRaised()).isEqualTo(UPDATED_DATE_RAISED);
        assertThat(testSalesOrder.getSoSalesStatus()).isEqualTo(UPDATED_SO_SALES_STATUS);
        assertThat(testSalesOrder.getSecondSalesReference()).isEqualTo(UPDATED_SECOND_SALES_REFERENCE);
        assertThat(testSalesOrder.getCurrencyCode()).isEqualTo(UPDATED_CURRENCY_CODE);
        assertThat(testSalesOrder.getExchangeRate()).isEqualTo(UPDATED_EXCHANGE_RATE);
        assertThat(testSalesOrder.getDiscountPercent()).isEqualTo(UPDATED_DISCOUNT_PERCENT);
        assertThat(testSalesOrder.getContactName()).isEqualTo(UPDATED_CONTACT_NAME);
        assertThat(testSalesOrder.getOurContact()).isEqualTo(UPDATED_OUR_CONTACT);
        assertThat(testSalesOrder.getInvoiceAddress()).isEqualTo(UPDATED_INVOICE_ADDRESS);
        assertThat(testSalesOrder.getInvoiceCountryCode()).isEqualTo(UPDATED_INVOICE_COUNTRY_CODE);
        assertThat(testSalesOrder.getSalesOrderTitle()).isEqualTo(UPDATED_SALES_ORDER_TITLE);
        assertThat(testSalesOrder.getSalesAnalysis1()).isEqualTo(UPDATED_SALES_ANALYSIS_1);
        assertThat(testSalesOrder.getSalesAnalysis2()).isEqualTo(UPDATED_SALES_ANALYSIS_2);
        assertThat(testSalesOrder.getSalesAnalysis3()).isEqualTo(UPDATED_SALES_ANALYSIS_3);
        assertThat(testSalesOrder.getSalesAnalysis4()).isEqualTo(UPDATED_SALES_ANALYSIS_4);
        assertThat(testSalesOrder.getSalesAnalysis5()).isEqualTo(UPDATED_SALES_ANALYSIS_5);
        assertThat(testSalesOrder.getSalesAnalysis6()).isEqualTo(UPDATED_SALES_ANALYSIS_6);
        assertThat(testSalesOrder.getMemo1()).isEqualTo(UPDATED_MEMO_1);
        assertThat(testSalesOrder.getMemo2()).isEqualTo(UPDATED_MEMO_2);
        assertThat(testSalesOrder.getMemo3()).isEqualTo(UPDATED_MEMO_3);
        assertThat(testSalesOrder.getMemo4()).isEqualTo(UPDATED_MEMO_4);
        assertThat(testSalesOrder.getMemo5()).isEqualTo(UPDATED_MEMO_5);
        assertThat(testSalesOrder.getMemo6()).isEqualTo(UPDATED_MEMO_6);
        assertThat(testSalesOrder.getStockAnalysis01()).isEqualTo(UPDATED_STOCK_ANALYSIS_01);
        assertThat(testSalesOrder.getStockAnalysis02()).isEqualTo(UPDATED_STOCK_ANALYSIS_02);
        assertThat(testSalesOrder.getStockAnalysis03()).isEqualTo(UPDATED_STOCK_ANALYSIS_03);
        assertThat(testSalesOrder.getStockAnalysis04()).isEqualTo(UPDATED_STOCK_ANALYSIS_04);
        assertThat(testSalesOrder.getStockAnalysis05()).isEqualTo(UPDATED_STOCK_ANALYSIS_05);
        assertThat(testSalesOrder.getStockAnalysis06()).isEqualTo(UPDATED_STOCK_ANALYSIS_06);
        assertThat(testSalesOrder.getStockAnalysis07()).isEqualTo(UPDATED_STOCK_ANALYSIS_07);
        assertThat(testSalesOrder.getStockAnalysis08()).isEqualTo(UPDATED_STOCK_ANALYSIS_08);
        assertThat(testSalesOrder.getStockAnalysis09()).isEqualTo(UPDATED_STOCK_ANALYSIS_09);
        assertThat(testSalesOrder.getStockAnalysis10()).isEqualTo(UPDATED_STOCK_ANALYSIS_10);
        assertThat(testSalesOrder.getDeliveryCode()).isEqualTo(UPDATED_DELIVERY_CODE);
        assertThat(testSalesOrder.getTransactionCode()).isEqualTo(UPDATED_TRANSACTION_CODE);
        assertThat(testSalesOrder.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testSalesOrder.getSalesOrderStatusCode()).isEqualTo(UPDATED_SALES_ORDER_STATUS_CODE);
        assertThat(testSalesOrder.getDespatchStatusID()).isEqualTo(UPDATED_DESPATCH_STATUS_ID);
        assertThat(testSalesOrder.getDivision()).isEqualTo(UPDATED_DIVISION);
        assertThat(testSalesOrder.getLineNumber()).isEqualTo(UPDATED_LINE_NUMBER);
        assertThat(testSalesOrder.getDespatchStatusCode()).isEqualTo(UPDATED_DESPATCH_STATUS_CODE);
        assertThat(testSalesOrder.getQuantityOrdered()).isEqualTo(UPDATED_QUANTITY_ORDERED);
        assertThat(testSalesOrder.getQuantityOutstanding()).isEqualTo(UPDATED_QUANTITY_OUTSTANDING);
        assertThat(testSalesOrder.getQuantityDespatched()).isEqualTo(UPDATED_QUANTITY_DESPATCHED);
        assertThat(testSalesOrder.getDespatchDate()).isEqualTo(UPDATED_DESPATCH_DATE);
        assertThat(testSalesOrder.getCustRequiredDate()).isEqualTo(UPDATED_CUST_REQUIRED_DATE);
        assertThat(testSalesOrder.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testSalesOrder.getUnitPriceinBase()).isEqualTo(UPDATED_UNIT_PRICEIN_BASE);
        assertThat(testSalesOrder.getLineDiscountPercent()).isEqualTo(UPDATED_LINE_DISCOUNT_PERCENT);
        assertThat(testSalesOrder.getMarginPercent()).isEqualTo(UPDATED_MARGIN_PERCENT);
        assertThat(testSalesOrder.getLineTotal()).isEqualTo(UPDATED_LINE_TOTAL);
        assertThat(testSalesOrder.getLineTotalinBase()).isEqualTo(UPDATED_LINE_TOTALIN_BASE);
        assertThat(testSalesOrder.getTaxCode()).isEqualTo(UPDATED_TAX_CODE);
        assertThat(testSalesOrder.getNominalCode()).isEqualTo(UPDATED_NOMINAL_CODE);
        assertThat(testSalesOrder.isOnHold()).isEqualTo(UPDATED_ON_HOLD);
        assertThat(testSalesOrder.getrCode()).isEqualTo(UPDATED_R_CODE);
        assertThat(testSalesOrder.getStandardMargin()).isEqualTo(UPDATED_STANDARD_MARGIN);
        assertThat(testSalesOrder.getDeliveryAddress()).isEqualTo(UPDATED_DELIVERY_ADDRESS);
        assertThat(testSalesOrder.getDeliveryAddressDescription()).isEqualTo(UPDATED_DELIVERY_ADDRESS_DESCRIPTION);
        assertThat(testSalesOrder.getDeliveryCountryCode()).isEqualTo(UPDATED_DELIVERY_COUNTRY_CODE);
        assertThat(testSalesOrder.getSalesOrderStatus()).isEqualTo(UPDATED_SALES_ORDER_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSalesOrder() throws Exception {
        int databaseSizeBeforeUpdate = salesOrderRepository.findAll().size();

        // Create the SalesOrder
        SalesOrderDTO salesOrderDTO = salesOrderMapper.toDto(salesOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalesOrderMockMvc.perform(put("/api/sales-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salesOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SalesOrder in the database
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSalesOrder() throws Exception {
        // Initialize the database
        salesOrderRepository.saveAndFlush(salesOrder);

        int databaseSizeBeforeDelete = salesOrderRepository.findAll().size();

        // Delete the salesOrder
        restSalesOrderMockMvc.perform(delete("/api/sales-orders/{id}", salesOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SalesOrder> salesOrderList = salesOrderRepository.findAll();
        assertThat(salesOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesOrder.class);
        SalesOrder salesOrder1 = new SalesOrder();
        salesOrder1.setId(1L);
        SalesOrder salesOrder2 = new SalesOrder();
        salesOrder2.setId(salesOrder1.getId());
        assertThat(salesOrder1).isEqualTo(salesOrder2);
        salesOrder2.setId(2L);
        assertThat(salesOrder1).isNotEqualTo(salesOrder2);
        salesOrder1.setId(null);
        assertThat(salesOrder1).isNotEqualTo(salesOrder2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalesOrderDTO.class);
        SalesOrderDTO salesOrderDTO1 = new SalesOrderDTO();
        salesOrderDTO1.setId(1L);
        SalesOrderDTO salesOrderDTO2 = new SalesOrderDTO();
        assertThat(salesOrderDTO1).isNotEqualTo(salesOrderDTO2);
        salesOrderDTO2.setId(salesOrderDTO1.getId());
        assertThat(salesOrderDTO1).isEqualTo(salesOrderDTO2);
        salesOrderDTO2.setId(2L);
        assertThat(salesOrderDTO1).isNotEqualTo(salesOrderDTO2);
        salesOrderDTO1.setId(null);
        assertThat(salesOrderDTO1).isNotEqualTo(salesOrderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(salesOrderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(salesOrderMapper.fromId(null)).isNull();
    }
}
