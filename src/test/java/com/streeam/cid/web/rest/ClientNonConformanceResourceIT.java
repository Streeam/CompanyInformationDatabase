package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ClientNonConformance;
import com.streeam.cid.repository.ClientNonConformanceRepository;
import com.streeam.cid.service.ClientNonConformanceService;
import com.streeam.cid.service.dto.ClientNonConformanceDTO;
import com.streeam.cid.service.mapper.ClientNonConformanceMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.streeam.cid.domain.enumeration.CustomerNonconformaceType;
import com.streeam.cid.domain.enumeration.Status;
/**
 * Integration tests for the {@link ClientNonConformanceResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ClientNonConformanceResourceIT {

    private static final CustomerNonconformaceType DEFAULT_NON_CONFORMANCE_TYPE = CustomerNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE;
    private static final CustomerNonconformaceType UPDATED_NON_CONFORMANCE_TYPE = CustomerNonconformaceType.LATE_DELIVERY;

    private static final Status DEFAULT_STATUS = Status.PENDING;
    private static final Status UPDATED_STATUS = Status.COMPLETE;

    private static final Long DEFAULT_NONCONFORMANCE_DETAILS_ID = 1L;
    private static final Long UPDATED_NONCONFORMANCE_DETAILS_ID = 2L;

    private static final String DEFAULT_REJECTION_REASON_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_REJECTION_REASON_DETAILS = "BBBBBBBBBB";

    private static final String DEFAULT_ACTION_TO_BE_TAKEN_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_ACTION_TO_BE_TAKEN_DETAILS = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_TERM_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_TERM_DETAILS = "BBBBBBBBBB";

    private static final String DEFAULT_LONG_TERM_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_LONG_TERM_DETAILS = "BBBBBBBBBB";

    private static final Instant DEFAULT_CURRENT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CURRENT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_REJECTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REJECTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_UNDER_WARRANTY = false;
    private static final Boolean UPDATED_UNDER_WARRANTY = true;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Double DEFAULT_LABOUR_RATE = 0D;
    private static final Double UPDATED_LABOUR_RATE = 1D;

    @Autowired
    private ClientNonConformanceRepository clientNonConformanceRepository;

    @Mock
    private ClientNonConformanceRepository clientNonConformanceRepositoryMock;

    @Autowired
    private ClientNonConformanceMapper clientNonConformanceMapper;

    @Mock
    private ClientNonConformanceService clientNonConformanceServiceMock;

    @Autowired
    private ClientNonConformanceService clientNonConformanceService;

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

    private MockMvc restClientNonConformanceMockMvc;

    private ClientNonConformance clientNonConformance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientNonConformanceResource clientNonConformanceResource = new ClientNonConformanceResource(clientNonConformanceService);
        this.restClientNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(clientNonConformanceResource)
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
    public static ClientNonConformance createEntity(EntityManager em) {
        ClientNonConformance clientNonConformance = new ClientNonConformance()
            .nonConformanceType(DEFAULT_NON_CONFORMANCE_TYPE)
            .status(DEFAULT_STATUS)
            .nonconformanceDetailsId(DEFAULT_NONCONFORMANCE_DETAILS_ID)
            .rejectionReasonDetails(DEFAULT_REJECTION_REASON_DETAILS)
            .actionToBeTakenDetails(DEFAULT_ACTION_TO_BE_TAKEN_DETAILS)
            .shortTermDetails(DEFAULT_SHORT_TERM_DETAILS)
            .longTermDetails(DEFAULT_LONG_TERM_DETAILS)
            .currentDate(DEFAULT_CURRENT_DATE)
            .rejectionDate(DEFAULT_REJECTION_DATE)
            .underWarranty(DEFAULT_UNDER_WARRANTY)
            .quantity(DEFAULT_QUANTITY)
            .labourRate(DEFAULT_LABOUR_RATE);
        return clientNonConformance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientNonConformance createUpdatedEntity(EntityManager em) {
        ClientNonConformance clientNonConformance = new ClientNonConformance()
            .nonConformanceType(UPDATED_NON_CONFORMANCE_TYPE)
            .status(UPDATED_STATUS)
            .nonconformanceDetailsId(UPDATED_NONCONFORMANCE_DETAILS_ID)
            .rejectionReasonDetails(UPDATED_REJECTION_REASON_DETAILS)
            .actionToBeTakenDetails(UPDATED_ACTION_TO_BE_TAKEN_DETAILS)
            .shortTermDetails(UPDATED_SHORT_TERM_DETAILS)
            .longTermDetails(UPDATED_LONG_TERM_DETAILS)
            .currentDate(UPDATED_CURRENT_DATE)
            .rejectionDate(UPDATED_REJECTION_DATE)
            .underWarranty(UPDATED_UNDER_WARRANTY)
            .quantity(UPDATED_QUANTITY)
            .labourRate(UPDATED_LABOUR_RATE);
        return clientNonConformance;
    }

    @BeforeEach
    public void initTest() {
        clientNonConformance = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientNonConformance() throws Exception {
        int databaseSizeBeforeCreate = clientNonConformanceRepository.findAll().size();

        // Create the ClientNonConformance
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);
        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isCreated());

        // Validate the ClientNonConformance in the database
        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeCreate + 1);
        ClientNonConformance testClientNonConformance = clientNonConformanceList.get(clientNonConformanceList.size() - 1);
        assertThat(testClientNonConformance.getNonConformanceType()).isEqualTo(DEFAULT_NON_CONFORMANCE_TYPE);
        assertThat(testClientNonConformance.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testClientNonConformance.getNonconformanceDetailsId()).isEqualTo(DEFAULT_NONCONFORMANCE_DETAILS_ID);
        assertThat(testClientNonConformance.getRejectionReasonDetails()).isEqualTo(DEFAULT_REJECTION_REASON_DETAILS);
        assertThat(testClientNonConformance.getActionToBeTakenDetails()).isEqualTo(DEFAULT_ACTION_TO_BE_TAKEN_DETAILS);
        assertThat(testClientNonConformance.getShortTermDetails()).isEqualTo(DEFAULT_SHORT_TERM_DETAILS);
        assertThat(testClientNonConformance.getLongTermDetails()).isEqualTo(DEFAULT_LONG_TERM_DETAILS);
        assertThat(testClientNonConformance.getCurrentDate()).isEqualTo(DEFAULT_CURRENT_DATE);
        assertThat(testClientNonConformance.getRejectionDate()).isEqualTo(DEFAULT_REJECTION_DATE);
        assertThat(testClientNonConformance.isUnderWarranty()).isEqualTo(DEFAULT_UNDER_WARRANTY);
        assertThat(testClientNonConformance.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testClientNonConformance.getLabourRate()).isEqualTo(DEFAULT_LABOUR_RATE);
    }

    @Test
    @Transactional
    public void createClientNonConformanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientNonConformanceRepository.findAll().size();

        // Create the ClientNonConformance with an existing ID
        clientNonConformance.setId(1L);
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClientNonConformance in the database
        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNonConformanceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientNonConformanceRepository.findAll().size();
        // set the field null
        clientNonConformance.setNonConformanceType(null);

        // Create the ClientNonConformance, which fails.
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientNonConformanceRepository.findAll().size();
        // set the field null
        clientNonConformance.setStatus(null);

        // Create the ClientNonConformance, which fails.
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNonconformanceDetailsIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientNonConformanceRepository.findAll().size();
        // set the field null
        clientNonConformance.setNonconformanceDetailsId(null);

        // Create the ClientNonConformance, which fails.
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCurrentDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientNonConformanceRepository.findAll().size();
        // set the field null
        clientNonConformance.setCurrentDate(null);

        // Create the ClientNonConformance, which fails.
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRejectionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientNonConformanceRepository.findAll().size();
        // set the field null
        clientNonConformance.setRejectionDate(null);

        // Create the ClientNonConformance, which fails.
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnderWarrantyIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientNonConformanceRepository.findAll().size();
        // set the field null
        clientNonConformance.setUnderWarranty(null);

        // Create the ClientNonConformance, which fails.
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        restClientNonConformanceMockMvc.perform(post("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClientNonConformances() throws Exception {
        // Initialize the database
        clientNonConformanceRepository.saveAndFlush(clientNonConformance);

        // Get all the clientNonConformanceList
        restClientNonConformanceMockMvc.perform(get("/api/client-non-conformances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientNonConformance.getId().intValue())))
            .andExpect(jsonPath("$.[*].nonConformanceType").value(hasItem(DEFAULT_NON_CONFORMANCE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].nonconformanceDetailsId").value(hasItem(DEFAULT_NONCONFORMANCE_DETAILS_ID.intValue())))
            .andExpect(jsonPath("$.[*].rejectionReasonDetails").value(hasItem(DEFAULT_REJECTION_REASON_DETAILS)))
            .andExpect(jsonPath("$.[*].actionToBeTakenDetails").value(hasItem(DEFAULT_ACTION_TO_BE_TAKEN_DETAILS)))
            .andExpect(jsonPath("$.[*].shortTermDetails").value(hasItem(DEFAULT_SHORT_TERM_DETAILS)))
            .andExpect(jsonPath("$.[*].longTermDetails").value(hasItem(DEFAULT_LONG_TERM_DETAILS)))
            .andExpect(jsonPath("$.[*].currentDate").value(hasItem(DEFAULT_CURRENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].rejectionDate").value(hasItem(DEFAULT_REJECTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].underWarranty").value(hasItem(DEFAULT_UNDER_WARRANTY.booleanValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].labourRate").value(hasItem(DEFAULT_LABOUR_RATE.doubleValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllClientNonConformancesWithEagerRelationshipsIsEnabled() throws Exception {
        ClientNonConformanceResource clientNonConformanceResource = new ClientNonConformanceResource(clientNonConformanceServiceMock);
        when(clientNonConformanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restClientNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(clientNonConformanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restClientNonConformanceMockMvc.perform(get("/api/client-non-conformances?eagerload=true"))
        .andExpect(status().isOk());

        verify(clientNonConformanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllClientNonConformancesWithEagerRelationshipsIsNotEnabled() throws Exception {
        ClientNonConformanceResource clientNonConformanceResource = new ClientNonConformanceResource(clientNonConformanceServiceMock);
            when(clientNonConformanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restClientNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(clientNonConformanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restClientNonConformanceMockMvc.perform(get("/api/client-non-conformances?eagerload=true"))
        .andExpect(status().isOk());

            verify(clientNonConformanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getClientNonConformance() throws Exception {
        // Initialize the database
        clientNonConformanceRepository.saveAndFlush(clientNonConformance);

        // Get the clientNonConformance
        restClientNonConformanceMockMvc.perform(get("/api/client-non-conformances/{id}", clientNonConformance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientNonConformance.getId().intValue()))
            .andExpect(jsonPath("$.nonConformanceType").value(DEFAULT_NON_CONFORMANCE_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.nonconformanceDetailsId").value(DEFAULT_NONCONFORMANCE_DETAILS_ID.intValue()))
            .andExpect(jsonPath("$.rejectionReasonDetails").value(DEFAULT_REJECTION_REASON_DETAILS))
            .andExpect(jsonPath("$.actionToBeTakenDetails").value(DEFAULT_ACTION_TO_BE_TAKEN_DETAILS))
            .andExpect(jsonPath("$.shortTermDetails").value(DEFAULT_SHORT_TERM_DETAILS))
            .andExpect(jsonPath("$.longTermDetails").value(DEFAULT_LONG_TERM_DETAILS))
            .andExpect(jsonPath("$.currentDate").value(DEFAULT_CURRENT_DATE.toString()))
            .andExpect(jsonPath("$.rejectionDate").value(DEFAULT_REJECTION_DATE.toString()))
            .andExpect(jsonPath("$.underWarranty").value(DEFAULT_UNDER_WARRANTY.booleanValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.labourRate").value(DEFAULT_LABOUR_RATE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingClientNonConformance() throws Exception {
        // Get the clientNonConformance
        restClientNonConformanceMockMvc.perform(get("/api/client-non-conformances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientNonConformance() throws Exception {
        // Initialize the database
        clientNonConformanceRepository.saveAndFlush(clientNonConformance);

        int databaseSizeBeforeUpdate = clientNonConformanceRepository.findAll().size();

        // Update the clientNonConformance
        ClientNonConformance updatedClientNonConformance = clientNonConformanceRepository.findById(clientNonConformance.getId()).get();
        // Disconnect from session so that the updates on updatedClientNonConformance are not directly saved in db
        em.detach(updatedClientNonConformance);
        updatedClientNonConformance
            .nonConformanceType(UPDATED_NON_CONFORMANCE_TYPE)
            .status(UPDATED_STATUS)
            .nonconformanceDetailsId(UPDATED_NONCONFORMANCE_DETAILS_ID)
            .rejectionReasonDetails(UPDATED_REJECTION_REASON_DETAILS)
            .actionToBeTakenDetails(UPDATED_ACTION_TO_BE_TAKEN_DETAILS)
            .shortTermDetails(UPDATED_SHORT_TERM_DETAILS)
            .longTermDetails(UPDATED_LONG_TERM_DETAILS)
            .currentDate(UPDATED_CURRENT_DATE)
            .rejectionDate(UPDATED_REJECTION_DATE)
            .underWarranty(UPDATED_UNDER_WARRANTY)
            .quantity(UPDATED_QUANTITY)
            .labourRate(UPDATED_LABOUR_RATE);
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(updatedClientNonConformance);

        restClientNonConformanceMockMvc.perform(put("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isOk());

        // Validate the ClientNonConformance in the database
        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeUpdate);
        ClientNonConformance testClientNonConformance = clientNonConformanceList.get(clientNonConformanceList.size() - 1);
        assertThat(testClientNonConformance.getNonConformanceType()).isEqualTo(UPDATED_NON_CONFORMANCE_TYPE);
        assertThat(testClientNonConformance.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testClientNonConformance.getNonconformanceDetailsId()).isEqualTo(UPDATED_NONCONFORMANCE_DETAILS_ID);
        assertThat(testClientNonConformance.getRejectionReasonDetails()).isEqualTo(UPDATED_REJECTION_REASON_DETAILS);
        assertThat(testClientNonConformance.getActionToBeTakenDetails()).isEqualTo(UPDATED_ACTION_TO_BE_TAKEN_DETAILS);
        assertThat(testClientNonConformance.getShortTermDetails()).isEqualTo(UPDATED_SHORT_TERM_DETAILS);
        assertThat(testClientNonConformance.getLongTermDetails()).isEqualTo(UPDATED_LONG_TERM_DETAILS);
        assertThat(testClientNonConformance.getCurrentDate()).isEqualTo(UPDATED_CURRENT_DATE);
        assertThat(testClientNonConformance.getRejectionDate()).isEqualTo(UPDATED_REJECTION_DATE);
        assertThat(testClientNonConformance.isUnderWarranty()).isEqualTo(UPDATED_UNDER_WARRANTY);
        assertThat(testClientNonConformance.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testClientNonConformance.getLabourRate()).isEqualTo(UPDATED_LABOUR_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingClientNonConformance() throws Exception {
        int databaseSizeBeforeUpdate = clientNonConformanceRepository.findAll().size();

        // Create the ClientNonConformance
        ClientNonConformanceDTO clientNonConformanceDTO = clientNonConformanceMapper.toDto(clientNonConformance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientNonConformanceMockMvc.perform(put("/api/client-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClientNonConformance in the database
        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClientNonConformance() throws Exception {
        // Initialize the database
        clientNonConformanceRepository.saveAndFlush(clientNonConformance);

        int databaseSizeBeforeDelete = clientNonConformanceRepository.findAll().size();

        // Delete the clientNonConformance
        restClientNonConformanceMockMvc.perform(delete("/api/client-non-conformances/{id}", clientNonConformance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClientNonConformance> clientNonConformanceList = clientNonConformanceRepository.findAll();
        assertThat(clientNonConformanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
