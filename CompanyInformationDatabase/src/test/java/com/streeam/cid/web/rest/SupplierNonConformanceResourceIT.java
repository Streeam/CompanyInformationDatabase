package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.SupplierNonConformance;
import com.streeam.cid.repository.SupplierNonConformanceRepository;
import com.streeam.cid.service.SupplierNonConformanceService;
import com.streeam.cid.service.dto.SupplierNonConformanceDTO;
import com.streeam.cid.service.mapper.SupplierNonConformanceMapper;
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

import com.streeam.cid.domain.enumeration.NonconformanceAction;
import com.streeam.cid.domain.enumeration.SupplierNonconformaceType;
/**
 * Integration tests for the {@link SupplierNonConformanceResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class SupplierNonConformanceResourceIT {

    private static final NonconformanceAction DEFAULT_ACTION = NonconformanceAction.SCRAP;
    private static final NonconformanceAction UPDATED_ACTION = NonconformanceAction.REWORK;

    private static final Integer DEFAULT_LABOUR = 0;
    private static final Integer UPDATED_LABOUR = 1;

    private static final String DEFAULT_CONCESION_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_CONCESION_DETAILS = "BBBBBBBBBB";

    private static final Double DEFAULT_REJECTION_FEE = 0D;
    private static final Double UPDATED_REJECTION_FEE = 1D;

    private static final SupplierNonconformaceType DEFAULT_NON_CONFORMANCE_TYPE = SupplierNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE;
    private static final SupplierNonconformaceType UPDATED_NON_CONFORMANCE_TYPE = SupplierNonconformaceType.LATE_DELIVERY;

    @Autowired
    private SupplierNonConformanceRepository supplierNonConformanceRepository;

    @Autowired
    private SupplierNonConformanceMapper supplierNonConformanceMapper;

    @Autowired
    private SupplierNonConformanceService supplierNonConformanceService;

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

    private MockMvc restSupplierNonConformanceMockMvc;

    private SupplierNonConformance supplierNonConformance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SupplierNonConformanceResource supplierNonConformanceResource = new SupplierNonConformanceResource(supplierNonConformanceService);
        this.restSupplierNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(supplierNonConformanceResource)
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
    public static SupplierNonConformance createEntity(EntityManager em) {
        SupplierNonConformance supplierNonConformance = new SupplierNonConformance()
            .action(DEFAULT_ACTION)
            .labour(DEFAULT_LABOUR)
            .concesionDetails(DEFAULT_CONCESION_DETAILS)
            .rejectionFee(DEFAULT_REJECTION_FEE)
            .nonConformanceType(DEFAULT_NON_CONFORMANCE_TYPE);
        return supplierNonConformance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupplierNonConformance createUpdatedEntity(EntityManager em) {
        SupplierNonConformance supplierNonConformance = new SupplierNonConformance()
            .action(UPDATED_ACTION)
            .labour(UPDATED_LABOUR)
            .concesionDetails(UPDATED_CONCESION_DETAILS)
            .rejectionFee(UPDATED_REJECTION_FEE)
            .nonConformanceType(UPDATED_NON_CONFORMANCE_TYPE);
        return supplierNonConformance;
    }

    @BeforeEach
    public void initTest() {
        supplierNonConformance = createEntity(em);
    }

    @Test
    @Transactional
    public void createSupplierNonConformance() throws Exception {
        int databaseSizeBeforeCreate = supplierNonConformanceRepository.findAll().size();

        // Create the SupplierNonConformance
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(supplierNonConformance);
        restSupplierNonConformanceMockMvc.perform(post("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isCreated());

        // Validate the SupplierNonConformance in the database
        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeCreate + 1);
        SupplierNonConformance testSupplierNonConformance = supplierNonConformanceList.get(supplierNonConformanceList.size() - 1);
        assertThat(testSupplierNonConformance.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testSupplierNonConformance.getLabour()).isEqualTo(DEFAULT_LABOUR);
        assertThat(testSupplierNonConformance.getConcesionDetails()).isEqualTo(DEFAULT_CONCESION_DETAILS);
        assertThat(testSupplierNonConformance.getRejectionFee()).isEqualTo(DEFAULT_REJECTION_FEE);
        assertThat(testSupplierNonConformance.getNonConformanceType()).isEqualTo(DEFAULT_NON_CONFORMANCE_TYPE);
    }

    @Test
    @Transactional
    public void createSupplierNonConformanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supplierNonConformanceRepository.findAll().size();

        // Create the SupplierNonConformance with an existing ID
        supplierNonConformance.setId(1L);
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(supplierNonConformance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupplierNonConformanceMockMvc.perform(post("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplierNonConformance in the database
        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkActionIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierNonConformanceRepository.findAll().size();
        // set the field null
        supplierNonConformance.setAction(null);

        // Create the SupplierNonConformance, which fails.
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(supplierNonConformance);

        restSupplierNonConformanceMockMvc.perform(post("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRejectionFeeIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierNonConformanceRepository.findAll().size();
        // set the field null
        supplierNonConformance.setRejectionFee(null);

        // Create the SupplierNonConformance, which fails.
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(supplierNonConformance);

        restSupplierNonConformanceMockMvc.perform(post("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNonConformanceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = supplierNonConformanceRepository.findAll().size();
        // set the field null
        supplierNonConformance.setNonConformanceType(null);

        // Create the SupplierNonConformance, which fails.
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(supplierNonConformance);

        restSupplierNonConformanceMockMvc.perform(post("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSupplierNonConformances() throws Exception {
        // Initialize the database
        supplierNonConformanceRepository.saveAndFlush(supplierNonConformance);

        // Get all the supplierNonConformanceList
        restSupplierNonConformanceMockMvc.perform(get("/api/supplier-non-conformances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supplierNonConformance.getId().intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].labour").value(hasItem(DEFAULT_LABOUR)))
            .andExpect(jsonPath("$.[*].concesionDetails").value(hasItem(DEFAULT_CONCESION_DETAILS)))
            .andExpect(jsonPath("$.[*].rejectionFee").value(hasItem(DEFAULT_REJECTION_FEE.doubleValue())))
            .andExpect(jsonPath("$.[*].nonConformanceType").value(hasItem(DEFAULT_NON_CONFORMANCE_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getSupplierNonConformance() throws Exception {
        // Initialize the database
        supplierNonConformanceRepository.saveAndFlush(supplierNonConformance);

        // Get the supplierNonConformance
        restSupplierNonConformanceMockMvc.perform(get("/api/supplier-non-conformances/{id}", supplierNonConformance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(supplierNonConformance.getId().intValue()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.labour").value(DEFAULT_LABOUR))
            .andExpect(jsonPath("$.concesionDetails").value(DEFAULT_CONCESION_DETAILS))
            .andExpect(jsonPath("$.rejectionFee").value(DEFAULT_REJECTION_FEE.doubleValue()))
            .andExpect(jsonPath("$.nonConformanceType").value(DEFAULT_NON_CONFORMANCE_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSupplierNonConformance() throws Exception {
        // Get the supplierNonConformance
        restSupplierNonConformanceMockMvc.perform(get("/api/supplier-non-conformances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSupplierNonConformance() throws Exception {
        // Initialize the database
        supplierNonConformanceRepository.saveAndFlush(supplierNonConformance);

        int databaseSizeBeforeUpdate = supplierNonConformanceRepository.findAll().size();

        // Update the supplierNonConformance
        SupplierNonConformance updatedSupplierNonConformance = supplierNonConformanceRepository.findById(supplierNonConformance.getId()).get();
        // Disconnect from session so that the updates on updatedSupplierNonConformance are not directly saved in db
        em.detach(updatedSupplierNonConformance);
        updatedSupplierNonConformance
            .action(UPDATED_ACTION)
            .labour(UPDATED_LABOUR)
            .concesionDetails(UPDATED_CONCESION_DETAILS)
            .rejectionFee(UPDATED_REJECTION_FEE)
            .nonConformanceType(UPDATED_NON_CONFORMANCE_TYPE);
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(updatedSupplierNonConformance);

        restSupplierNonConformanceMockMvc.perform(put("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isOk());

        // Validate the SupplierNonConformance in the database
        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeUpdate);
        SupplierNonConformance testSupplierNonConformance = supplierNonConformanceList.get(supplierNonConformanceList.size() - 1);
        assertThat(testSupplierNonConformance.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testSupplierNonConformance.getLabour()).isEqualTo(UPDATED_LABOUR);
        assertThat(testSupplierNonConformance.getConcesionDetails()).isEqualTo(UPDATED_CONCESION_DETAILS);
        assertThat(testSupplierNonConformance.getRejectionFee()).isEqualTo(UPDATED_REJECTION_FEE);
        assertThat(testSupplierNonConformance.getNonConformanceType()).isEqualTo(UPDATED_NON_CONFORMANCE_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingSupplierNonConformance() throws Exception {
        int databaseSizeBeforeUpdate = supplierNonConformanceRepository.findAll().size();

        // Create the SupplierNonConformance
        SupplierNonConformanceDTO supplierNonConformanceDTO = supplierNonConformanceMapper.toDto(supplierNonConformance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupplierNonConformanceMockMvc.perform(put("/api/supplier-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(supplierNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SupplierNonConformance in the database
        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSupplierNonConformance() throws Exception {
        // Initialize the database
        supplierNonConformanceRepository.saveAndFlush(supplierNonConformance);

        int databaseSizeBeforeDelete = supplierNonConformanceRepository.findAll().size();

        // Delete the supplierNonConformance
        restSupplierNonConformanceMockMvc.perform(delete("/api/supplier-non-conformances/{id}", supplierNonConformance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupplierNonConformance> supplierNonConformanceList = supplierNonConformanceRepository.findAll();
        assertThat(supplierNonConformanceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplierNonConformance.class);
        SupplierNonConformance supplierNonConformance1 = new SupplierNonConformance();
        supplierNonConformance1.setId(1L);
        SupplierNonConformance supplierNonConformance2 = new SupplierNonConformance();
        supplierNonConformance2.setId(supplierNonConformance1.getId());
        assertThat(supplierNonConformance1).isEqualTo(supplierNonConformance2);
        supplierNonConformance2.setId(2L);
        assertThat(supplierNonConformance1).isNotEqualTo(supplierNonConformance2);
        supplierNonConformance1.setId(null);
        assertThat(supplierNonConformance1).isNotEqualTo(supplierNonConformance2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SupplierNonConformanceDTO.class);
        SupplierNonConformanceDTO supplierNonConformanceDTO1 = new SupplierNonConformanceDTO();
        supplierNonConformanceDTO1.setId(1L);
        SupplierNonConformanceDTO supplierNonConformanceDTO2 = new SupplierNonConformanceDTO();
        assertThat(supplierNonConformanceDTO1).isNotEqualTo(supplierNonConformanceDTO2);
        supplierNonConformanceDTO2.setId(supplierNonConformanceDTO1.getId());
        assertThat(supplierNonConformanceDTO1).isEqualTo(supplierNonConformanceDTO2);
        supplierNonConformanceDTO2.setId(2L);
        assertThat(supplierNonConformanceDTO1).isNotEqualTo(supplierNonConformanceDTO2);
        supplierNonConformanceDTO1.setId(null);
        assertThat(supplierNonConformanceDTO1).isNotEqualTo(supplierNonConformanceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(supplierNonConformanceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(supplierNonConformanceMapper.fromId(null)).isNull();
    }
}
