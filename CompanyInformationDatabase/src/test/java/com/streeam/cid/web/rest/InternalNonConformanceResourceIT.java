package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.InternalNonConformance;
import com.streeam.cid.domain.Site;
import com.streeam.cid.domain.Department;
import com.streeam.cid.repository.InternalNonConformanceRepository;
import com.streeam.cid.service.InternalNonConformanceService;
import com.streeam.cid.service.dto.InternalNonConformanceDTO;
import com.streeam.cid.service.mapper.InternalNonConformanceMapper;
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
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.streeam.cid.domain.enumeration.NonconformanceAction;
import com.streeam.cid.domain.enumeration.Status;
/**
 * Integration tests for the {@link InternalNonConformanceResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class InternalNonConformanceResourceIT {

    private static final NonconformanceAction DEFAULT_ACTION = NonconformanceAction.SCRAP;
    private static final NonconformanceAction UPDATED_ACTION = NonconformanceAction.REWORK;

    private static final LocalDate DEFAULT_CURENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CURENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_REJECTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REJECTION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REJECTION_REASON_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_REJECTION_REASON_DETAILS = "BBBBBBBBBB";

    private static final Double DEFAULT_LABOUR_RATE = 0D;
    private static final Double UPDATED_LABOUR_RATE = 1D;

    private static final Long DEFAULT_NONCONFORMANCE_DETAILS_ID = 1L;
    private static final Long UPDATED_NONCONFORMANCE_DETAILS_ID = 2L;

    private static final Status DEFAULT_STATUS = Status.PENDING;
    private static final Status UPDATED_STATUS = Status.COMPLETE;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private InternalNonConformanceRepository internalNonConformanceRepository;

    @Mock
    private InternalNonConformanceRepository internalNonConformanceRepositoryMock;

    @Autowired
    private InternalNonConformanceMapper internalNonConformanceMapper;

    @Mock
    private InternalNonConformanceService internalNonConformanceServiceMock;

    @Autowired
    private InternalNonConformanceService internalNonConformanceService;

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

    private MockMvc restInternalNonConformanceMockMvc;

    private InternalNonConformance internalNonConformance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InternalNonConformanceResource internalNonConformanceResource = new InternalNonConformanceResource(internalNonConformanceService);
        this.restInternalNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(internalNonConformanceResource)
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
    public static InternalNonConformance createEntity(EntityManager em) {
        InternalNonConformance internalNonConformance = new InternalNonConformance()
            .action(DEFAULT_ACTION)
            .curentDate(DEFAULT_CURENT_DATE)
            .rejectionDate(DEFAULT_REJECTION_DATE)
            .rejectionReasonDetails(DEFAULT_REJECTION_REASON_DETAILS)
            .labourRate(DEFAULT_LABOUR_RATE)
            .nonconformanceDetailsId(DEFAULT_NONCONFORMANCE_DETAILS_ID)
            .status(DEFAULT_STATUS)
            .quantity(DEFAULT_QUANTITY);
        // Add required entity
        Site site;
        if (TestUtil.findAll(em, Site.class).isEmpty()) {
            site = SiteResourceIT.createEntity(em);
            em.persist(site);
            em.flush();
        } else {
            site = TestUtil.findAll(em, Site.class).get(0);
        }
        internalNonConformance.getSites().add(site);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createEntity(em);
            em.persist(department);
            em.flush();
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        internalNonConformance.getDepartments().add(department);
        return internalNonConformance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InternalNonConformance createUpdatedEntity(EntityManager em) {
        InternalNonConformance internalNonConformance = new InternalNonConformance()
            .action(UPDATED_ACTION)
            .curentDate(UPDATED_CURENT_DATE)
            .rejectionDate(UPDATED_REJECTION_DATE)
            .rejectionReasonDetails(UPDATED_REJECTION_REASON_DETAILS)
            .labourRate(UPDATED_LABOUR_RATE)
            .nonconformanceDetailsId(UPDATED_NONCONFORMANCE_DETAILS_ID)
            .status(UPDATED_STATUS)
            .quantity(UPDATED_QUANTITY);
        // Add required entity
        Site site;
        if (TestUtil.findAll(em, Site.class).isEmpty()) {
            site = SiteResourceIT.createUpdatedEntity(em);
            em.persist(site);
            em.flush();
        } else {
            site = TestUtil.findAll(em, Site.class).get(0);
        }
        internalNonConformance.getSites().add(site);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createUpdatedEntity(em);
            em.persist(department);
            em.flush();
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        internalNonConformance.getDepartments().add(department);
        return internalNonConformance;
    }

    @BeforeEach
    public void initTest() {
        internalNonConformance = createEntity(em);
    }

    @Test
    @Transactional
    public void createInternalNonConformance() throws Exception {
        int databaseSizeBeforeCreate = internalNonConformanceRepository.findAll().size();

        // Create the InternalNonConformance
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(internalNonConformance);
        restInternalNonConformanceMockMvc.perform(post("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isCreated());

        // Validate the InternalNonConformance in the database
        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeCreate + 1);
        InternalNonConformance testInternalNonConformance = internalNonConformanceList.get(internalNonConformanceList.size() - 1);
        assertThat(testInternalNonConformance.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testInternalNonConformance.getCurentDate()).isEqualTo(DEFAULT_CURENT_DATE);
        assertThat(testInternalNonConformance.getRejectionDate()).isEqualTo(DEFAULT_REJECTION_DATE);
        assertThat(testInternalNonConformance.getRejectionReasonDetails()).isEqualTo(DEFAULT_REJECTION_REASON_DETAILS);
        assertThat(testInternalNonConformance.getLabourRate()).isEqualTo(DEFAULT_LABOUR_RATE);
        assertThat(testInternalNonConformance.getNonconformanceDetailsId()).isEqualTo(DEFAULT_NONCONFORMANCE_DETAILS_ID);
        assertThat(testInternalNonConformance.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testInternalNonConformance.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createInternalNonConformanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = internalNonConformanceRepository.findAll().size();

        // Create the InternalNonConformance with an existing ID
        internalNonConformance.setId(1L);
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(internalNonConformance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInternalNonConformanceMockMvc.perform(post("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InternalNonConformance in the database
        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkActionIsRequired() throws Exception {
        int databaseSizeBeforeTest = internalNonConformanceRepository.findAll().size();
        // set the field null
        internalNonConformance.setAction(null);

        // Create the InternalNonConformance, which fails.
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(internalNonConformance);

        restInternalNonConformanceMockMvc.perform(post("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLabourRateIsRequired() throws Exception {
        int databaseSizeBeforeTest = internalNonConformanceRepository.findAll().size();
        // set the field null
        internalNonConformance.setLabourRate(null);

        // Create the InternalNonConformance, which fails.
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(internalNonConformance);

        restInternalNonConformanceMockMvc.perform(post("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = internalNonConformanceRepository.findAll().size();
        // set the field null
        internalNonConformance.setStatus(null);

        // Create the InternalNonConformance, which fails.
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(internalNonConformance);

        restInternalNonConformanceMockMvc.perform(post("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInternalNonConformances() throws Exception {
        // Initialize the database
        internalNonConformanceRepository.saveAndFlush(internalNonConformance);

        // Get all the internalNonConformanceList
        restInternalNonConformanceMockMvc.perform(get("/api/internal-non-conformances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(internalNonConformance.getId().intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].curentDate").value(hasItem(DEFAULT_CURENT_DATE.toString())))
            .andExpect(jsonPath("$.[*].rejectionDate").value(hasItem(DEFAULT_REJECTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].rejectionReasonDetails").value(hasItem(DEFAULT_REJECTION_REASON_DETAILS)))
            .andExpect(jsonPath("$.[*].labourRate").value(hasItem(DEFAULT_LABOUR_RATE.doubleValue())))
            .andExpect(jsonPath("$.[*].nonconformanceDetailsId").value(hasItem(DEFAULT_NONCONFORMANCE_DETAILS_ID.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllInternalNonConformancesWithEagerRelationshipsIsEnabled() throws Exception {
        InternalNonConformanceResource internalNonConformanceResource = new InternalNonConformanceResource(internalNonConformanceServiceMock);
        when(internalNonConformanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restInternalNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(internalNonConformanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restInternalNonConformanceMockMvc.perform(get("/api/internal-non-conformances?eagerload=true"))
        .andExpect(status().isOk());

        verify(internalNonConformanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllInternalNonConformancesWithEagerRelationshipsIsNotEnabled() throws Exception {
        InternalNonConformanceResource internalNonConformanceResource = new InternalNonConformanceResource(internalNonConformanceServiceMock);
            when(internalNonConformanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restInternalNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(internalNonConformanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restInternalNonConformanceMockMvc.perform(get("/api/internal-non-conformances?eagerload=true"))
        .andExpect(status().isOk());

            verify(internalNonConformanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getInternalNonConformance() throws Exception {
        // Initialize the database
        internalNonConformanceRepository.saveAndFlush(internalNonConformance);

        // Get the internalNonConformance
        restInternalNonConformanceMockMvc.perform(get("/api/internal-non-conformances/{id}", internalNonConformance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(internalNonConformance.getId().intValue()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.curentDate").value(DEFAULT_CURENT_DATE.toString()))
            .andExpect(jsonPath("$.rejectionDate").value(DEFAULT_REJECTION_DATE.toString()))
            .andExpect(jsonPath("$.rejectionReasonDetails").value(DEFAULT_REJECTION_REASON_DETAILS))
            .andExpect(jsonPath("$.labourRate").value(DEFAULT_LABOUR_RATE.doubleValue()))
            .andExpect(jsonPath("$.nonconformanceDetailsId").value(DEFAULT_NONCONFORMANCE_DETAILS_ID.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingInternalNonConformance() throws Exception {
        // Get the internalNonConformance
        restInternalNonConformanceMockMvc.perform(get("/api/internal-non-conformances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInternalNonConformance() throws Exception {
        // Initialize the database
        internalNonConformanceRepository.saveAndFlush(internalNonConformance);

        int databaseSizeBeforeUpdate = internalNonConformanceRepository.findAll().size();

        // Update the internalNonConformance
        InternalNonConformance updatedInternalNonConformance = internalNonConformanceRepository.findById(internalNonConformance.getId()).get();
        // Disconnect from session so that the updates on updatedInternalNonConformance are not directly saved in db
        em.detach(updatedInternalNonConformance);
        updatedInternalNonConformance
            .action(UPDATED_ACTION)
            .curentDate(UPDATED_CURENT_DATE)
            .rejectionDate(UPDATED_REJECTION_DATE)
            .rejectionReasonDetails(UPDATED_REJECTION_REASON_DETAILS)
            .labourRate(UPDATED_LABOUR_RATE)
            .nonconformanceDetailsId(UPDATED_NONCONFORMANCE_DETAILS_ID)
            .status(UPDATED_STATUS)
            .quantity(UPDATED_QUANTITY);
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(updatedInternalNonConformance);

        restInternalNonConformanceMockMvc.perform(put("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isOk());

        // Validate the InternalNonConformance in the database
        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeUpdate);
        InternalNonConformance testInternalNonConformance = internalNonConformanceList.get(internalNonConformanceList.size() - 1);
        assertThat(testInternalNonConformance.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testInternalNonConformance.getCurentDate()).isEqualTo(UPDATED_CURENT_DATE);
        assertThat(testInternalNonConformance.getRejectionDate()).isEqualTo(UPDATED_REJECTION_DATE);
        assertThat(testInternalNonConformance.getRejectionReasonDetails()).isEqualTo(UPDATED_REJECTION_REASON_DETAILS);
        assertThat(testInternalNonConformance.getLabourRate()).isEqualTo(UPDATED_LABOUR_RATE);
        assertThat(testInternalNonConformance.getNonconformanceDetailsId()).isEqualTo(UPDATED_NONCONFORMANCE_DETAILS_ID);
        assertThat(testInternalNonConformance.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testInternalNonConformance.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingInternalNonConformance() throws Exception {
        int databaseSizeBeforeUpdate = internalNonConformanceRepository.findAll().size();

        // Create the InternalNonConformance
        InternalNonConformanceDTO internalNonConformanceDTO = internalNonConformanceMapper.toDto(internalNonConformance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInternalNonConformanceMockMvc.perform(put("/api/internal-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internalNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InternalNonConformance in the database
        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInternalNonConformance() throws Exception {
        // Initialize the database
        internalNonConformanceRepository.saveAndFlush(internalNonConformance);

        int databaseSizeBeforeDelete = internalNonConformanceRepository.findAll().size();

        // Delete the internalNonConformance
        restInternalNonConformanceMockMvc.perform(delete("/api/internal-non-conformances/{id}", internalNonConformance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InternalNonConformance> internalNonConformanceList = internalNonConformanceRepository.findAll();
        assertThat(internalNonConformanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
