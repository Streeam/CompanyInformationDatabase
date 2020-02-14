package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.LongTermAction;
import com.streeam.cid.repository.LongTermActionRepository;
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
 * Integration tests for the {@link LongTermActionResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class LongTermActionResourceIT {

    private static final Long DEFAULT_NON_CONFORMANCE_ID = 1L;
    private static final Long UPDATED_NON_CONFORMANCE_ID = 2L;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LongTermActionRepository longTermActionRepository;

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

    private MockMvc restLongTermActionMockMvc;

    private LongTermAction longTermAction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LongTermActionResource longTermActionResource = new LongTermActionResource(longTermActionRepository);
        this.restLongTermActionMockMvc = MockMvcBuilders.standaloneSetup(longTermActionResource)
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
    public static LongTermAction createEntity(EntityManager em) {
        LongTermAction longTermAction = new LongTermAction()
            .nonConformanceId(DEFAULT_NON_CONFORMANCE_ID)
            .description(DEFAULT_DESCRIPTION);
        return longTermAction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LongTermAction createUpdatedEntity(EntityManager em) {
        LongTermAction longTermAction = new LongTermAction()
            .nonConformanceId(UPDATED_NON_CONFORMANCE_ID)
            .description(UPDATED_DESCRIPTION);
        return longTermAction;
    }

    @BeforeEach
    public void initTest() {
        longTermAction = createEntity(em);
    }

    @Test
    @Transactional
    public void createLongTermAction() throws Exception {
        int databaseSizeBeforeCreate = longTermActionRepository.findAll().size();

        // Create the LongTermAction
        restLongTermActionMockMvc.perform(post("/api/long-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(longTermAction)))
            .andExpect(status().isCreated());

        // Validate the LongTermAction in the database
        List<LongTermAction> longTermActionList = longTermActionRepository.findAll();
        assertThat(longTermActionList).hasSize(databaseSizeBeforeCreate + 1);
        LongTermAction testLongTermAction = longTermActionList.get(longTermActionList.size() - 1);
        assertThat(testLongTermAction.getNonConformanceId()).isEqualTo(DEFAULT_NON_CONFORMANCE_ID);
        assertThat(testLongTermAction.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createLongTermActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = longTermActionRepository.findAll().size();

        // Create the LongTermAction with an existing ID
        longTermAction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLongTermActionMockMvc.perform(post("/api/long-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(longTermAction)))
            .andExpect(status().isBadRequest());

        // Validate the LongTermAction in the database
        List<LongTermAction> longTermActionList = longTermActionRepository.findAll();
        assertThat(longTermActionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNonConformanceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = longTermActionRepository.findAll().size();
        // set the field null
        longTermAction.setNonConformanceId(null);

        // Create the LongTermAction, which fails.

        restLongTermActionMockMvc.perform(post("/api/long-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(longTermAction)))
            .andExpect(status().isBadRequest());

        List<LongTermAction> longTermActionList = longTermActionRepository.findAll();
        assertThat(longTermActionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLongTermActions() throws Exception {
        // Initialize the database
        longTermActionRepository.saveAndFlush(longTermAction);

        // Get all the longTermActionList
        restLongTermActionMockMvc.perform(get("/api/long-term-actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(longTermAction.getId().intValue())))
            .andExpect(jsonPath("$.[*].nonConformanceId").value(hasItem(DEFAULT_NON_CONFORMANCE_ID.intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getLongTermAction() throws Exception {
        // Initialize the database
        longTermActionRepository.saveAndFlush(longTermAction);

        // Get the longTermAction
        restLongTermActionMockMvc.perform(get("/api/long-term-actions/{id}", longTermAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(longTermAction.getId().intValue()))
            .andExpect(jsonPath("$.nonConformanceId").value(DEFAULT_NON_CONFORMANCE_ID.intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingLongTermAction() throws Exception {
        // Get the longTermAction
        restLongTermActionMockMvc.perform(get("/api/long-term-actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLongTermAction() throws Exception {
        // Initialize the database
        longTermActionRepository.saveAndFlush(longTermAction);

        int databaseSizeBeforeUpdate = longTermActionRepository.findAll().size();

        // Update the longTermAction
        LongTermAction updatedLongTermAction = longTermActionRepository.findById(longTermAction.getId()).get();
        // Disconnect from session so that the updates on updatedLongTermAction are not directly saved in db
        em.detach(updatedLongTermAction);
        updatedLongTermAction
            .nonConformanceId(UPDATED_NON_CONFORMANCE_ID)
            .description(UPDATED_DESCRIPTION);

        restLongTermActionMockMvc.perform(put("/api/long-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLongTermAction)))
            .andExpect(status().isOk());

        // Validate the LongTermAction in the database
        List<LongTermAction> longTermActionList = longTermActionRepository.findAll();
        assertThat(longTermActionList).hasSize(databaseSizeBeforeUpdate);
        LongTermAction testLongTermAction = longTermActionList.get(longTermActionList.size() - 1);
        assertThat(testLongTermAction.getNonConformanceId()).isEqualTo(UPDATED_NON_CONFORMANCE_ID);
        assertThat(testLongTermAction.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingLongTermAction() throws Exception {
        int databaseSizeBeforeUpdate = longTermActionRepository.findAll().size();

        // Create the LongTermAction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLongTermActionMockMvc.perform(put("/api/long-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(longTermAction)))
            .andExpect(status().isBadRequest());

        // Validate the LongTermAction in the database
        List<LongTermAction> longTermActionList = longTermActionRepository.findAll();
        assertThat(longTermActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLongTermAction() throws Exception {
        // Initialize the database
        longTermActionRepository.saveAndFlush(longTermAction);

        int databaseSizeBeforeDelete = longTermActionRepository.findAll().size();

        // Delete the longTermAction
        restLongTermActionMockMvc.perform(delete("/api/long-term-actions/{id}", longTermAction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LongTermAction> longTermActionList = longTermActionRepository.findAll();
        assertThat(longTermActionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
