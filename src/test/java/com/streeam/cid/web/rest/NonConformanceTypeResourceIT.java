package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.NonConformanceType;
import com.streeam.cid.repository.NonConformanceTypeRepository;
import com.streeam.cid.service.NonConformanceTypeService;
import com.streeam.cid.service.dto.NonConformanceTypeDTO;
import com.streeam.cid.service.mapper.NonConformanceTypeMapper;
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
 * Integration tests for the {@link NonConformanceTypeResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class NonConformanceTypeResourceIT {

    private static final String DEFAULT_REJECTION_CODE = "AAAAAAAAAA";
    private static final String UPDATED_REJECTION_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_REJECTION_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_REJECTION_TITLE = "BBBBBBBBBB";

    @Autowired
    private NonConformanceTypeRepository nonConformanceTypeRepository;

    @Autowired
    private NonConformanceTypeMapper nonConformanceTypeMapper;

    @Autowired
    private NonConformanceTypeService nonConformanceTypeService;

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

    private MockMvc restNonConformanceTypeMockMvc;

    private NonConformanceType nonConformanceType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NonConformanceTypeResource nonConformanceTypeResource = new NonConformanceTypeResource(nonConformanceTypeService);
        this.restNonConformanceTypeMockMvc = MockMvcBuilders.standaloneSetup(nonConformanceTypeResource)
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
    public static NonConformanceType createEntity(EntityManager em) {
        NonConformanceType nonConformanceType = new NonConformanceType()
            .rejectionCode(DEFAULT_REJECTION_CODE)
            .rejectionTitle(DEFAULT_REJECTION_TITLE);
        return nonConformanceType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NonConformanceType createUpdatedEntity(EntityManager em) {
        NonConformanceType nonConformanceType = new NonConformanceType()
            .rejectionCode(UPDATED_REJECTION_CODE)
            .rejectionTitle(UPDATED_REJECTION_TITLE);
        return nonConformanceType;
    }

    @BeforeEach
    public void initTest() {
        nonConformanceType = createEntity(em);
    }

    @Test
    @Transactional
    public void createNonConformanceType() throws Exception {
        int databaseSizeBeforeCreate = nonConformanceTypeRepository.findAll().size();

        // Create the NonConformanceType
        NonConformanceTypeDTO nonConformanceTypeDTO = nonConformanceTypeMapper.toDto(nonConformanceType);
        restNonConformanceTypeMockMvc.perform(post("/api/non-conformance-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the NonConformanceType in the database
        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeCreate + 1);
        NonConformanceType testNonConformanceType = nonConformanceTypeList.get(nonConformanceTypeList.size() - 1);
        assertThat(testNonConformanceType.getRejectionCode()).isEqualTo(DEFAULT_REJECTION_CODE);
        assertThat(testNonConformanceType.getRejectionTitle()).isEqualTo(DEFAULT_REJECTION_TITLE);
    }

    @Test
    @Transactional
    public void createNonConformanceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nonConformanceTypeRepository.findAll().size();

        // Create the NonConformanceType with an existing ID
        nonConformanceType.setId(1L);
        NonConformanceTypeDTO nonConformanceTypeDTO = nonConformanceTypeMapper.toDto(nonConformanceType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNonConformanceTypeMockMvc.perform(post("/api/non-conformance-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NonConformanceType in the database
        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRejectionCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonConformanceTypeRepository.findAll().size();
        // set the field null
        nonConformanceType.setRejectionCode(null);

        // Create the NonConformanceType, which fails.
        NonConformanceTypeDTO nonConformanceTypeDTO = nonConformanceTypeMapper.toDto(nonConformanceType);

        restNonConformanceTypeMockMvc.perform(post("/api/non-conformance-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceTypeDTO)))
            .andExpect(status().isBadRequest());

        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRejectionTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = nonConformanceTypeRepository.findAll().size();
        // set the field null
        nonConformanceType.setRejectionTitle(null);

        // Create the NonConformanceType, which fails.
        NonConformanceTypeDTO nonConformanceTypeDTO = nonConformanceTypeMapper.toDto(nonConformanceType);

        restNonConformanceTypeMockMvc.perform(post("/api/non-conformance-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceTypeDTO)))
            .andExpect(status().isBadRequest());

        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNonConformanceTypes() throws Exception {
        // Initialize the database
        nonConformanceTypeRepository.saveAndFlush(nonConformanceType);

        // Get all the nonConformanceTypeList
        restNonConformanceTypeMockMvc.perform(get("/api/non-conformance-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nonConformanceType.getId().intValue())))
            .andExpect(jsonPath("$.[*].rejectionCode").value(hasItem(DEFAULT_REJECTION_CODE)))
            .andExpect(jsonPath("$.[*].rejectionTitle").value(hasItem(DEFAULT_REJECTION_TITLE)));
    }
    
    @Test
    @Transactional
    public void getNonConformanceType() throws Exception {
        // Initialize the database
        nonConformanceTypeRepository.saveAndFlush(nonConformanceType);

        // Get the nonConformanceType
        restNonConformanceTypeMockMvc.perform(get("/api/non-conformance-types/{id}", nonConformanceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nonConformanceType.getId().intValue()))
            .andExpect(jsonPath("$.rejectionCode").value(DEFAULT_REJECTION_CODE))
            .andExpect(jsonPath("$.rejectionTitle").value(DEFAULT_REJECTION_TITLE));
    }

    @Test
    @Transactional
    public void getNonExistingNonConformanceType() throws Exception {
        // Get the nonConformanceType
        restNonConformanceTypeMockMvc.perform(get("/api/non-conformance-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNonConformanceType() throws Exception {
        // Initialize the database
        nonConformanceTypeRepository.saveAndFlush(nonConformanceType);

        int databaseSizeBeforeUpdate = nonConformanceTypeRepository.findAll().size();

        // Update the nonConformanceType
        NonConformanceType updatedNonConformanceType = nonConformanceTypeRepository.findById(nonConformanceType.getId()).get();
        // Disconnect from session so that the updates on updatedNonConformanceType are not directly saved in db
        em.detach(updatedNonConformanceType);
        updatedNonConformanceType
            .rejectionCode(UPDATED_REJECTION_CODE)
            .rejectionTitle(UPDATED_REJECTION_TITLE);
        NonConformanceTypeDTO nonConformanceTypeDTO = nonConformanceTypeMapper.toDto(updatedNonConformanceType);

        restNonConformanceTypeMockMvc.perform(put("/api/non-conformance-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceTypeDTO)))
            .andExpect(status().isOk());

        // Validate the NonConformanceType in the database
        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeUpdate);
        NonConformanceType testNonConformanceType = nonConformanceTypeList.get(nonConformanceTypeList.size() - 1);
        assertThat(testNonConformanceType.getRejectionCode()).isEqualTo(UPDATED_REJECTION_CODE);
        assertThat(testNonConformanceType.getRejectionTitle()).isEqualTo(UPDATED_REJECTION_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingNonConformanceType() throws Exception {
        int databaseSizeBeforeUpdate = nonConformanceTypeRepository.findAll().size();

        // Create the NonConformanceType
        NonConformanceTypeDTO nonConformanceTypeDTO = nonConformanceTypeMapper.toDto(nonConformanceType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNonConformanceTypeMockMvc.perform(put("/api/non-conformance-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nonConformanceTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NonConformanceType in the database
        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNonConformanceType() throws Exception {
        // Initialize the database
        nonConformanceTypeRepository.saveAndFlush(nonConformanceType);

        int databaseSizeBeforeDelete = nonConformanceTypeRepository.findAll().size();

        // Delete the nonConformanceType
        restNonConformanceTypeMockMvc.perform(delete("/api/non-conformance-types/{id}", nonConformanceType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NonConformanceType> nonConformanceTypeList = nonConformanceTypeRepository.findAll();
        assertThat(nonConformanceTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NonConformanceType.class);
        NonConformanceType nonConformanceType1 = new NonConformanceType();
        nonConformanceType1.setId(1L);
        NonConformanceType nonConformanceType2 = new NonConformanceType();
        nonConformanceType2.setId(nonConformanceType1.getId());
        assertThat(nonConformanceType1).isEqualTo(nonConformanceType2);
        nonConformanceType2.setId(2L);
        assertThat(nonConformanceType1).isNotEqualTo(nonConformanceType2);
        nonConformanceType1.setId(null);
        assertThat(nonConformanceType1).isNotEqualTo(nonConformanceType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NonConformanceTypeDTO.class);
        NonConformanceTypeDTO nonConformanceTypeDTO1 = new NonConformanceTypeDTO();
        nonConformanceTypeDTO1.setId(1L);
        NonConformanceTypeDTO nonConformanceTypeDTO2 = new NonConformanceTypeDTO();
        assertThat(nonConformanceTypeDTO1).isNotEqualTo(nonConformanceTypeDTO2);
        nonConformanceTypeDTO2.setId(nonConformanceTypeDTO1.getId());
        assertThat(nonConformanceTypeDTO1).isEqualTo(nonConformanceTypeDTO2);
        nonConformanceTypeDTO2.setId(2L);
        assertThat(nonConformanceTypeDTO1).isNotEqualTo(nonConformanceTypeDTO2);
        nonConformanceTypeDTO1.setId(null);
        assertThat(nonConformanceTypeDTO1).isNotEqualTo(nonConformanceTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(nonConformanceTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(nonConformanceTypeMapper.fromId(null)).isNull();
    }
}
