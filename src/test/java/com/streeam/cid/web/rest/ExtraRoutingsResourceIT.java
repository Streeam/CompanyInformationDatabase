package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ExtraRoutings;
import com.streeam.cid.repository.ExtraRoutingsRepository;
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
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.streeam.cid.domain.enumeration.Nonconformance;
import com.streeam.cid.domain.enumeration.NonconformanceAction;
/**
 * Integration tests for the {@link ExtraRoutingsResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ExtraRoutingsResourceIT {

    private static final Double DEFAULT_OVERHEAD = 0D;
    private static final Double UPDATED_OVERHEAD = 1D;

    private static final String DEFAULT_RESOURCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RESOURCE_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_RUNTIME = 0;
    private static final Integer UPDATED_RUNTIME = 1;

    private static final Long DEFAULT_INTERNAL_NON_CONFORMANCE_ID = 0L;
    private static final Long UPDATED_INTERNAL_NON_CONFORMANCE_ID = 1L;

    private static final Nonconformance DEFAULT_NONCONFORMANCE_TYPE = Nonconformance.INTERNAL;
    private static final Nonconformance UPDATED_NONCONFORMANCE_TYPE = Nonconformance.SUPPLIER;

    private static final NonconformanceAction DEFAULT_NONCONFORMANCE_ACTION = NonconformanceAction.SCRAP;
    private static final NonconformanceAction UPDATED_NONCONFORMANCE_ACTION = NonconformanceAction.REWORK;

    private static final Long DEFAULT_CUSTOMER_NON_CONFORMACE_ID = 1L;
    private static final Long UPDATED_CUSTOMER_NON_CONFORMACE_ID = 2L;

    @Autowired
    private ExtraRoutingsRepository extraRoutingsRepository;

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

    private MockMvc restExtraRoutingsMockMvc;

    private ExtraRoutings extraRoutings;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExtraRoutingsResource extraRoutingsResource = new ExtraRoutingsResource(extraRoutingsRepository);
        this.restExtraRoutingsMockMvc = MockMvcBuilders.standaloneSetup(extraRoutingsResource)
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
    public static ExtraRoutings createEntity(EntityManager em) {
        ExtraRoutings extraRoutings = new ExtraRoutings()
            .overhead(DEFAULT_OVERHEAD)
            .resourceName(DEFAULT_RESOURCE_NAME)
            .runtime(DEFAULT_RUNTIME)
            .internalNonConformanceId(DEFAULT_INTERNAL_NON_CONFORMANCE_ID)
            .nonconformanceType(DEFAULT_NONCONFORMANCE_TYPE)
            .nonconformanceAction(DEFAULT_NONCONFORMANCE_ACTION)
            .customerNonConformaceId(DEFAULT_CUSTOMER_NON_CONFORMACE_ID);
        return extraRoutings;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtraRoutings createUpdatedEntity(EntityManager em) {
        ExtraRoutings extraRoutings = new ExtraRoutings()
            .overhead(UPDATED_OVERHEAD)
            .resourceName(UPDATED_RESOURCE_NAME)
            .runtime(UPDATED_RUNTIME)
            .internalNonConformanceId(UPDATED_INTERNAL_NON_CONFORMANCE_ID)
            .nonconformanceType(UPDATED_NONCONFORMANCE_TYPE)
            .nonconformanceAction(UPDATED_NONCONFORMANCE_ACTION)
            .customerNonConformaceId(UPDATED_CUSTOMER_NON_CONFORMACE_ID);
        return extraRoutings;
    }

    @BeforeEach
    public void initTest() {
        extraRoutings = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtraRoutings() throws Exception {
        int databaseSizeBeforeCreate = extraRoutingsRepository.findAll().size();

        // Create the ExtraRoutings
        restExtraRoutingsMockMvc.perform(post("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isCreated());

        // Validate the ExtraRoutings in the database
        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeCreate + 1);
        ExtraRoutings testExtraRoutings = extraRoutingsList.get(extraRoutingsList.size() - 1);
        assertThat(testExtraRoutings.getOverhead()).isEqualTo(DEFAULT_OVERHEAD);
        assertThat(testExtraRoutings.getResourceName()).isEqualTo(DEFAULT_RESOURCE_NAME);
        assertThat(testExtraRoutings.getRuntime()).isEqualTo(DEFAULT_RUNTIME);
        assertThat(testExtraRoutings.getInternalNonConformanceId()).isEqualTo(DEFAULT_INTERNAL_NON_CONFORMANCE_ID);
        assertThat(testExtraRoutings.getNonconformanceType()).isEqualTo(DEFAULT_NONCONFORMANCE_TYPE);
        assertThat(testExtraRoutings.getNonconformanceAction()).isEqualTo(DEFAULT_NONCONFORMANCE_ACTION);
        assertThat(testExtraRoutings.getCustomerNonConformaceId()).isEqualTo(DEFAULT_CUSTOMER_NON_CONFORMACE_ID);
    }

    @Test
    @Transactional
    public void createExtraRoutingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extraRoutingsRepository.findAll().size();

        // Create the ExtraRoutings with an existing ID
        extraRoutings.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtraRoutingsMockMvc.perform(post("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraRoutings in the database
        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkOverheadIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraRoutingsRepository.findAll().size();
        // set the field null
        extraRoutings.setOverhead(null);

        // Create the ExtraRoutings, which fails.

        restExtraRoutingsMockMvc.perform(post("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isBadRequest());

        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkResourceNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraRoutingsRepository.findAll().size();
        // set the field null
        extraRoutings.setResourceName(null);

        // Create the ExtraRoutings, which fails.

        restExtraRoutingsMockMvc.perform(post("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isBadRequest());

        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRuntimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraRoutingsRepository.findAll().size();
        // set the field null
        extraRoutings.setRuntime(null);

        // Create the ExtraRoutings, which fails.

        restExtraRoutingsMockMvc.perform(post("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isBadRequest());

        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNonconformanceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraRoutingsRepository.findAll().size();
        // set the field null
        extraRoutings.setNonconformanceType(null);

        // Create the ExtraRoutings, which fails.

        restExtraRoutingsMockMvc.perform(post("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isBadRequest());

        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExtraRoutings() throws Exception {
        // Initialize the database
        extraRoutingsRepository.saveAndFlush(extraRoutings);

        // Get all the extraRoutingsList
        restExtraRoutingsMockMvc.perform(get("/api/extra-routings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extraRoutings.getId().intValue())))
            .andExpect(jsonPath("$.[*].overhead").value(hasItem(DEFAULT_OVERHEAD.doubleValue())))
            .andExpect(jsonPath("$.[*].resourceName").value(hasItem(DEFAULT_RESOURCE_NAME)))
            .andExpect(jsonPath("$.[*].runtime").value(hasItem(DEFAULT_RUNTIME)))
            .andExpect(jsonPath("$.[*].internalNonConformanceId").value(hasItem(DEFAULT_INTERNAL_NON_CONFORMANCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].nonconformanceType").value(hasItem(DEFAULT_NONCONFORMANCE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].nonconformanceAction").value(hasItem(DEFAULT_NONCONFORMANCE_ACTION.toString())))
            .andExpect(jsonPath("$.[*].customerNonConformaceId").value(hasItem(DEFAULT_CUSTOMER_NON_CONFORMACE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getExtraRoutings() throws Exception {
        // Initialize the database
        extraRoutingsRepository.saveAndFlush(extraRoutings);

        // Get the extraRoutings
        restExtraRoutingsMockMvc.perform(get("/api/extra-routings/{id}", extraRoutings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(extraRoutings.getId().intValue()))
            .andExpect(jsonPath("$.overhead").value(DEFAULT_OVERHEAD.doubleValue()))
            .andExpect(jsonPath("$.resourceName").value(DEFAULT_RESOURCE_NAME))
            .andExpect(jsonPath("$.runtime").value(DEFAULT_RUNTIME))
            .andExpect(jsonPath("$.internalNonConformanceId").value(DEFAULT_INTERNAL_NON_CONFORMANCE_ID.intValue()))
            .andExpect(jsonPath("$.nonconformanceType").value(DEFAULT_NONCONFORMANCE_TYPE.toString()))
            .andExpect(jsonPath("$.nonconformanceAction").value(DEFAULT_NONCONFORMANCE_ACTION.toString()))
            .andExpect(jsonPath("$.customerNonConformaceId").value(DEFAULT_CUSTOMER_NON_CONFORMACE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExtraRoutings() throws Exception {
        // Get the extraRoutings
        restExtraRoutingsMockMvc.perform(get("/api/extra-routings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtraRoutings() throws Exception {
        // Initialize the database
        extraRoutingsRepository.saveAndFlush(extraRoutings);

        int databaseSizeBeforeUpdate = extraRoutingsRepository.findAll().size();

        // Update the extraRoutings
        ExtraRoutings updatedExtraRoutings = extraRoutingsRepository.findById(extraRoutings.getId()).get();
        // Disconnect from session so that the updates on updatedExtraRoutings are not directly saved in db
        em.detach(updatedExtraRoutings);
        updatedExtraRoutings
            .overhead(UPDATED_OVERHEAD)
            .resourceName(UPDATED_RESOURCE_NAME)
            .runtime(UPDATED_RUNTIME)
            .internalNonConformanceId(UPDATED_INTERNAL_NON_CONFORMANCE_ID)
            .nonconformanceType(UPDATED_NONCONFORMANCE_TYPE)
            .nonconformanceAction(UPDATED_NONCONFORMANCE_ACTION)
            .customerNonConformaceId(UPDATED_CUSTOMER_NON_CONFORMACE_ID);

        restExtraRoutingsMockMvc.perform(put("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtraRoutings)))
            .andExpect(status().isOk());

        // Validate the ExtraRoutings in the database
        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeUpdate);
        ExtraRoutings testExtraRoutings = extraRoutingsList.get(extraRoutingsList.size() - 1);
        assertThat(testExtraRoutings.getOverhead()).isEqualTo(UPDATED_OVERHEAD);
        assertThat(testExtraRoutings.getResourceName()).isEqualTo(UPDATED_RESOURCE_NAME);
        assertThat(testExtraRoutings.getRuntime()).isEqualTo(UPDATED_RUNTIME);
        assertThat(testExtraRoutings.getInternalNonConformanceId()).isEqualTo(UPDATED_INTERNAL_NON_CONFORMANCE_ID);
        assertThat(testExtraRoutings.getNonconformanceType()).isEqualTo(UPDATED_NONCONFORMANCE_TYPE);
        assertThat(testExtraRoutings.getNonconformanceAction()).isEqualTo(UPDATED_NONCONFORMANCE_ACTION);
        assertThat(testExtraRoutings.getCustomerNonConformaceId()).isEqualTo(UPDATED_CUSTOMER_NON_CONFORMACE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingExtraRoutings() throws Exception {
        int databaseSizeBeforeUpdate = extraRoutingsRepository.findAll().size();

        // Create the ExtraRoutings

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtraRoutingsMockMvc.perform(put("/api/extra-routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraRoutings)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraRoutings in the database
        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExtraRoutings() throws Exception {
        // Initialize the database
        extraRoutingsRepository.saveAndFlush(extraRoutings);

        int databaseSizeBeforeDelete = extraRoutingsRepository.findAll().size();

        // Delete the extraRoutings
        restExtraRoutingsMockMvc.perform(delete("/api/extra-routings/{id}", extraRoutings.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtraRoutings> extraRoutingsList = extraRoutingsRepository.findAll();
        assertThat(extraRoutingsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
