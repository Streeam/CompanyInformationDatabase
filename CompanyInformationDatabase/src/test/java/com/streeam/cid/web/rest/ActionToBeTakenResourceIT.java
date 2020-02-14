package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ActionToBeTaken;
import com.streeam.cid.repository.ActionToBeTakenRepository;
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
 * Integration tests for the {@link ActionToBeTakenResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ActionToBeTakenResourceIT {

    private static final String DEFAULT_WHY_1_OCCURRANCE = "AAAAAAAAAA";
    private static final String UPDATED_WHY_1_OCCURRANCE = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_2_OCCURRANCE = "AAAAAAAAAA";
    private static final String UPDATED_WHY_2_OCCURRANCE = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_3_OCCURRANCE = "AAAAAAAAAA";
    private static final String UPDATED_WHY_3_OCCURRANCE = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_4_OCCURRANCE = "AAAAAAAAAA";
    private static final String UPDATED_WHY_4_OCCURRANCE = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_5_OCCURRANCE = "AAAAAAAAAA";
    private static final String UPDATED_WHY_5_OCCURRANCE = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_1_DETECTION = "AAAAAAAAAA";
    private static final String UPDATED_WHY_1_DETECTION = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_2_DETECTION = "AAAAAAAAAA";
    private static final String UPDATED_WHY_2_DETECTION = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_3_DETACTION = "AAAAAAAAAA";
    private static final String UPDATED_WHY_3_DETACTION = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_4_DETECTION = "AAAAAAAAAA";
    private static final String UPDATED_WHY_4_DETECTION = "BBBBBBBBBB";

    private static final String DEFAULT_WHY_5_DETECTION = "AAAAAAAAAA";
    private static final String UPDATED_WHY_5_DETECTION = "BBBBBBBBBB";

    private static final String DEFAULT_ROOT_CAUSE = "AAAAAAAAAA";
    private static final String UPDATED_ROOT_CAUSE = "BBBBBBBBBB";

    private static final String DEFAULT_PROBLEM = "AAAAAAAAAA";
    private static final String UPDATED_PROBLEM = "BBBBBBBBBB";

    private static final Long DEFAULT_NONCONFORMANCE_ID = 1L;
    private static final Long UPDATED_NONCONFORMANCE_ID = 2L;

    @Autowired
    private ActionToBeTakenRepository actionToBeTakenRepository;

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

    private MockMvc restActionToBeTakenMockMvc;

    private ActionToBeTaken actionToBeTaken;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ActionToBeTakenResource actionToBeTakenResource = new ActionToBeTakenResource(actionToBeTakenRepository);
        this.restActionToBeTakenMockMvc = MockMvcBuilders.standaloneSetup(actionToBeTakenResource)
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
    public static ActionToBeTaken createEntity(EntityManager em) {
        ActionToBeTaken actionToBeTaken = new ActionToBeTaken()
            .why1Occurrance(DEFAULT_WHY_1_OCCURRANCE)
            .why2Occurrance(DEFAULT_WHY_2_OCCURRANCE)
            .why3Occurrance(DEFAULT_WHY_3_OCCURRANCE)
            .why4Occurrance(DEFAULT_WHY_4_OCCURRANCE)
            .why5Occurrance(DEFAULT_WHY_5_OCCURRANCE)
            .why1Detection(DEFAULT_WHY_1_DETECTION)
            .why2Detection(DEFAULT_WHY_2_DETECTION)
            .why3Detaction(DEFAULT_WHY_3_DETACTION)
            .why4Detection(DEFAULT_WHY_4_DETECTION)
            .why5Detection(DEFAULT_WHY_5_DETECTION)
            .rootCause(DEFAULT_ROOT_CAUSE)
            .problem(DEFAULT_PROBLEM)
            .nonconformanceId(DEFAULT_NONCONFORMANCE_ID);
        return actionToBeTaken;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ActionToBeTaken createUpdatedEntity(EntityManager em) {
        ActionToBeTaken actionToBeTaken = new ActionToBeTaken()
            .why1Occurrance(UPDATED_WHY_1_OCCURRANCE)
            .why2Occurrance(UPDATED_WHY_2_OCCURRANCE)
            .why3Occurrance(UPDATED_WHY_3_OCCURRANCE)
            .why4Occurrance(UPDATED_WHY_4_OCCURRANCE)
            .why5Occurrance(UPDATED_WHY_5_OCCURRANCE)
            .why1Detection(UPDATED_WHY_1_DETECTION)
            .why2Detection(UPDATED_WHY_2_DETECTION)
            .why3Detaction(UPDATED_WHY_3_DETACTION)
            .why4Detection(UPDATED_WHY_4_DETECTION)
            .why5Detection(UPDATED_WHY_5_DETECTION)
            .rootCause(UPDATED_ROOT_CAUSE)
            .problem(UPDATED_PROBLEM)
            .nonconformanceId(UPDATED_NONCONFORMANCE_ID);
        return actionToBeTaken;
    }

    @BeforeEach
    public void initTest() {
        actionToBeTaken = createEntity(em);
    }

    @Test
    @Transactional
    public void createActionToBeTaken() throws Exception {
        int databaseSizeBeforeCreate = actionToBeTakenRepository.findAll().size();

        // Create the ActionToBeTaken
        restActionToBeTakenMockMvc.perform(post("/api/action-to-be-takens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actionToBeTaken)))
            .andExpect(status().isCreated());

        // Validate the ActionToBeTaken in the database
        List<ActionToBeTaken> actionToBeTakenList = actionToBeTakenRepository.findAll();
        assertThat(actionToBeTakenList).hasSize(databaseSizeBeforeCreate + 1);
        ActionToBeTaken testActionToBeTaken = actionToBeTakenList.get(actionToBeTakenList.size() - 1);
        assertThat(testActionToBeTaken.getWhy1Occurrance()).isEqualTo(DEFAULT_WHY_1_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy2Occurrance()).isEqualTo(DEFAULT_WHY_2_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy3Occurrance()).isEqualTo(DEFAULT_WHY_3_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy4Occurrance()).isEqualTo(DEFAULT_WHY_4_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy5Occurrance()).isEqualTo(DEFAULT_WHY_5_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy1Detection()).isEqualTo(DEFAULT_WHY_1_DETECTION);
        assertThat(testActionToBeTaken.getWhy2Detection()).isEqualTo(DEFAULT_WHY_2_DETECTION);
        assertThat(testActionToBeTaken.getWhy3Detaction()).isEqualTo(DEFAULT_WHY_3_DETACTION);
        assertThat(testActionToBeTaken.getWhy4Detection()).isEqualTo(DEFAULT_WHY_4_DETECTION);
        assertThat(testActionToBeTaken.getWhy5Detection()).isEqualTo(DEFAULT_WHY_5_DETECTION);
        assertThat(testActionToBeTaken.getRootCause()).isEqualTo(DEFAULT_ROOT_CAUSE);
        assertThat(testActionToBeTaken.getProblem()).isEqualTo(DEFAULT_PROBLEM);
        assertThat(testActionToBeTaken.getNonconformanceId()).isEqualTo(DEFAULT_NONCONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void createActionToBeTakenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = actionToBeTakenRepository.findAll().size();

        // Create the ActionToBeTaken with an existing ID
        actionToBeTaken.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActionToBeTakenMockMvc.perform(post("/api/action-to-be-takens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actionToBeTaken)))
            .andExpect(status().isBadRequest());

        // Validate the ActionToBeTaken in the database
        List<ActionToBeTaken> actionToBeTakenList = actionToBeTakenRepository.findAll();
        assertThat(actionToBeTakenList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNonconformanceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = actionToBeTakenRepository.findAll().size();
        // set the field null
        actionToBeTaken.setNonconformanceId(null);

        // Create the ActionToBeTaken, which fails.

        restActionToBeTakenMockMvc.perform(post("/api/action-to-be-takens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actionToBeTaken)))
            .andExpect(status().isBadRequest());

        List<ActionToBeTaken> actionToBeTakenList = actionToBeTakenRepository.findAll();
        assertThat(actionToBeTakenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllActionToBeTakens() throws Exception {
        // Initialize the database
        actionToBeTakenRepository.saveAndFlush(actionToBeTaken);

        // Get all the actionToBeTakenList
        restActionToBeTakenMockMvc.perform(get("/api/action-to-be-takens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(actionToBeTaken.getId().intValue())))
            .andExpect(jsonPath("$.[*].why1Occurrance").value(hasItem(DEFAULT_WHY_1_OCCURRANCE)))
            .andExpect(jsonPath("$.[*].why2Occurrance").value(hasItem(DEFAULT_WHY_2_OCCURRANCE)))
            .andExpect(jsonPath("$.[*].why3Occurrance").value(hasItem(DEFAULT_WHY_3_OCCURRANCE)))
            .andExpect(jsonPath("$.[*].why4Occurrance").value(hasItem(DEFAULT_WHY_4_OCCURRANCE)))
            .andExpect(jsonPath("$.[*].why5Occurrance").value(hasItem(DEFAULT_WHY_5_OCCURRANCE)))
            .andExpect(jsonPath("$.[*].why1Detection").value(hasItem(DEFAULT_WHY_1_DETECTION)))
            .andExpect(jsonPath("$.[*].why2Detection").value(hasItem(DEFAULT_WHY_2_DETECTION)))
            .andExpect(jsonPath("$.[*].why3Detaction").value(hasItem(DEFAULT_WHY_3_DETACTION)))
            .andExpect(jsonPath("$.[*].why4Detection").value(hasItem(DEFAULT_WHY_4_DETECTION)))
            .andExpect(jsonPath("$.[*].why5Detection").value(hasItem(DEFAULT_WHY_5_DETECTION)))
            .andExpect(jsonPath("$.[*].rootCause").value(hasItem(DEFAULT_ROOT_CAUSE)))
            .andExpect(jsonPath("$.[*].problem").value(hasItem(DEFAULT_PROBLEM)))
            .andExpect(jsonPath("$.[*].nonconformanceId").value(hasItem(DEFAULT_NONCONFORMANCE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getActionToBeTaken() throws Exception {
        // Initialize the database
        actionToBeTakenRepository.saveAndFlush(actionToBeTaken);

        // Get the actionToBeTaken
        restActionToBeTakenMockMvc.perform(get("/api/action-to-be-takens/{id}", actionToBeTaken.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(actionToBeTaken.getId().intValue()))
            .andExpect(jsonPath("$.why1Occurrance").value(DEFAULT_WHY_1_OCCURRANCE))
            .andExpect(jsonPath("$.why2Occurrance").value(DEFAULT_WHY_2_OCCURRANCE))
            .andExpect(jsonPath("$.why3Occurrance").value(DEFAULT_WHY_3_OCCURRANCE))
            .andExpect(jsonPath("$.why4Occurrance").value(DEFAULT_WHY_4_OCCURRANCE))
            .andExpect(jsonPath("$.why5Occurrance").value(DEFAULT_WHY_5_OCCURRANCE))
            .andExpect(jsonPath("$.why1Detection").value(DEFAULT_WHY_1_DETECTION))
            .andExpect(jsonPath("$.why2Detection").value(DEFAULT_WHY_2_DETECTION))
            .andExpect(jsonPath("$.why3Detaction").value(DEFAULT_WHY_3_DETACTION))
            .andExpect(jsonPath("$.why4Detection").value(DEFAULT_WHY_4_DETECTION))
            .andExpect(jsonPath("$.why5Detection").value(DEFAULT_WHY_5_DETECTION))
            .andExpect(jsonPath("$.rootCause").value(DEFAULT_ROOT_CAUSE))
            .andExpect(jsonPath("$.problem").value(DEFAULT_PROBLEM))
            .andExpect(jsonPath("$.nonconformanceId").value(DEFAULT_NONCONFORMANCE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingActionToBeTaken() throws Exception {
        // Get the actionToBeTaken
        restActionToBeTakenMockMvc.perform(get("/api/action-to-be-takens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActionToBeTaken() throws Exception {
        // Initialize the database
        actionToBeTakenRepository.saveAndFlush(actionToBeTaken);

        int databaseSizeBeforeUpdate = actionToBeTakenRepository.findAll().size();

        // Update the actionToBeTaken
        ActionToBeTaken updatedActionToBeTaken = actionToBeTakenRepository.findById(actionToBeTaken.getId()).get();
        // Disconnect from session so that the updates on updatedActionToBeTaken are not directly saved in db
        em.detach(updatedActionToBeTaken);
        updatedActionToBeTaken
            .why1Occurrance(UPDATED_WHY_1_OCCURRANCE)
            .why2Occurrance(UPDATED_WHY_2_OCCURRANCE)
            .why3Occurrance(UPDATED_WHY_3_OCCURRANCE)
            .why4Occurrance(UPDATED_WHY_4_OCCURRANCE)
            .why5Occurrance(UPDATED_WHY_5_OCCURRANCE)
            .why1Detection(UPDATED_WHY_1_DETECTION)
            .why2Detection(UPDATED_WHY_2_DETECTION)
            .why3Detaction(UPDATED_WHY_3_DETACTION)
            .why4Detection(UPDATED_WHY_4_DETECTION)
            .why5Detection(UPDATED_WHY_5_DETECTION)
            .rootCause(UPDATED_ROOT_CAUSE)
            .problem(UPDATED_PROBLEM)
            .nonconformanceId(UPDATED_NONCONFORMANCE_ID);

        restActionToBeTakenMockMvc.perform(put("/api/action-to-be-takens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedActionToBeTaken)))
            .andExpect(status().isOk());

        // Validate the ActionToBeTaken in the database
        List<ActionToBeTaken> actionToBeTakenList = actionToBeTakenRepository.findAll();
        assertThat(actionToBeTakenList).hasSize(databaseSizeBeforeUpdate);
        ActionToBeTaken testActionToBeTaken = actionToBeTakenList.get(actionToBeTakenList.size() - 1);
        assertThat(testActionToBeTaken.getWhy1Occurrance()).isEqualTo(UPDATED_WHY_1_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy2Occurrance()).isEqualTo(UPDATED_WHY_2_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy3Occurrance()).isEqualTo(UPDATED_WHY_3_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy4Occurrance()).isEqualTo(UPDATED_WHY_4_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy5Occurrance()).isEqualTo(UPDATED_WHY_5_OCCURRANCE);
        assertThat(testActionToBeTaken.getWhy1Detection()).isEqualTo(UPDATED_WHY_1_DETECTION);
        assertThat(testActionToBeTaken.getWhy2Detection()).isEqualTo(UPDATED_WHY_2_DETECTION);
        assertThat(testActionToBeTaken.getWhy3Detaction()).isEqualTo(UPDATED_WHY_3_DETACTION);
        assertThat(testActionToBeTaken.getWhy4Detection()).isEqualTo(UPDATED_WHY_4_DETECTION);
        assertThat(testActionToBeTaken.getWhy5Detection()).isEqualTo(UPDATED_WHY_5_DETECTION);
        assertThat(testActionToBeTaken.getRootCause()).isEqualTo(UPDATED_ROOT_CAUSE);
        assertThat(testActionToBeTaken.getProblem()).isEqualTo(UPDATED_PROBLEM);
        assertThat(testActionToBeTaken.getNonconformanceId()).isEqualTo(UPDATED_NONCONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingActionToBeTaken() throws Exception {
        int databaseSizeBeforeUpdate = actionToBeTakenRepository.findAll().size();

        // Create the ActionToBeTaken

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restActionToBeTakenMockMvc.perform(put("/api/action-to-be-takens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(actionToBeTaken)))
            .andExpect(status().isBadRequest());

        // Validate the ActionToBeTaken in the database
        List<ActionToBeTaken> actionToBeTakenList = actionToBeTakenRepository.findAll();
        assertThat(actionToBeTakenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteActionToBeTaken() throws Exception {
        // Initialize the database
        actionToBeTakenRepository.saveAndFlush(actionToBeTaken);

        int databaseSizeBeforeDelete = actionToBeTakenRepository.findAll().size();

        // Delete the actionToBeTaken
        restActionToBeTakenMockMvc.perform(delete("/api/action-to-be-takens/{id}", actionToBeTaken.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ActionToBeTaken> actionToBeTakenList = actionToBeTakenRepository.findAll();
        assertThat(actionToBeTakenList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
