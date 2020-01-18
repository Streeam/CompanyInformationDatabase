package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.AfterSaleExpenses;
import com.streeam.cid.repository.AfterSaleExpensesRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AfterSaleExpensesResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class AfterSaleExpensesResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_COST = 0D;
    private static final Double UPDATED_COST = 1D;

    private static final Long DEFAULT_EMPLOYEE_ID = 1L;
    private static final Long UPDATED_EMPLOYEE_ID = 2L;

    private static final Long DEFAULT_CUSTOMER_NON_CONFORMANCE_ID = 1L;
    private static final Long UPDATED_CUSTOMER_NON_CONFORMANCE_ID = 2L;

    @Autowired
    private AfterSaleExpensesRepository afterSaleExpensesRepository;

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

    private MockMvc restAfterSaleExpensesMockMvc;

    private AfterSaleExpenses afterSaleExpenses;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AfterSaleExpensesResource afterSaleExpensesResource = new AfterSaleExpensesResource(afterSaleExpensesRepository);
        this.restAfterSaleExpensesMockMvc = MockMvcBuilders.standaloneSetup(afterSaleExpensesResource)
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
    public static AfterSaleExpenses createEntity(EntityManager em) {
        AfterSaleExpenses afterSaleExpenses = new AfterSaleExpenses()
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION)
            .cost(DEFAULT_COST)
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .customerNonConformanceId(DEFAULT_CUSTOMER_NON_CONFORMANCE_ID);
        return afterSaleExpenses;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AfterSaleExpenses createUpdatedEntity(EntityManager em) {
        AfterSaleExpenses afterSaleExpenses = new AfterSaleExpenses()
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION)
            .cost(UPDATED_COST)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .customerNonConformanceId(UPDATED_CUSTOMER_NON_CONFORMANCE_ID);
        return afterSaleExpenses;
    }

    @BeforeEach
    public void initTest() {
        afterSaleExpenses = createEntity(em);
    }

    @Test
    @Transactional
    public void createAfterSaleExpenses() throws Exception {
        int databaseSizeBeforeCreate = afterSaleExpensesRepository.findAll().size();

        // Create the AfterSaleExpenses
        restAfterSaleExpensesMockMvc.perform(post("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afterSaleExpenses)))
            .andExpect(status().isCreated());

        // Validate the AfterSaleExpenses in the database
        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeCreate + 1);
        AfterSaleExpenses testAfterSaleExpenses = afterSaleExpensesList.get(afterSaleExpensesList.size() - 1);
        assertThat(testAfterSaleExpenses.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testAfterSaleExpenses.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAfterSaleExpenses.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testAfterSaleExpenses.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testAfterSaleExpenses.getCustomerNonConformanceId()).isEqualTo(DEFAULT_CUSTOMER_NON_CONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void createAfterSaleExpensesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = afterSaleExpensesRepository.findAll().size();

        // Create the AfterSaleExpenses with an existing ID
        afterSaleExpenses.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAfterSaleExpensesMockMvc.perform(post("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afterSaleExpenses)))
            .andExpect(status().isBadRequest());

        // Validate the AfterSaleExpenses in the database
        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCostIsRequired() throws Exception {
        int databaseSizeBeforeTest = afterSaleExpensesRepository.findAll().size();
        // set the field null
        afterSaleExpenses.setCost(null);

        // Create the AfterSaleExpenses, which fails.

        restAfterSaleExpensesMockMvc.perform(post("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afterSaleExpenses)))
            .andExpect(status().isBadRequest());

        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmployeeIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = afterSaleExpensesRepository.findAll().size();
        // set the field null
        afterSaleExpenses.setEmployeeId(null);

        // Create the AfterSaleExpenses, which fails.

        restAfterSaleExpensesMockMvc.perform(post("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afterSaleExpenses)))
            .andExpect(status().isBadRequest());

        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCustomerNonConformanceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = afterSaleExpensesRepository.findAll().size();
        // set the field null
        afterSaleExpenses.setCustomerNonConformanceId(null);

        // Create the AfterSaleExpenses, which fails.

        restAfterSaleExpensesMockMvc.perform(post("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afterSaleExpenses)))
            .andExpect(status().isBadRequest());

        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAfterSaleExpenses() throws Exception {
        // Initialize the database
        afterSaleExpensesRepository.saveAndFlush(afterSaleExpenses);

        // Get all the afterSaleExpensesList
        restAfterSaleExpensesMockMvc.perform(get("/api/after-sale-expenses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(afterSaleExpenses.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID.intValue())))
            .andExpect(jsonPath("$.[*].customerNonConformanceId").value(hasItem(DEFAULT_CUSTOMER_NON_CONFORMANCE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getAfterSaleExpenses() throws Exception {
        // Initialize the database
        afterSaleExpensesRepository.saveAndFlush(afterSaleExpenses);

        // Get the afterSaleExpenses
        restAfterSaleExpensesMockMvc.perform(get("/api/after-sale-expenses/{id}", afterSaleExpenses.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(afterSaleExpenses.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.doubleValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID.intValue()))
            .andExpect(jsonPath("$.customerNonConformanceId").value(DEFAULT_CUSTOMER_NON_CONFORMANCE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAfterSaleExpenses() throws Exception {
        // Get the afterSaleExpenses
        restAfterSaleExpensesMockMvc.perform(get("/api/after-sale-expenses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAfterSaleExpenses() throws Exception {
        // Initialize the database
        afterSaleExpensesRepository.saveAndFlush(afterSaleExpenses);

        int databaseSizeBeforeUpdate = afterSaleExpensesRepository.findAll().size();

        // Update the afterSaleExpenses
        AfterSaleExpenses updatedAfterSaleExpenses = afterSaleExpensesRepository.findById(afterSaleExpenses.getId()).get();
        // Disconnect from session so that the updates on updatedAfterSaleExpenses are not directly saved in db
        em.detach(updatedAfterSaleExpenses);
        updatedAfterSaleExpenses
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION)
            .cost(UPDATED_COST)
            .employeeId(UPDATED_EMPLOYEE_ID)
            .customerNonConformanceId(UPDATED_CUSTOMER_NON_CONFORMANCE_ID);

        restAfterSaleExpensesMockMvc.perform(put("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAfterSaleExpenses)))
            .andExpect(status().isOk());

        // Validate the AfterSaleExpenses in the database
        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeUpdate);
        AfterSaleExpenses testAfterSaleExpenses = afterSaleExpensesList.get(afterSaleExpensesList.size() - 1);
        assertThat(testAfterSaleExpenses.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testAfterSaleExpenses.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAfterSaleExpenses.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testAfterSaleExpenses.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testAfterSaleExpenses.getCustomerNonConformanceId()).isEqualTo(UPDATED_CUSTOMER_NON_CONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingAfterSaleExpenses() throws Exception {
        int databaseSizeBeforeUpdate = afterSaleExpensesRepository.findAll().size();

        // Create the AfterSaleExpenses

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAfterSaleExpensesMockMvc.perform(put("/api/after-sale-expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(afterSaleExpenses)))
            .andExpect(status().isBadRequest());

        // Validate the AfterSaleExpenses in the database
        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAfterSaleExpenses() throws Exception {
        // Initialize the database
        afterSaleExpensesRepository.saveAndFlush(afterSaleExpenses);

        int databaseSizeBeforeDelete = afterSaleExpensesRepository.findAll().size();

        // Delete the afterSaleExpenses
        restAfterSaleExpensesMockMvc.perform(delete("/api/after-sale-expenses/{id}", afterSaleExpenses.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AfterSaleExpenses> afterSaleExpensesList = afterSaleExpensesRepository.findAll();
        assertThat(afterSaleExpensesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
