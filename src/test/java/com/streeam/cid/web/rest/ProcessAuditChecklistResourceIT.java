package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ProcessAuditChecklist;
import com.streeam.cid.repository.ProcessAuditChecklistRepository;
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

/**
 * Integration tests for the {@link ProcessAuditChecklistResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ProcessAuditChecklistResourceIT {

    private static final String DEFAULT_AUDIT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_AUDIT_QUESTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_COMPLIANT = false;
    private static final Boolean UPDATED_COMPLIANT = true;

    private static final Boolean DEFAULT_OFI = false;
    private static final Boolean UPDATED_OFI = true;

    private static final Boolean DEFAULT_MINOR_NC = false;
    private static final Boolean UPDATED_MINOR_NC = true;

    private static final Boolean DEFAULT_MAJOR_NC = false;
    private static final Boolean UPDATED_MAJOR_NC = true;

    private static final String DEFAULT_AUDIT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_AUDIT_ANSWER = "BBBBBBBBBB";

    private static final String DEFAULT_OPPORTUNITIES_FOR_IMPROVEMENT = "AAAAAAAAAA";
    private static final String UPDATED_OPPORTUNITIES_FOR_IMPROVEMENT = "BBBBBBBBBB";

    private static final Long DEFAULT_NON_CONFORMANCE_ID = 1L;
    private static final Long UPDATED_NON_CONFORMANCE_ID = 2L;

    @Autowired
    private ProcessAuditChecklistRepository processAuditChecklistRepository;

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

    private MockMvc restProcessAuditChecklistMockMvc;

    private ProcessAuditChecklist processAuditChecklist;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcessAuditChecklistResource processAuditChecklistResource = new ProcessAuditChecklistResource(processAuditChecklistRepository);
        this.restProcessAuditChecklistMockMvc = MockMvcBuilders.standaloneSetup(processAuditChecklistResource)
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
    public static ProcessAuditChecklist createEntity(EntityManager em) {
        ProcessAuditChecklist processAuditChecklist = new ProcessAuditChecklist()
            .auditQuestion(DEFAULT_AUDIT_QUESTION)
            .compliant(DEFAULT_COMPLIANT)
            .ofi(DEFAULT_OFI)
            .minorNC(DEFAULT_MINOR_NC)
            .majorNC(DEFAULT_MAJOR_NC)
            .auditAnswer(DEFAULT_AUDIT_ANSWER)
            .opportunitiesForImprovement(DEFAULT_OPPORTUNITIES_FOR_IMPROVEMENT)
            .nonConformanceId(DEFAULT_NON_CONFORMANCE_ID);
        return processAuditChecklist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcessAuditChecklist createUpdatedEntity(EntityManager em) {
        ProcessAuditChecklist processAuditChecklist = new ProcessAuditChecklist()
            .auditQuestion(UPDATED_AUDIT_QUESTION)
            .compliant(UPDATED_COMPLIANT)
            .ofi(UPDATED_OFI)
            .minorNC(UPDATED_MINOR_NC)
            .majorNC(UPDATED_MAJOR_NC)
            .auditAnswer(UPDATED_AUDIT_ANSWER)
            .opportunitiesForImprovement(UPDATED_OPPORTUNITIES_FOR_IMPROVEMENT)
            .nonConformanceId(UPDATED_NON_CONFORMANCE_ID);
        return processAuditChecklist;
    }

    @BeforeEach
    public void initTest() {
        processAuditChecklist = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcessAuditChecklist() throws Exception {
        int databaseSizeBeforeCreate = processAuditChecklistRepository.findAll().size();

        // Create the ProcessAuditChecklist
        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isCreated());

        // Validate the ProcessAuditChecklist in the database
        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeCreate + 1);
        ProcessAuditChecklist testProcessAuditChecklist = processAuditChecklistList.get(processAuditChecklistList.size() - 1);
        assertThat(testProcessAuditChecklist.getAuditQuestion()).isEqualTo(DEFAULT_AUDIT_QUESTION);
        assertThat(testProcessAuditChecklist.isCompliant()).isEqualTo(DEFAULT_COMPLIANT);
        assertThat(testProcessAuditChecklist.isOfi()).isEqualTo(DEFAULT_OFI);
        assertThat(testProcessAuditChecklist.isMinorNC()).isEqualTo(DEFAULT_MINOR_NC);
        assertThat(testProcessAuditChecklist.isMajorNC()).isEqualTo(DEFAULT_MAJOR_NC);
        assertThat(testProcessAuditChecklist.getAuditAnswer()).isEqualTo(DEFAULT_AUDIT_ANSWER);
        assertThat(testProcessAuditChecklist.getOpportunitiesForImprovement()).isEqualTo(DEFAULT_OPPORTUNITIES_FOR_IMPROVEMENT);
        assertThat(testProcessAuditChecklist.getNonConformanceId()).isEqualTo(DEFAULT_NON_CONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void createProcessAuditChecklistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = processAuditChecklistRepository.findAll().size();

        // Create the ProcessAuditChecklist with an existing ID
        processAuditChecklist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessAuditChecklist in the database
        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCompliantIsRequired() throws Exception {
        int databaseSizeBeforeTest = processAuditChecklistRepository.findAll().size();
        // set the field null
        processAuditChecklist.setCompliant(null);

        // Create the ProcessAuditChecklist, which fails.

        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOfiIsRequired() throws Exception {
        int databaseSizeBeforeTest = processAuditChecklistRepository.findAll().size();
        // set the field null
        processAuditChecklist.setOfi(null);

        // Create the ProcessAuditChecklist, which fails.

        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMinorNCIsRequired() throws Exception {
        int databaseSizeBeforeTest = processAuditChecklistRepository.findAll().size();
        // set the field null
        processAuditChecklist.setMinorNC(null);

        // Create the ProcessAuditChecklist, which fails.

        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMajorNCIsRequired() throws Exception {
        int databaseSizeBeforeTest = processAuditChecklistRepository.findAll().size();
        // set the field null
        processAuditChecklist.setMajorNC(null);

        // Create the ProcessAuditChecklist, which fails.

        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNonConformanceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = processAuditChecklistRepository.findAll().size();
        // set the field null
        processAuditChecklist.setNonConformanceId(null);

        // Create the ProcessAuditChecklist, which fails.

        restProcessAuditChecklistMockMvc.perform(post("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProcessAuditChecklists() throws Exception {
        // Initialize the database
        processAuditChecklistRepository.saveAndFlush(processAuditChecklist);

        // Get all the processAuditChecklistList
        restProcessAuditChecklistMockMvc.perform(get("/api/process-audit-checklists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(processAuditChecklist.getId().intValue())))
            .andExpect(jsonPath("$.[*].auditQuestion").value(hasItem(DEFAULT_AUDIT_QUESTION)))
            .andExpect(jsonPath("$.[*].compliant").value(hasItem(DEFAULT_COMPLIANT.booleanValue())))
            .andExpect(jsonPath("$.[*].ofi").value(hasItem(DEFAULT_OFI.booleanValue())))
            .andExpect(jsonPath("$.[*].minorNC").value(hasItem(DEFAULT_MINOR_NC.booleanValue())))
            .andExpect(jsonPath("$.[*].majorNC").value(hasItem(DEFAULT_MAJOR_NC.booleanValue())))
            .andExpect(jsonPath("$.[*].auditAnswer").value(hasItem(DEFAULT_AUDIT_ANSWER)))
            .andExpect(jsonPath("$.[*].opportunitiesForImprovement").value(hasItem(DEFAULT_OPPORTUNITIES_FOR_IMPROVEMENT)))
            .andExpect(jsonPath("$.[*].nonConformanceId").value(hasItem(DEFAULT_NON_CONFORMANCE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getProcessAuditChecklist() throws Exception {
        // Initialize the database
        processAuditChecklistRepository.saveAndFlush(processAuditChecklist);

        // Get the processAuditChecklist
        restProcessAuditChecklistMockMvc.perform(get("/api/process-audit-checklists/{id}", processAuditChecklist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(processAuditChecklist.getId().intValue()))
            .andExpect(jsonPath("$.auditQuestion").value(DEFAULT_AUDIT_QUESTION))
            .andExpect(jsonPath("$.compliant").value(DEFAULT_COMPLIANT.booleanValue()))
            .andExpect(jsonPath("$.ofi").value(DEFAULT_OFI.booleanValue()))
            .andExpect(jsonPath("$.minorNC").value(DEFAULT_MINOR_NC.booleanValue()))
            .andExpect(jsonPath("$.majorNC").value(DEFAULT_MAJOR_NC.booleanValue()))
            .andExpect(jsonPath("$.auditAnswer").value(DEFAULT_AUDIT_ANSWER))
            .andExpect(jsonPath("$.opportunitiesForImprovement").value(DEFAULT_OPPORTUNITIES_FOR_IMPROVEMENT))
            .andExpect(jsonPath("$.nonConformanceId").value(DEFAULT_NON_CONFORMANCE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProcessAuditChecklist() throws Exception {
        // Get the processAuditChecklist
        restProcessAuditChecklistMockMvc.perform(get("/api/process-audit-checklists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcessAuditChecklist() throws Exception {
        // Initialize the database
        processAuditChecklistRepository.saveAndFlush(processAuditChecklist);

        int databaseSizeBeforeUpdate = processAuditChecklistRepository.findAll().size();

        // Update the processAuditChecklist
        ProcessAuditChecklist updatedProcessAuditChecklist = processAuditChecklistRepository.findById(processAuditChecklist.getId()).get();
        // Disconnect from session so that the updates on updatedProcessAuditChecklist are not directly saved in db
        em.detach(updatedProcessAuditChecklist);
        updatedProcessAuditChecklist
            .auditQuestion(UPDATED_AUDIT_QUESTION)
            .compliant(UPDATED_COMPLIANT)
            .ofi(UPDATED_OFI)
            .minorNC(UPDATED_MINOR_NC)
            .majorNC(UPDATED_MAJOR_NC)
            .auditAnswer(UPDATED_AUDIT_ANSWER)
            .opportunitiesForImprovement(UPDATED_OPPORTUNITIES_FOR_IMPROVEMENT)
            .nonConformanceId(UPDATED_NON_CONFORMANCE_ID);

        restProcessAuditChecklistMockMvc.perform(put("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcessAuditChecklist)))
            .andExpect(status().isOk());

        // Validate the ProcessAuditChecklist in the database
        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeUpdate);
        ProcessAuditChecklist testProcessAuditChecklist = processAuditChecklistList.get(processAuditChecklistList.size() - 1);
        assertThat(testProcessAuditChecklist.getAuditQuestion()).isEqualTo(UPDATED_AUDIT_QUESTION);
        assertThat(testProcessAuditChecklist.isCompliant()).isEqualTo(UPDATED_COMPLIANT);
        assertThat(testProcessAuditChecklist.isOfi()).isEqualTo(UPDATED_OFI);
        assertThat(testProcessAuditChecklist.isMinorNC()).isEqualTo(UPDATED_MINOR_NC);
        assertThat(testProcessAuditChecklist.isMajorNC()).isEqualTo(UPDATED_MAJOR_NC);
        assertThat(testProcessAuditChecklist.getAuditAnswer()).isEqualTo(UPDATED_AUDIT_ANSWER);
        assertThat(testProcessAuditChecklist.getOpportunitiesForImprovement()).isEqualTo(UPDATED_OPPORTUNITIES_FOR_IMPROVEMENT);
        assertThat(testProcessAuditChecklist.getNonConformanceId()).isEqualTo(UPDATED_NON_CONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingProcessAuditChecklist() throws Exception {
        int databaseSizeBeforeUpdate = processAuditChecklistRepository.findAll().size();

        // Create the ProcessAuditChecklist

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcessAuditChecklistMockMvc.perform(put("/api/process-audit-checklists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processAuditChecklist)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessAuditChecklist in the database
        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcessAuditChecklist() throws Exception {
        // Initialize the database
        processAuditChecklistRepository.saveAndFlush(processAuditChecklist);

        int databaseSizeBeforeDelete = processAuditChecklistRepository.findAll().size();

        // Delete the processAuditChecklist
        restProcessAuditChecklistMockMvc.perform(delete("/api/process-audit-checklists/{id}", processAuditChecklist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProcessAuditChecklist> processAuditChecklistList = processAuditChecklistRepository.findAll();
        assertThat(processAuditChecklistList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
