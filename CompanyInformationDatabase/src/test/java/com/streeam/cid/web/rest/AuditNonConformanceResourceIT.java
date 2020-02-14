package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.AuditNonConformance;
import com.streeam.cid.repository.AuditNonConformanceRepository;
import com.streeam.cid.service.AuditNonConformanceService;
import com.streeam.cid.service.dto.AuditNonConformanceDTO;
import com.streeam.cid.service.mapper.AuditNonConformanceMapper;
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

import com.streeam.cid.domain.enumeration.AuditNonconformaceFirstType;
import com.streeam.cid.domain.enumeration.AuditNonconformaceSecondType;
/**
 * Integration tests for the {@link AuditNonConformanceResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class AuditNonConformanceResourceIT {

    private static final AuditNonconformaceFirstType DEFAULT_AUDIT_NON_CONFORMANCE_FIRST_TYPE = AuditNonconformaceFirstType.INTERNAL;
    private static final AuditNonconformaceFirstType UPDATED_AUDIT_NON_CONFORMANCE_FIRST_TYPE = AuditNonconformaceFirstType.EXTERNAL;

    private static final AuditNonconformaceSecondType DEFAULT_AUDIT_NON_CONFORMANCE_SECOND_TYPE = AuditNonconformaceSecondType.MINOR_NON_CONFORMACE;
    private static final AuditNonconformaceSecondType UPDATED_AUDIT_NON_CONFORMANCE_SECOND_TYPE = AuditNonconformaceSecondType.OPORTUNITY_FORIMPROVEMENT;

    @Autowired
    private AuditNonConformanceRepository auditNonConformanceRepository;

    @Autowired
    private AuditNonConformanceMapper auditNonConformanceMapper;

    @Autowired
    private AuditNonConformanceService auditNonConformanceService;

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

    private MockMvc restAuditNonConformanceMockMvc;

    private AuditNonConformance auditNonConformance;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuditNonConformanceResource auditNonConformanceResource = new AuditNonConformanceResource(auditNonConformanceService);
        this.restAuditNonConformanceMockMvc = MockMvcBuilders.standaloneSetup(auditNonConformanceResource)
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
    public static AuditNonConformance createEntity(EntityManager em) {
        AuditNonConformance auditNonConformance = new AuditNonConformance()
            .auditNonConformanceFirstType(DEFAULT_AUDIT_NON_CONFORMANCE_FIRST_TYPE)
            .auditNonConformanceSecondType(DEFAULT_AUDIT_NON_CONFORMANCE_SECOND_TYPE);
        return auditNonConformance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuditNonConformance createUpdatedEntity(EntityManager em) {
        AuditNonConformance auditNonConformance = new AuditNonConformance()
            .auditNonConformanceFirstType(UPDATED_AUDIT_NON_CONFORMANCE_FIRST_TYPE)
            .auditNonConformanceSecondType(UPDATED_AUDIT_NON_CONFORMANCE_SECOND_TYPE);
        return auditNonConformance;
    }

    @BeforeEach
    public void initTest() {
        auditNonConformance = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuditNonConformance() throws Exception {
        int databaseSizeBeforeCreate = auditNonConformanceRepository.findAll().size();

        // Create the AuditNonConformance
        AuditNonConformanceDTO auditNonConformanceDTO = auditNonConformanceMapper.toDto(auditNonConformance);
        restAuditNonConformanceMockMvc.perform(post("/api/audit-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditNonConformanceDTO)))
            .andExpect(status().isCreated());

        // Validate the AuditNonConformance in the database
        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeCreate + 1);
        AuditNonConformance testAuditNonConformance = auditNonConformanceList.get(auditNonConformanceList.size() - 1);
        assertThat(testAuditNonConformance.getAuditNonConformanceFirstType()).isEqualTo(DEFAULT_AUDIT_NON_CONFORMANCE_FIRST_TYPE);
        assertThat(testAuditNonConformance.getAuditNonConformanceSecondType()).isEqualTo(DEFAULT_AUDIT_NON_CONFORMANCE_SECOND_TYPE);
    }

    @Test
    @Transactional
    public void createAuditNonConformanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auditNonConformanceRepository.findAll().size();

        // Create the AuditNonConformance with an existing ID
        auditNonConformance.setId(1L);
        AuditNonConformanceDTO auditNonConformanceDTO = auditNonConformanceMapper.toDto(auditNonConformance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuditNonConformanceMockMvc.perform(post("/api/audit-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AuditNonConformance in the database
        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAuditNonConformanceFirstTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = auditNonConformanceRepository.findAll().size();
        // set the field null
        auditNonConformance.setAuditNonConformanceFirstType(null);

        // Create the AuditNonConformance, which fails.
        AuditNonConformanceDTO auditNonConformanceDTO = auditNonConformanceMapper.toDto(auditNonConformance);

        restAuditNonConformanceMockMvc.perform(post("/api/audit-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAuditNonConformanceSecondTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = auditNonConformanceRepository.findAll().size();
        // set the field null
        auditNonConformance.setAuditNonConformanceSecondType(null);

        // Create the AuditNonConformance, which fails.
        AuditNonConformanceDTO auditNonConformanceDTO = auditNonConformanceMapper.toDto(auditNonConformance);

        restAuditNonConformanceMockMvc.perform(post("/api/audit-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAuditNonConformances() throws Exception {
        // Initialize the database
        auditNonConformanceRepository.saveAndFlush(auditNonConformance);

        // Get all the auditNonConformanceList
        restAuditNonConformanceMockMvc.perform(get("/api/audit-non-conformances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auditNonConformance.getId().intValue())))
            .andExpect(jsonPath("$.[*].auditNonConformanceFirstType").value(hasItem(DEFAULT_AUDIT_NON_CONFORMANCE_FIRST_TYPE.toString())))
            .andExpect(jsonPath("$.[*].auditNonConformanceSecondType").value(hasItem(DEFAULT_AUDIT_NON_CONFORMANCE_SECOND_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getAuditNonConformance() throws Exception {
        // Initialize the database
        auditNonConformanceRepository.saveAndFlush(auditNonConformance);

        // Get the auditNonConformance
        restAuditNonConformanceMockMvc.perform(get("/api/audit-non-conformances/{id}", auditNonConformance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(auditNonConformance.getId().intValue()))
            .andExpect(jsonPath("$.auditNonConformanceFirstType").value(DEFAULT_AUDIT_NON_CONFORMANCE_FIRST_TYPE.toString()))
            .andExpect(jsonPath("$.auditNonConformanceSecondType").value(DEFAULT_AUDIT_NON_CONFORMANCE_SECOND_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAuditNonConformance() throws Exception {
        // Get the auditNonConformance
        restAuditNonConformanceMockMvc.perform(get("/api/audit-non-conformances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuditNonConformance() throws Exception {
        // Initialize the database
        auditNonConformanceRepository.saveAndFlush(auditNonConformance);

        int databaseSizeBeforeUpdate = auditNonConformanceRepository.findAll().size();

        // Update the auditNonConformance
        AuditNonConformance updatedAuditNonConformance = auditNonConformanceRepository.findById(auditNonConformance.getId()).get();
        // Disconnect from session so that the updates on updatedAuditNonConformance are not directly saved in db
        em.detach(updatedAuditNonConformance);
        updatedAuditNonConformance
            .auditNonConformanceFirstType(UPDATED_AUDIT_NON_CONFORMANCE_FIRST_TYPE)
            .auditNonConformanceSecondType(UPDATED_AUDIT_NON_CONFORMANCE_SECOND_TYPE);
        AuditNonConformanceDTO auditNonConformanceDTO = auditNonConformanceMapper.toDto(updatedAuditNonConformance);

        restAuditNonConformanceMockMvc.perform(put("/api/audit-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditNonConformanceDTO)))
            .andExpect(status().isOk());

        // Validate the AuditNonConformance in the database
        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeUpdate);
        AuditNonConformance testAuditNonConformance = auditNonConformanceList.get(auditNonConformanceList.size() - 1);
        assertThat(testAuditNonConformance.getAuditNonConformanceFirstType()).isEqualTo(UPDATED_AUDIT_NON_CONFORMANCE_FIRST_TYPE);
        assertThat(testAuditNonConformance.getAuditNonConformanceSecondType()).isEqualTo(UPDATED_AUDIT_NON_CONFORMANCE_SECOND_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAuditNonConformance() throws Exception {
        int databaseSizeBeforeUpdate = auditNonConformanceRepository.findAll().size();

        // Create the AuditNonConformance
        AuditNonConformanceDTO auditNonConformanceDTO = auditNonConformanceMapper.toDto(auditNonConformance);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuditNonConformanceMockMvc.perform(put("/api/audit-non-conformances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditNonConformanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AuditNonConformance in the database
        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAuditNonConformance() throws Exception {
        // Initialize the database
        auditNonConformanceRepository.saveAndFlush(auditNonConformance);

        int databaseSizeBeforeDelete = auditNonConformanceRepository.findAll().size();

        // Delete the auditNonConformance
        restAuditNonConformanceMockMvc.perform(delete("/api/audit-non-conformances/{id}", auditNonConformance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AuditNonConformance> auditNonConformanceList = auditNonConformanceRepository.findAll();
        assertThat(auditNonConformanceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuditNonConformance.class);
        AuditNonConformance auditNonConformance1 = new AuditNonConformance();
        auditNonConformance1.setId(1L);
        AuditNonConformance auditNonConformance2 = new AuditNonConformance();
        auditNonConformance2.setId(auditNonConformance1.getId());
        assertThat(auditNonConformance1).isEqualTo(auditNonConformance2);
        auditNonConformance2.setId(2L);
        assertThat(auditNonConformance1).isNotEqualTo(auditNonConformance2);
        auditNonConformance1.setId(null);
        assertThat(auditNonConformance1).isNotEqualTo(auditNonConformance2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuditNonConformanceDTO.class);
        AuditNonConformanceDTO auditNonConformanceDTO1 = new AuditNonConformanceDTO();
        auditNonConformanceDTO1.setId(1L);
        AuditNonConformanceDTO auditNonConformanceDTO2 = new AuditNonConformanceDTO();
        assertThat(auditNonConformanceDTO1).isNotEqualTo(auditNonConformanceDTO2);
        auditNonConformanceDTO2.setId(auditNonConformanceDTO1.getId());
        assertThat(auditNonConformanceDTO1).isEqualTo(auditNonConformanceDTO2);
        auditNonConformanceDTO2.setId(2L);
        assertThat(auditNonConformanceDTO1).isNotEqualTo(auditNonConformanceDTO2);
        auditNonConformanceDTO1.setId(null);
        assertThat(auditNonConformanceDTO1).isNotEqualTo(auditNonConformanceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(auditNonConformanceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(auditNonConformanceMapper.fromId(null)).isNull();
    }
}
