package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ExtraBoms;
import com.streeam.cid.repository.ExtraBomsRepository;
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
 * Integration tests for the {@link ExtraBomsResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ExtraBomsResourceIT {

    private static final String DEFAULT_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PART_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PART_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PART_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 0D;
    private static final Double UPDATED_PRICE = 1D;

    private static final Double DEFAULT_QUANTITY = 0D;
    private static final Double UPDATED_QUANTITY = 1D;

    private static final Nonconformance DEFAULT_NONCONFORMANCE_TYPE = Nonconformance.INTERNAL;
    private static final Nonconformance UPDATED_NONCONFORMANCE_TYPE = Nonconformance.SUPPLIER;

    private static final NonconformanceAction DEFAULT_NONCONFORMANCE_ACTION = NonconformanceAction.SCRAP;
    private static final NonconformanceAction UPDATED_NONCONFORMANCE_ACTION = NonconformanceAction.REWORK;

    private static final Long DEFAULT_INTERNAL_NONCONFORMANCE_ID = 0L;
    private static final Long UPDATED_INTERNAL_NONCONFORMANCE_ID = 1L;

    private static final Long DEFAULT_CUSTOMER_NON_CONFORMACE_ID = 1L;
    private static final Long UPDATED_CUSTOMER_NON_CONFORMACE_ID = 2L;

    @Autowired
    private ExtraBomsRepository extraBomsRepository;

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

    private MockMvc restExtraBomsMockMvc;

    private ExtraBoms extraBoms;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExtraBomsResource extraBomsResource = new ExtraBomsResource(extraBomsRepository);
        this.restExtraBomsMockMvc = MockMvcBuilders.standaloneSetup(extraBomsResource)
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
    public static ExtraBoms createEntity(EntityManager em) {
        ExtraBoms extraBoms = new ExtraBoms()
            .partNumber(DEFAULT_PART_NUMBER)
            .partDescription(DEFAULT_PART_DESCRIPTION)
            .price(DEFAULT_PRICE)
            .quantity(DEFAULT_QUANTITY)
            .nonconformanceType(DEFAULT_NONCONFORMANCE_TYPE)
            .nonconformanceAction(DEFAULT_NONCONFORMANCE_ACTION)
            .internalNonconformanceId(DEFAULT_INTERNAL_NONCONFORMANCE_ID)
            .customerNonConformaceId(DEFAULT_CUSTOMER_NON_CONFORMACE_ID);
        return extraBoms;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExtraBoms createUpdatedEntity(EntityManager em) {
        ExtraBoms extraBoms = new ExtraBoms()
            .partNumber(UPDATED_PART_NUMBER)
            .partDescription(UPDATED_PART_DESCRIPTION)
            .price(UPDATED_PRICE)
            .quantity(UPDATED_QUANTITY)
            .nonconformanceType(UPDATED_NONCONFORMANCE_TYPE)
            .nonconformanceAction(UPDATED_NONCONFORMANCE_ACTION)
            .internalNonconformanceId(UPDATED_INTERNAL_NONCONFORMANCE_ID)
            .customerNonConformaceId(UPDATED_CUSTOMER_NON_CONFORMACE_ID);
        return extraBoms;
    }

    @BeforeEach
    public void initTest() {
        extraBoms = createEntity(em);
    }

    @Test
    @Transactional
    public void createExtraBoms() throws Exception {
        int databaseSizeBeforeCreate = extraBomsRepository.findAll().size();

        // Create the ExtraBoms
        restExtraBomsMockMvc.perform(post("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isCreated());

        // Validate the ExtraBoms in the database
        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeCreate + 1);
        ExtraBoms testExtraBoms = extraBomsList.get(extraBomsList.size() - 1);
        assertThat(testExtraBoms.getPartNumber()).isEqualTo(DEFAULT_PART_NUMBER);
        assertThat(testExtraBoms.getPartDescription()).isEqualTo(DEFAULT_PART_DESCRIPTION);
        assertThat(testExtraBoms.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testExtraBoms.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testExtraBoms.getNonconformanceType()).isEqualTo(DEFAULT_NONCONFORMANCE_TYPE);
        assertThat(testExtraBoms.getNonconformanceAction()).isEqualTo(DEFAULT_NONCONFORMANCE_ACTION);
        assertThat(testExtraBoms.getInternalNonconformanceId()).isEqualTo(DEFAULT_INTERNAL_NONCONFORMANCE_ID);
        assertThat(testExtraBoms.getCustomerNonConformaceId()).isEqualTo(DEFAULT_CUSTOMER_NON_CONFORMACE_ID);
    }

    @Test
    @Transactional
    public void createExtraBomsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = extraBomsRepository.findAll().size();

        // Create the ExtraBoms with an existing ID
        extraBoms.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExtraBomsMockMvc.perform(post("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraBoms in the database
        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPartNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraBomsRepository.findAll().size();
        // set the field null
        extraBoms.setPartNumber(null);

        // Create the ExtraBoms, which fails.

        restExtraBomsMockMvc.perform(post("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isBadRequest());

        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraBomsRepository.findAll().size();
        // set the field null
        extraBoms.setPrice(null);

        // Create the ExtraBoms, which fails.

        restExtraBomsMockMvc.perform(post("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isBadRequest());

        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraBomsRepository.findAll().size();
        // set the field null
        extraBoms.setQuantity(null);

        // Create the ExtraBoms, which fails.

        restExtraBomsMockMvc.perform(post("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isBadRequest());

        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNonconformanceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = extraBomsRepository.findAll().size();
        // set the field null
        extraBoms.setNonconformanceType(null);

        // Create the ExtraBoms, which fails.

        restExtraBomsMockMvc.perform(post("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isBadRequest());

        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExtraBoms() throws Exception {
        // Initialize the database
        extraBomsRepository.saveAndFlush(extraBoms);

        // Get all the extraBomsList
        restExtraBomsMockMvc.perform(get("/api/extra-boms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(extraBoms.getId().intValue())))
            .andExpect(jsonPath("$.[*].partNumber").value(hasItem(DEFAULT_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].partDescription").value(hasItem(DEFAULT_PART_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].nonconformanceType").value(hasItem(DEFAULT_NONCONFORMANCE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].nonconformanceAction").value(hasItem(DEFAULT_NONCONFORMANCE_ACTION.toString())))
            .andExpect(jsonPath("$.[*].internalNonconformanceId").value(hasItem(DEFAULT_INTERNAL_NONCONFORMANCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].customerNonConformaceId").value(hasItem(DEFAULT_CUSTOMER_NON_CONFORMACE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getExtraBoms() throws Exception {
        // Initialize the database
        extraBomsRepository.saveAndFlush(extraBoms);

        // Get the extraBoms
        restExtraBomsMockMvc.perform(get("/api/extra-boms/{id}", extraBoms.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(extraBoms.getId().intValue()))
            .andExpect(jsonPath("$.partNumber").value(DEFAULT_PART_NUMBER))
            .andExpect(jsonPath("$.partDescription").value(DEFAULT_PART_DESCRIPTION))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.nonconformanceType").value(DEFAULT_NONCONFORMANCE_TYPE.toString()))
            .andExpect(jsonPath("$.nonconformanceAction").value(DEFAULT_NONCONFORMANCE_ACTION.toString()))
            .andExpect(jsonPath("$.internalNonconformanceId").value(DEFAULT_INTERNAL_NONCONFORMANCE_ID.intValue()))
            .andExpect(jsonPath("$.customerNonConformaceId").value(DEFAULT_CUSTOMER_NON_CONFORMACE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExtraBoms() throws Exception {
        // Get the extraBoms
        restExtraBomsMockMvc.perform(get("/api/extra-boms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExtraBoms() throws Exception {
        // Initialize the database
        extraBomsRepository.saveAndFlush(extraBoms);

        int databaseSizeBeforeUpdate = extraBomsRepository.findAll().size();

        // Update the extraBoms
        ExtraBoms updatedExtraBoms = extraBomsRepository.findById(extraBoms.getId()).get();
        // Disconnect from session so that the updates on updatedExtraBoms are not directly saved in db
        em.detach(updatedExtraBoms);
        updatedExtraBoms
            .partNumber(UPDATED_PART_NUMBER)
            .partDescription(UPDATED_PART_DESCRIPTION)
            .price(UPDATED_PRICE)
            .quantity(UPDATED_QUANTITY)
            .nonconformanceType(UPDATED_NONCONFORMANCE_TYPE)
            .nonconformanceAction(UPDATED_NONCONFORMANCE_ACTION)
            .internalNonconformanceId(UPDATED_INTERNAL_NONCONFORMANCE_ID)
            .customerNonConformaceId(UPDATED_CUSTOMER_NON_CONFORMACE_ID);

        restExtraBomsMockMvc.perform(put("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExtraBoms)))
            .andExpect(status().isOk());

        // Validate the ExtraBoms in the database
        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeUpdate);
        ExtraBoms testExtraBoms = extraBomsList.get(extraBomsList.size() - 1);
        assertThat(testExtraBoms.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testExtraBoms.getPartDescription()).isEqualTo(UPDATED_PART_DESCRIPTION);
        assertThat(testExtraBoms.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testExtraBoms.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testExtraBoms.getNonconformanceType()).isEqualTo(UPDATED_NONCONFORMANCE_TYPE);
        assertThat(testExtraBoms.getNonconformanceAction()).isEqualTo(UPDATED_NONCONFORMANCE_ACTION);
        assertThat(testExtraBoms.getInternalNonconformanceId()).isEqualTo(UPDATED_INTERNAL_NONCONFORMANCE_ID);
        assertThat(testExtraBoms.getCustomerNonConformaceId()).isEqualTo(UPDATED_CUSTOMER_NON_CONFORMACE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingExtraBoms() throws Exception {
        int databaseSizeBeforeUpdate = extraBomsRepository.findAll().size();

        // Create the ExtraBoms

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExtraBomsMockMvc.perform(put("/api/extra-boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(extraBoms)))
            .andExpect(status().isBadRequest());

        // Validate the ExtraBoms in the database
        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExtraBoms() throws Exception {
        // Initialize the database
        extraBomsRepository.saveAndFlush(extraBoms);

        int databaseSizeBeforeDelete = extraBomsRepository.findAll().size();

        // Delete the extraBoms
        restExtraBomsMockMvc.perform(delete("/api/extra-boms/{id}", extraBoms.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExtraBoms> extraBomsList = extraBomsRepository.findAll();
        assertThat(extraBomsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
