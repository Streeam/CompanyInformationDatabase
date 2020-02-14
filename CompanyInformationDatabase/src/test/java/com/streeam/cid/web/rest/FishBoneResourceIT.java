package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.FishBone;
import com.streeam.cid.repository.FishBoneRepository;
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

import com.streeam.cid.domain.enumeration.FishBoneTypes;
/**
 * Integration tests for the {@link FishBoneResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class FishBoneResourceIT {

    private static final FishBoneTypes DEFAULT_FISHBONE_TYPES = FishBoneTypes.EQUIPMENT;
    private static final FishBoneTypes UPDATED_FISHBONE_TYPES = FishBoneTypes.PEOPLE;

    private static final String DEFAULT_SUB_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_SUB_CATEGORY = "BBBBBBBBBB";

    private static final Long DEFAULT_ROOT_CAUSE_ID = 1L;
    private static final Long UPDATED_ROOT_CAUSE_ID = 2L;

    @Autowired
    private FishBoneRepository fishBoneRepository;

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

    private MockMvc restFishBoneMockMvc;

    private FishBone fishBone;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FishBoneResource fishBoneResource = new FishBoneResource(fishBoneRepository);
        this.restFishBoneMockMvc = MockMvcBuilders.standaloneSetup(fishBoneResource)
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
    public static FishBone createEntity(EntityManager em) {
        FishBone fishBone = new FishBone()
            .fishboneTypes(DEFAULT_FISHBONE_TYPES)
            .subCategory(DEFAULT_SUB_CATEGORY)
            .rootCauseId(DEFAULT_ROOT_CAUSE_ID);
        return fishBone;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FishBone createUpdatedEntity(EntityManager em) {
        FishBone fishBone = new FishBone()
            .fishboneTypes(UPDATED_FISHBONE_TYPES)
            .subCategory(UPDATED_SUB_CATEGORY)
            .rootCauseId(UPDATED_ROOT_CAUSE_ID);
        return fishBone;
    }

    @BeforeEach
    public void initTest() {
        fishBone = createEntity(em);
    }

    @Test
    @Transactional
    public void createFishBone() throws Exception {
        int databaseSizeBeforeCreate = fishBoneRepository.findAll().size();

        // Create the FishBone
        restFishBoneMockMvc.perform(post("/api/fish-bones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fishBone)))
            .andExpect(status().isCreated());

        // Validate the FishBone in the database
        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeCreate + 1);
        FishBone testFishBone = fishBoneList.get(fishBoneList.size() - 1);
        assertThat(testFishBone.getFishboneTypes()).isEqualTo(DEFAULT_FISHBONE_TYPES);
        assertThat(testFishBone.getSubCategory()).isEqualTo(DEFAULT_SUB_CATEGORY);
        assertThat(testFishBone.getRootCauseId()).isEqualTo(DEFAULT_ROOT_CAUSE_ID);
    }

    @Test
    @Transactional
    public void createFishBoneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fishBoneRepository.findAll().size();

        // Create the FishBone with an existing ID
        fishBone.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFishBoneMockMvc.perform(post("/api/fish-bones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fishBone)))
            .andExpect(status().isBadRequest());

        // Validate the FishBone in the database
        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFishboneTypesIsRequired() throws Exception {
        int databaseSizeBeforeTest = fishBoneRepository.findAll().size();
        // set the field null
        fishBone.setFishboneTypes(null);

        // Create the FishBone, which fails.

        restFishBoneMockMvc.perform(post("/api/fish-bones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fishBone)))
            .andExpect(status().isBadRequest());

        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRootCauseIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = fishBoneRepository.findAll().size();
        // set the field null
        fishBone.setRootCauseId(null);

        // Create the FishBone, which fails.

        restFishBoneMockMvc.perform(post("/api/fish-bones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fishBone)))
            .andExpect(status().isBadRequest());

        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFishBones() throws Exception {
        // Initialize the database
        fishBoneRepository.saveAndFlush(fishBone);

        // Get all the fishBoneList
        restFishBoneMockMvc.perform(get("/api/fish-bones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fishBone.getId().intValue())))
            .andExpect(jsonPath("$.[*].fishboneTypes").value(hasItem(DEFAULT_FISHBONE_TYPES.toString())))
            .andExpect(jsonPath("$.[*].subCategory").value(hasItem(DEFAULT_SUB_CATEGORY)))
            .andExpect(jsonPath("$.[*].rootCauseId").value(hasItem(DEFAULT_ROOT_CAUSE_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getFishBone() throws Exception {
        // Initialize the database
        fishBoneRepository.saveAndFlush(fishBone);

        // Get the fishBone
        restFishBoneMockMvc.perform(get("/api/fish-bones/{id}", fishBone.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fishBone.getId().intValue()))
            .andExpect(jsonPath("$.fishboneTypes").value(DEFAULT_FISHBONE_TYPES.toString()))
            .andExpect(jsonPath("$.subCategory").value(DEFAULT_SUB_CATEGORY))
            .andExpect(jsonPath("$.rootCauseId").value(DEFAULT_ROOT_CAUSE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFishBone() throws Exception {
        // Get the fishBone
        restFishBoneMockMvc.perform(get("/api/fish-bones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFishBone() throws Exception {
        // Initialize the database
        fishBoneRepository.saveAndFlush(fishBone);

        int databaseSizeBeforeUpdate = fishBoneRepository.findAll().size();

        // Update the fishBone
        FishBone updatedFishBone = fishBoneRepository.findById(fishBone.getId()).get();
        // Disconnect from session so that the updates on updatedFishBone are not directly saved in db
        em.detach(updatedFishBone);
        updatedFishBone
            .fishboneTypes(UPDATED_FISHBONE_TYPES)
            .subCategory(UPDATED_SUB_CATEGORY)
            .rootCauseId(UPDATED_ROOT_CAUSE_ID);

        restFishBoneMockMvc.perform(put("/api/fish-bones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFishBone)))
            .andExpect(status().isOk());

        // Validate the FishBone in the database
        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeUpdate);
        FishBone testFishBone = fishBoneList.get(fishBoneList.size() - 1);
        assertThat(testFishBone.getFishboneTypes()).isEqualTo(UPDATED_FISHBONE_TYPES);
        assertThat(testFishBone.getSubCategory()).isEqualTo(UPDATED_SUB_CATEGORY);
        assertThat(testFishBone.getRootCauseId()).isEqualTo(UPDATED_ROOT_CAUSE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingFishBone() throws Exception {
        int databaseSizeBeforeUpdate = fishBoneRepository.findAll().size();

        // Create the FishBone

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFishBoneMockMvc.perform(put("/api/fish-bones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fishBone)))
            .andExpect(status().isBadRequest());

        // Validate the FishBone in the database
        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFishBone() throws Exception {
        // Initialize the database
        fishBoneRepository.saveAndFlush(fishBone);

        int databaseSizeBeforeDelete = fishBoneRepository.findAll().size();

        // Delete the fishBone
        restFishBoneMockMvc.perform(delete("/api/fish-bones/{id}", fishBone.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FishBone> fishBoneList = fishBoneRepository.findAll();
        assertThat(fishBoneList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
