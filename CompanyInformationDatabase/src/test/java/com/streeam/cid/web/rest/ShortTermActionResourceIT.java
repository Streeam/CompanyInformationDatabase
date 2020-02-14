package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ShortTermAction;
import com.streeam.cid.repository.ShortTermActionRepository;
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
 * Integration tests for the {@link ShortTermActionResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ShortTermActionResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_NON_CONFORMANCE_ID = 1L;
    private static final Long UPDATED_NON_CONFORMANCE_ID = 2L;

    @Autowired
    private ShortTermActionRepository shortTermActionRepository;

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

    private MockMvc restShortTermActionMockMvc;

    private ShortTermAction shortTermAction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShortTermActionResource shortTermActionResource = new ShortTermActionResource(shortTermActionRepository);
        this.restShortTermActionMockMvc = MockMvcBuilders.standaloneSetup(shortTermActionResource)
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
    public static ShortTermAction createEntity(EntityManager em) {
        ShortTermAction shortTermAction = new ShortTermAction()
            .description(DEFAULT_DESCRIPTION)
            .nonConformanceId(DEFAULT_NON_CONFORMANCE_ID);
        return shortTermAction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShortTermAction createUpdatedEntity(EntityManager em) {
        ShortTermAction shortTermAction = new ShortTermAction()
            .description(UPDATED_DESCRIPTION)
            .nonConformanceId(UPDATED_NON_CONFORMANCE_ID);
        return shortTermAction;
    }

    @BeforeEach
    public void initTest() {
        shortTermAction = createEntity(em);
    }

    @Test
    @Transactional
    public void createShortTermAction() throws Exception {
        int databaseSizeBeforeCreate = shortTermActionRepository.findAll().size();

        // Create the ShortTermAction
        restShortTermActionMockMvc.perform(post("/api/short-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortTermAction)))
            .andExpect(status().isCreated());

        // Validate the ShortTermAction in the database
        List<ShortTermAction> shortTermActionList = shortTermActionRepository.findAll();
        assertThat(shortTermActionList).hasSize(databaseSizeBeforeCreate + 1);
        ShortTermAction testShortTermAction = shortTermActionList.get(shortTermActionList.size() - 1);
        assertThat(testShortTermAction.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testShortTermAction.getNonConformanceId()).isEqualTo(DEFAULT_NON_CONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void createShortTermActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shortTermActionRepository.findAll().size();

        // Create the ShortTermAction with an existing ID
        shortTermAction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShortTermActionMockMvc.perform(post("/api/short-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortTermAction)))
            .andExpect(status().isBadRequest());

        // Validate the ShortTermAction in the database
        List<ShortTermAction> shortTermActionList = shortTermActionRepository.findAll();
        assertThat(shortTermActionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNonConformanceIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = shortTermActionRepository.findAll().size();
        // set the field null
        shortTermAction.setNonConformanceId(null);

        // Create the ShortTermAction, which fails.

        restShortTermActionMockMvc.perform(post("/api/short-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortTermAction)))
            .andExpect(status().isBadRequest());

        List<ShortTermAction> shortTermActionList = shortTermActionRepository.findAll();
        assertThat(shortTermActionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllShortTermActions() throws Exception {
        // Initialize the database
        shortTermActionRepository.saveAndFlush(shortTermAction);

        // Get all the shortTermActionList
        restShortTermActionMockMvc.perform(get("/api/short-term-actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shortTermAction.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].nonConformanceId").value(hasItem(DEFAULT_NON_CONFORMANCE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getShortTermAction() throws Exception {
        // Initialize the database
        shortTermActionRepository.saveAndFlush(shortTermAction);

        // Get the shortTermAction
        restShortTermActionMockMvc.perform(get("/api/short-term-actions/{id}", shortTermAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shortTermAction.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.nonConformanceId").value(DEFAULT_NON_CONFORMANCE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingShortTermAction() throws Exception {
        // Get the shortTermAction
        restShortTermActionMockMvc.perform(get("/api/short-term-actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShortTermAction() throws Exception {
        // Initialize the database
        shortTermActionRepository.saveAndFlush(shortTermAction);

        int databaseSizeBeforeUpdate = shortTermActionRepository.findAll().size();

        // Update the shortTermAction
        ShortTermAction updatedShortTermAction = shortTermActionRepository.findById(shortTermAction.getId()).get();
        // Disconnect from session so that the updates on updatedShortTermAction are not directly saved in db
        em.detach(updatedShortTermAction);
        updatedShortTermAction
            .description(UPDATED_DESCRIPTION)
            .nonConformanceId(UPDATED_NON_CONFORMANCE_ID);

        restShortTermActionMockMvc.perform(put("/api/short-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShortTermAction)))
            .andExpect(status().isOk());

        // Validate the ShortTermAction in the database
        List<ShortTermAction> shortTermActionList = shortTermActionRepository.findAll();
        assertThat(shortTermActionList).hasSize(databaseSizeBeforeUpdate);
        ShortTermAction testShortTermAction = shortTermActionList.get(shortTermActionList.size() - 1);
        assertThat(testShortTermAction.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testShortTermAction.getNonConformanceId()).isEqualTo(UPDATED_NON_CONFORMANCE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingShortTermAction() throws Exception {
        int databaseSizeBeforeUpdate = shortTermActionRepository.findAll().size();

        // Create the ShortTermAction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShortTermActionMockMvc.perform(put("/api/short-term-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortTermAction)))
            .andExpect(status().isBadRequest());

        // Validate the ShortTermAction in the database
        List<ShortTermAction> shortTermActionList = shortTermActionRepository.findAll();
        assertThat(shortTermActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShortTermAction() throws Exception {
        // Initialize the database
        shortTermActionRepository.saveAndFlush(shortTermAction);

        int databaseSizeBeforeDelete = shortTermActionRepository.findAll().size();

        // Delete the shortTermAction
        restShortTermActionMockMvc.perform(delete("/api/short-term-actions/{id}", shortTermAction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShortTermAction> shortTermActionList = shortTermActionRepository.findAll();
        assertThat(shortTermActionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
