package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Amendment;
import com.streeam.cid.repository.AmendmentRepository;
import com.streeam.cid.service.AmendmentService;
import com.streeam.cid.service.dto.AmendmentDTO;
import com.streeam.cid.service.mapper.AmendmentMapper;
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

import com.streeam.cid.domain.enumeration.AmendmentStatus;
import com.streeam.cid.domain.enumeration.Priority;
/**
 * Integration tests for the {@link AmendmentResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class AmendmentResourceIT {

    private static final AmendmentStatus DEFAULT_STATUS = AmendmentStatus.CHANGE_REQUEST_SUBMITED;
    private static final AmendmentStatus UPDATED_STATUS = AmendmentStatus.ANALYSE_CHANGE_REQUEST;

    private static final LocalDate DEFAULT_DEADLINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEADLINE = LocalDate.now(ZoneId.systemDefault());

    private static final Priority DEFAULT_PRIORITY = Priority.LOW;
    private static final Priority UPDATED_PRIORITY = Priority.MEDIUM;

    private static final LocalDate DEFAULT_PROPOSED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PROPOSED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CURRENT_CONDITION = "AAAAAAAAAA";
    private static final String UPDATED_CURRENT_CONDITION = "BBBBBBBBBB";

    private static final String DEFAULT_PROPOSE_AMENDMENT = "AAAAAAAAAA";
    private static final String UPDATED_PROPOSE_AMENDMENT = "BBBBBBBBBB";

    private static final String DEFAULT_REASON_FOR_CHANGE = "AAAAAAAAAA";
    private static final String UPDATED_REASON_FOR_CHANGE = "BBBBBBBBBB";

    private static final String DEFAULT_REJECTION_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REJECTION_REASON = "BBBBBBBBBB";

    private static final Integer DEFAULT_PROGRESS = 0;
    private static final Integer UPDATED_PROGRESS = 1;

    @Autowired
    private AmendmentRepository amendmentRepository;

    @Autowired
    private AmendmentMapper amendmentMapper;

    @Autowired
    private AmendmentService amendmentService;

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

    private MockMvc restAmendmentMockMvc;

    private Amendment amendment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AmendmentResource amendmentResource = new AmendmentResource(amendmentService);
        this.restAmendmentMockMvc = MockMvcBuilders.standaloneSetup(amendmentResource)
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
    public static Amendment createEntity(EntityManager em) {
        Amendment amendment = new Amendment()
            .status(DEFAULT_STATUS)
            .deadline(DEFAULT_DEADLINE)
            .priority(DEFAULT_PRIORITY)
            .proposedDate(DEFAULT_PROPOSED_DATE)
            .currentCondition(DEFAULT_CURRENT_CONDITION)
            .proposeAmendment(DEFAULT_PROPOSE_AMENDMENT)
            .reasonForChange(DEFAULT_REASON_FOR_CHANGE)
            .rejectionReason(DEFAULT_REJECTION_REASON)
            .progress(DEFAULT_PROGRESS);
        return amendment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Amendment createUpdatedEntity(EntityManager em) {
        Amendment amendment = new Amendment()
            .status(UPDATED_STATUS)
            .deadline(UPDATED_DEADLINE)
            .priority(UPDATED_PRIORITY)
            .proposedDate(UPDATED_PROPOSED_DATE)
            .currentCondition(UPDATED_CURRENT_CONDITION)
            .proposeAmendment(UPDATED_PROPOSE_AMENDMENT)
            .reasonForChange(UPDATED_REASON_FOR_CHANGE)
            .rejectionReason(UPDATED_REJECTION_REASON)
            .progress(UPDATED_PROGRESS);
        return amendment;
    }

    @BeforeEach
    public void initTest() {
        amendment = createEntity(em);
    }

    @Test
    @Transactional
    public void createAmendment() throws Exception {
        int databaseSizeBeforeCreate = amendmentRepository.findAll().size();

        // Create the Amendment
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);
        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isCreated());

        // Validate the Amendment in the database
        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeCreate + 1);
        Amendment testAmendment = amendmentList.get(amendmentList.size() - 1);
        assertThat(testAmendment.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAmendment.getDeadline()).isEqualTo(DEFAULT_DEADLINE);
        assertThat(testAmendment.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testAmendment.getProposedDate()).isEqualTo(DEFAULT_PROPOSED_DATE);
        assertThat(testAmendment.getCurrentCondition()).isEqualTo(DEFAULT_CURRENT_CONDITION);
        assertThat(testAmendment.getProposeAmendment()).isEqualTo(DEFAULT_PROPOSE_AMENDMENT);
        assertThat(testAmendment.getReasonForChange()).isEqualTo(DEFAULT_REASON_FOR_CHANGE);
        assertThat(testAmendment.getRejectionReason()).isEqualTo(DEFAULT_REJECTION_REASON);
        assertThat(testAmendment.getProgress()).isEqualTo(DEFAULT_PROGRESS);
    }

    @Test
    @Transactional
    public void createAmendmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = amendmentRepository.findAll().size();

        // Create the Amendment with an existing ID
        amendment.setId(1L);
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Amendment in the database
        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = amendmentRepository.findAll().size();
        // set the field null
        amendment.setStatus(null);

        // Create the Amendment, which fails.
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriorityIsRequired() throws Exception {
        int databaseSizeBeforeTest = amendmentRepository.findAll().size();
        // set the field null
        amendment.setPriority(null);

        // Create the Amendment, which fails.
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProposeAmendmentIsRequired() throws Exception {
        int databaseSizeBeforeTest = amendmentRepository.findAll().size();
        // set the field null
        amendment.setProposeAmendment(null);

        // Create the Amendment, which fails.
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReasonForChangeIsRequired() throws Exception {
        int databaseSizeBeforeTest = amendmentRepository.findAll().size();
        // set the field null
        amendment.setReasonForChange(null);

        // Create the Amendment, which fails.
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProgressIsRequired() throws Exception {
        int databaseSizeBeforeTest = amendmentRepository.findAll().size();
        // set the field null
        amendment.setProgress(null);

        // Create the Amendment, which fails.
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        restAmendmentMockMvc.perform(post("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAmendments() throws Exception {
        // Initialize the database
        amendmentRepository.saveAndFlush(amendment);

        // Get all the amendmentList
        restAmendmentMockMvc.perform(get("/api/amendments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(amendment.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].deadline").value(hasItem(DEFAULT_DEADLINE.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].proposedDate").value(hasItem(DEFAULT_PROPOSED_DATE.toString())))
            .andExpect(jsonPath("$.[*].currentCondition").value(hasItem(DEFAULT_CURRENT_CONDITION)))
            .andExpect(jsonPath("$.[*].proposeAmendment").value(hasItem(DEFAULT_PROPOSE_AMENDMENT)))
            .andExpect(jsonPath("$.[*].reasonForChange").value(hasItem(DEFAULT_REASON_FOR_CHANGE)))
            .andExpect(jsonPath("$.[*].rejectionReason").value(hasItem(DEFAULT_REJECTION_REASON)))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS)));
    }
    
    @Test
    @Transactional
    public void getAmendment() throws Exception {
        // Initialize the database
        amendmentRepository.saveAndFlush(amendment);

        // Get the amendment
        restAmendmentMockMvc.perform(get("/api/amendments/{id}", amendment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(amendment.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.deadline").value(DEFAULT_DEADLINE.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.proposedDate").value(DEFAULT_PROPOSED_DATE.toString()))
            .andExpect(jsonPath("$.currentCondition").value(DEFAULT_CURRENT_CONDITION))
            .andExpect(jsonPath("$.proposeAmendment").value(DEFAULT_PROPOSE_AMENDMENT))
            .andExpect(jsonPath("$.reasonForChange").value(DEFAULT_REASON_FOR_CHANGE))
            .andExpect(jsonPath("$.rejectionReason").value(DEFAULT_REJECTION_REASON))
            .andExpect(jsonPath("$.progress").value(DEFAULT_PROGRESS));
    }

    @Test
    @Transactional
    public void getNonExistingAmendment() throws Exception {
        // Get the amendment
        restAmendmentMockMvc.perform(get("/api/amendments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAmendment() throws Exception {
        // Initialize the database
        amendmentRepository.saveAndFlush(amendment);

        int databaseSizeBeforeUpdate = amendmentRepository.findAll().size();

        // Update the amendment
        Amendment updatedAmendment = amendmentRepository.findById(amendment.getId()).get();
        // Disconnect from session so that the updates on updatedAmendment are not directly saved in db
        em.detach(updatedAmendment);
        updatedAmendment
            .status(UPDATED_STATUS)
            .deadline(UPDATED_DEADLINE)
            .priority(UPDATED_PRIORITY)
            .proposedDate(UPDATED_PROPOSED_DATE)
            .currentCondition(UPDATED_CURRENT_CONDITION)
            .proposeAmendment(UPDATED_PROPOSE_AMENDMENT)
            .reasonForChange(UPDATED_REASON_FOR_CHANGE)
            .rejectionReason(UPDATED_REJECTION_REASON)
            .progress(UPDATED_PROGRESS);
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(updatedAmendment);

        restAmendmentMockMvc.perform(put("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isOk());

        // Validate the Amendment in the database
        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeUpdate);
        Amendment testAmendment = amendmentList.get(amendmentList.size() - 1);
        assertThat(testAmendment.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAmendment.getDeadline()).isEqualTo(UPDATED_DEADLINE);
        assertThat(testAmendment.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testAmendment.getProposedDate()).isEqualTo(UPDATED_PROPOSED_DATE);
        assertThat(testAmendment.getCurrentCondition()).isEqualTo(UPDATED_CURRENT_CONDITION);
        assertThat(testAmendment.getProposeAmendment()).isEqualTo(UPDATED_PROPOSE_AMENDMENT);
        assertThat(testAmendment.getReasonForChange()).isEqualTo(UPDATED_REASON_FOR_CHANGE);
        assertThat(testAmendment.getRejectionReason()).isEqualTo(UPDATED_REJECTION_REASON);
        assertThat(testAmendment.getProgress()).isEqualTo(UPDATED_PROGRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingAmendment() throws Exception {
        int databaseSizeBeforeUpdate = amendmentRepository.findAll().size();

        // Create the Amendment
        AmendmentDTO amendmentDTO = amendmentMapper.toDto(amendment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAmendmentMockMvc.perform(put("/api/amendments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(amendmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Amendment in the database
        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAmendment() throws Exception {
        // Initialize the database
        amendmentRepository.saveAndFlush(amendment);

        int databaseSizeBeforeDelete = amendmentRepository.findAll().size();

        // Delete the amendment
        restAmendmentMockMvc.perform(delete("/api/amendments/{id}", amendment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Amendment> amendmentList = amendmentRepository.findAll();
        assertThat(amendmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Amendment.class);
        Amendment amendment1 = new Amendment();
        amendment1.setId(1L);
        Amendment amendment2 = new Amendment();
        amendment2.setId(amendment1.getId());
        assertThat(amendment1).isEqualTo(amendment2);
        amendment2.setId(2L);
        assertThat(amendment1).isNotEqualTo(amendment2);
        amendment1.setId(null);
        assertThat(amendment1).isNotEqualTo(amendment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AmendmentDTO.class);
        AmendmentDTO amendmentDTO1 = new AmendmentDTO();
        amendmentDTO1.setId(1L);
        AmendmentDTO amendmentDTO2 = new AmendmentDTO();
        assertThat(amendmentDTO1).isNotEqualTo(amendmentDTO2);
        amendmentDTO2.setId(amendmentDTO1.getId());
        assertThat(amendmentDTO1).isEqualTo(amendmentDTO2);
        amendmentDTO2.setId(2L);
        assertThat(amendmentDTO1).isNotEqualTo(amendmentDTO2);
        amendmentDTO1.setId(null);
        assertThat(amendmentDTO1).isNotEqualTo(amendmentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(amendmentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(amendmentMapper.fromId(null)).isNull();
    }
}
