package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.NonConformanceDetails;
import com.streeam.cid.domain.Employee;
import com.streeam.cid.repository.NonConformanceDetailsRepository;
import com.streeam.cid.service.NonConformanceDetailsService;
import com.streeam.cid.service.dto.NonConformanceDetailsDTO;
import com.streeam.cid.service.mapper.NonConformanceDetailsMapper;
import com.streeam.cid.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.domain.enumeration.Priority;
import com.streeam.cid.domain.enumeration.Nonconformance;
/**
 * Integration tests for the {@link NonConformanceDetailsResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class NonConformanceDetailsResourceIT {

    private static final LocalDate DEFAULT_DEADLINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEADLINE = LocalDate.now(ZoneId.systemDefault());

    private static final Status DEFAULT_STATUS = Status.PENDING;
    private static final Status UPDATED_STATUS = Status.COMPLETE;

    private static final Integer DEFAULT_PROGRESS = 0;
    private static final Integer UPDATED_PROGRESS = 1;

    private static final Priority DEFAULT_PRIORITY = Priority.LOW;
    private static final Priority UPDATED_PRIORITY = Priority.MEDIUM;

    private static final Nonconformance DEFAULT_NONCONFORMANCE = Nonconformance.INTERNAL;
    private static final Nonconformance UPDATED_NONCONFORMANCE = Nonconformance.SUPPLIER;

    private static final Instant DEFAULT_CURRENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CURRENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private NonConformanceDetailsRepository nonConformanceDetailsRepository;

    @Mock
    private NonConformanceDetailsRepository nonConformanceDetailsRepositoryMock;

    @Autowired
    private NonConformanceDetailsMapper nonConformanceDetailsMapper;

    @Mock
    private NonConformanceDetailsService nonConformanceDetailsServiceMock;

    @Autowired
    private NonConformanceDetailsService nonConformanceDetailsService;

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

    private MockMvc restNonConformanceDetailsMockMvc;

    private NonConformanceDetails nonConformanceDetails;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NonConformanceDetailsResource nonConformanceDetailsResource = new NonConformanceDetailsResource(nonConformanceDetailsService);
        this.restNonConformanceDetailsMockMvc = MockMvcBuilders.standaloneSetup(nonConformanceDetailsResource)
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
    public static NonConformanceDetails createEntity(EntityManager em) {
        NonConformanceDetails nonConformanceDetails = new NonConformanceDetails()
            .deadline(DEFAULT_DEADLINE)
            .status(DEFAULT_STATUS)
            .progress(DEFAULT_PROGRESS)
            .priority(DEFAULT_PRIORITY)
            .nonconformance(DEFAULT_NONCONFORMANCE)
            .currentDate(DEFAULT_CURRENT_DATE);
        // Add required entity
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            employee = EmployeeResourceIT.createEntity(em);
            em.persist(employee);
            em.flush();
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        nonConformanceDetails.setEmployee(employee);
        return nonConformanceDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NonConformanceDetails createUpdatedEntity(EntityManager em) {
        NonConformanceDetails nonConformanceDetails = new NonConformanceDetails()
            .deadline(UPDATED_DEADLINE)
            .status(UPDATED_STATUS)
            .progress(UPDATED_PROGRESS)
            .priority(UPDATED_PRIORITY)
            .nonconformance(UPDATED_NONCONFORMANCE)
            .currentDate(UPDATED_CURRENT_DATE);
        // Add required entity
        Employee employee;
        if (TestUtil.findAll(em, Employee.class).isEmpty()) {
            employee = EmployeeResourceIT.createUpdatedEntity(em);
            em.persist(employee);
            em.flush();
        } else {
            employee = TestUtil.findAll(em, Employee.class).get(0);
        }
        nonConformanceDetails.setEmployee(employee);
        return nonConformanceDetails;
    }

    @BeforeEach
    public void initTest() {
        nonConformanceDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createNonConformanceDetails() throws Exception {
        int databaseSizeBeforeCreate = nonConformanceDetailsRepository.findAll().size();

        // Create the NonConformanceDetails
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);
        restNonConformanceDetailsMockMvc.perform(post("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the NonConformanceDetails in the database
        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        NonConformanceDetails testNonConformanceDetails = nonConformanceDetailsList.get(nonConformanceDetailsList.size() - 1);
        assertThat(testNonConformanceDetails.getDeadline()).isEqualTo(DEFAULT_DEADLINE);
        assertThat(testNonConformanceDetails.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testNonConformanceDetails.getProgress()).isEqualTo(DEFAULT_PROGRESS);
        assertThat(testNonConformanceDetails.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testNonConformanceDetails.getNonconformance()).isEqualTo(DEFAULT_NONCONFORMANCE);
        assertThat(testNonConformanceDetails.getCurrentDate()).isEqualTo(DEFAULT_CURRENT_DATE);
    }

    @Test
    @Transactional
    public void createNonConformanceDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nonConformanceDetailsRepository.findAll().size();

        // Create the NonConformanceDetails with an existing ID
        nonConformanceDetails.setId(1L);
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNonConformanceDetailsMockMvc.perform(post("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NonConformanceDetails in the database
        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDeadlineIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonConformanceDetailsRepository.findAll().size();
        // set the field null
        nonConformanceDetails.setDeadline(null);

        // Create the NonConformanceDetails, which fails.
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);

        restNonConformanceDetailsMockMvc.perform(post("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isBadRequest());

        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonConformanceDetailsRepository.findAll().size();
        // set the field null
        nonConformanceDetails.setStatus(null);

        // Create the NonConformanceDetails, which fails.
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);

        restNonConformanceDetailsMockMvc.perform(post("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isBadRequest());

        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProgressIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonConformanceDetailsRepository.findAll().size();
        // set the field null
        nonConformanceDetails.setProgress(null);

        // Create the NonConformanceDetails, which fails.
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);

        restNonConformanceDetailsMockMvc.perform(post("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isBadRequest());

        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriorityIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonConformanceDetailsRepository.findAll().size();
        // set the field null
        nonConformanceDetails.setPriority(null);

        // Create the NonConformanceDetails, which fails.
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);

        restNonConformanceDetailsMockMvc.perform(post("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isBadRequest());

        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNonConformanceDetails() throws Exception {
        // Initialize the database
        nonConformanceDetailsRepository.saveAndFlush(nonConformanceDetails);

        // Get all the nonConformanceDetailsList
        restNonConformanceDetailsMockMvc.perform(get("/api/non-conformance-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nonConformanceDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].deadline").value(hasItem(DEFAULT_DEADLINE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS)))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].nonconformance").value(hasItem(DEFAULT_NONCONFORMANCE.toString())))
            .andExpect(jsonPath("$.[*].currentDate").value(hasItem(DEFAULT_CURRENT_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllNonConformanceDetailsWithEagerRelationshipsIsEnabled() throws Exception {
        NonConformanceDetailsResource nonConformanceDetailsResource = new NonConformanceDetailsResource(nonConformanceDetailsServiceMock);
        when(nonConformanceDetailsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restNonConformanceDetailsMockMvc = MockMvcBuilders.standaloneSetup(nonConformanceDetailsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restNonConformanceDetailsMockMvc.perform(get("/api/non-conformance-details?eagerload=true"))
        .andExpect(status().isOk());

        verify(nonConformanceDetailsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllNonConformanceDetailsWithEagerRelationshipsIsNotEnabled() throws Exception {
        NonConformanceDetailsResource nonConformanceDetailsResource = new NonConformanceDetailsResource(nonConformanceDetailsServiceMock);
            when(nonConformanceDetailsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restNonConformanceDetailsMockMvc = MockMvcBuilders.standaloneSetup(nonConformanceDetailsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restNonConformanceDetailsMockMvc.perform(get("/api/non-conformance-details?eagerload=true"))
        .andExpect(status().isOk());

            verify(nonConformanceDetailsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getNonConformanceDetails() throws Exception {
        // Initialize the database
        nonConformanceDetailsRepository.saveAndFlush(nonConformanceDetails);

        // Get the nonConformanceDetails
        restNonConformanceDetailsMockMvc.perform(get("/api/non-conformance-details/{id}", nonConformanceDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nonConformanceDetails.getId().intValue()))
            .andExpect(jsonPath("$.deadline").value(DEFAULT_DEADLINE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.progress").value(DEFAULT_PROGRESS))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.nonconformance").value(DEFAULT_NONCONFORMANCE.toString()))
            .andExpect(jsonPath("$.currentDate").value(DEFAULT_CURRENT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNonConformanceDetails() throws Exception {
        // Get the nonConformanceDetails
        restNonConformanceDetailsMockMvc.perform(get("/api/non-conformance-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNonConformanceDetails() throws Exception {
        // Initialize the database
        nonConformanceDetailsRepository.saveAndFlush(nonConformanceDetails);

        int databaseSizeBeforeUpdate = nonConformanceDetailsRepository.findAll().size();

        // Update the nonConformanceDetails
        NonConformanceDetails updatedNonConformanceDetails = nonConformanceDetailsRepository.findById(nonConformanceDetails.getId()).get();
        // Disconnect from session so that the updates on updatedNonConformanceDetails are not directly saved in db
        em.detach(updatedNonConformanceDetails);
        updatedNonConformanceDetails
            .deadline(UPDATED_DEADLINE)
            .status(UPDATED_STATUS)
            .progress(UPDATED_PROGRESS)
            .priority(UPDATED_PRIORITY)
            .nonconformance(UPDATED_NONCONFORMANCE)
            .currentDate(UPDATED_CURRENT_DATE);
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(updatedNonConformanceDetails);

        restNonConformanceDetailsMockMvc.perform(put("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the NonConformanceDetails in the database
        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeUpdate);
        NonConformanceDetails testNonConformanceDetails = nonConformanceDetailsList.get(nonConformanceDetailsList.size() - 1);
        assertThat(testNonConformanceDetails.getDeadline()).isEqualTo(UPDATED_DEADLINE);
        assertThat(testNonConformanceDetails.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testNonConformanceDetails.getProgress()).isEqualTo(UPDATED_PROGRESS);
        assertThat(testNonConformanceDetails.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testNonConformanceDetails.getNonconformance()).isEqualTo(UPDATED_NONCONFORMANCE);
        assertThat(testNonConformanceDetails.getCurrentDate()).isEqualTo(UPDATED_CURRENT_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingNonConformanceDetails() throws Exception {
        int databaseSizeBeforeUpdate = nonConformanceDetailsRepository.findAll().size();

        // Create the NonConformanceDetails
        NonConformanceDetailsDTO nonConformanceDetailsDTO = nonConformanceDetailsMapper.toDto(nonConformanceDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNonConformanceDetailsMockMvc.perform(put("/api/non-conformance-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NonConformanceDetails in the database
        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNonConformanceDetails() throws Exception {
        // Initialize the database
        nonConformanceDetailsRepository.saveAndFlush(nonConformanceDetails);

        int databaseSizeBeforeDelete = nonConformanceDetailsRepository.findAll().size();

        // Delete the nonConformanceDetails
        restNonConformanceDetailsMockMvc.perform(delete("/api/non-conformance-details/{id}", nonConformanceDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NonConformanceDetails> nonConformanceDetailsList = nonConformanceDetailsRepository.findAll();
        assertThat(nonConformanceDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
