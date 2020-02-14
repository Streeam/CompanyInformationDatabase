package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Prototype;
import com.streeam.cid.repository.PrototypeRepository;
import com.streeam.cid.service.PrototypeService;
import com.streeam.cid.service.dto.PrototypeDTO;
import com.streeam.cid.service.mapper.PrototypeMapper;
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

import com.streeam.cid.domain.enumeration.Status;
import com.streeam.cid.domain.enumeration.Priority;
/**
 * Integration tests for the {@link PrototypeResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class PrototypeResourceIT {

    private static final Status DEFAULT_STATUS = Status.PENDING;
    private static final Status UPDATED_STATUS = Status.COMPLETE;

    private static final LocalDate DEFAULT_DEADLINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEADLINE = LocalDate.now(ZoneId.systemDefault());

    private static final Priority DEFAULT_PRIORITY = Priority.LOW;
    private static final Priority UPDATED_PRIORITY = Priority.MEDIUM;

    private static final LocalDate DEFAULT_PROPOSED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PROPOSED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_PROGRESS = 0;
    private static final Integer UPDATED_PROGRESS = 1;

    @Autowired
    private PrototypeRepository prototypeRepository;

    @Autowired
    private PrototypeMapper prototypeMapper;

    @Autowired
    private PrototypeService prototypeService;

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

    private MockMvc restPrototypeMockMvc;

    private Prototype prototype;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrototypeResource prototypeResource = new PrototypeResource(prototypeService);
        this.restPrototypeMockMvc = MockMvcBuilders.standaloneSetup(prototypeResource)
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
    public static Prototype createEntity(EntityManager em) {
        Prototype prototype = new Prototype()
            .status(DEFAULT_STATUS)
            .deadline(DEFAULT_DEADLINE)
            .priority(DEFAULT_PRIORITY)
            .proposedDate(DEFAULT_PROPOSED_DATE)
            .progress(DEFAULT_PROGRESS);
        return prototype;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prototype createUpdatedEntity(EntityManager em) {
        Prototype prototype = new Prototype()
            .status(UPDATED_STATUS)
            .deadline(UPDATED_DEADLINE)
            .priority(UPDATED_PRIORITY)
            .proposedDate(UPDATED_PROPOSED_DATE)
            .progress(UPDATED_PROGRESS);
        return prototype;
    }

    @BeforeEach
    public void initTest() {
        prototype = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrototype() throws Exception {
        int databaseSizeBeforeCreate = prototypeRepository.findAll().size();

        // Create the Prototype
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(prototype);
        restPrototypeMockMvc.perform(post("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isCreated());

        // Validate the Prototype in the database
        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeCreate + 1);
        Prototype testPrototype = prototypeList.get(prototypeList.size() - 1);
        assertThat(testPrototype.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPrototype.getDeadline()).isEqualTo(DEFAULT_DEADLINE);
        assertThat(testPrototype.getPriority()).isEqualTo(DEFAULT_PRIORITY);
        assertThat(testPrototype.getProposedDate()).isEqualTo(DEFAULT_PROPOSED_DATE);
        assertThat(testPrototype.getProgress()).isEqualTo(DEFAULT_PROGRESS);
    }

    @Test
    @Transactional
    public void createPrototypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prototypeRepository.findAll().size();

        // Create the Prototype with an existing ID
        prototype.setId(1L);
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(prototype);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrototypeMockMvc.perform(post("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Prototype in the database
        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = prototypeRepository.findAll().size();
        // set the field null
        prototype.setStatus(null);

        // Create the Prototype, which fails.
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(prototype);

        restPrototypeMockMvc.perform(post("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isBadRequest());

        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriorityIsRequired() throws Exception {
        int databaseSizeBeforeTest = prototypeRepository.findAll().size();
        // set the field null
        prototype.setPriority(null);

        // Create the Prototype, which fails.
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(prototype);

        restPrototypeMockMvc.perform(post("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isBadRequest());

        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProgressIsRequired() throws Exception {
        int databaseSizeBeforeTest = prototypeRepository.findAll().size();
        // set the field null
        prototype.setProgress(null);

        // Create the Prototype, which fails.
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(prototype);

        restPrototypeMockMvc.perform(post("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isBadRequest());

        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrototypes() throws Exception {
        // Initialize the database
        prototypeRepository.saveAndFlush(prototype);

        // Get all the prototypeList
        restPrototypeMockMvc.perform(get("/api/prototypes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prototype.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].deadline").value(hasItem(DEFAULT_DEADLINE.toString())))
            .andExpect(jsonPath("$.[*].priority").value(hasItem(DEFAULT_PRIORITY.toString())))
            .andExpect(jsonPath("$.[*].proposedDate").value(hasItem(DEFAULT_PROPOSED_DATE.toString())))
            .andExpect(jsonPath("$.[*].progress").value(hasItem(DEFAULT_PROGRESS)));
    }
    
    @Test
    @Transactional
    public void getPrototype() throws Exception {
        // Initialize the database
        prototypeRepository.saveAndFlush(prototype);

        // Get the prototype
        restPrototypeMockMvc.perform(get("/api/prototypes/{id}", prototype.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(prototype.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.deadline").value(DEFAULT_DEADLINE.toString()))
            .andExpect(jsonPath("$.priority").value(DEFAULT_PRIORITY.toString()))
            .andExpect(jsonPath("$.proposedDate").value(DEFAULT_PROPOSED_DATE.toString()))
            .andExpect(jsonPath("$.progress").value(DEFAULT_PROGRESS));
    }

    @Test
    @Transactional
    public void getNonExistingPrototype() throws Exception {
        // Get the prototype
        restPrototypeMockMvc.perform(get("/api/prototypes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrototype() throws Exception {
        // Initialize the database
        prototypeRepository.saveAndFlush(prototype);

        int databaseSizeBeforeUpdate = prototypeRepository.findAll().size();

        // Update the prototype
        Prototype updatedPrototype = prototypeRepository.findById(prototype.getId()).get();
        // Disconnect from session so that the updates on updatedPrototype are not directly saved in db
        em.detach(updatedPrototype);
        updatedPrototype
            .status(UPDATED_STATUS)
            .deadline(UPDATED_DEADLINE)
            .priority(UPDATED_PRIORITY)
            .proposedDate(UPDATED_PROPOSED_DATE)
            .progress(UPDATED_PROGRESS);
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(updatedPrototype);

        restPrototypeMockMvc.perform(put("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isOk());

        // Validate the Prototype in the database
        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeUpdate);
        Prototype testPrototype = prototypeList.get(prototypeList.size() - 1);
        assertThat(testPrototype.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPrototype.getDeadline()).isEqualTo(UPDATED_DEADLINE);
        assertThat(testPrototype.getPriority()).isEqualTo(UPDATED_PRIORITY);
        assertThat(testPrototype.getProposedDate()).isEqualTo(UPDATED_PROPOSED_DATE);
        assertThat(testPrototype.getProgress()).isEqualTo(UPDATED_PROGRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingPrototype() throws Exception {
        int databaseSizeBeforeUpdate = prototypeRepository.findAll().size();

        // Create the Prototype
        PrototypeDTO prototypeDTO = prototypeMapper.toDto(prototype);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrototypeMockMvc.perform(put("/api/prototypes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(prototypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Prototype in the database
        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrototype() throws Exception {
        // Initialize the database
        prototypeRepository.saveAndFlush(prototype);

        int databaseSizeBeforeDelete = prototypeRepository.findAll().size();

        // Delete the prototype
        restPrototypeMockMvc.perform(delete("/api/prototypes/{id}", prototype.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prototype> prototypeList = prototypeRepository.findAll();
        assertThat(prototypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prototype.class);
        Prototype prototype1 = new Prototype();
        prototype1.setId(1L);
        Prototype prototype2 = new Prototype();
        prototype2.setId(prototype1.getId());
        assertThat(prototype1).isEqualTo(prototype2);
        prototype2.setId(2L);
        assertThat(prototype1).isNotEqualTo(prototype2);
        prototype1.setId(null);
        assertThat(prototype1).isNotEqualTo(prototype2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrototypeDTO.class);
        PrototypeDTO prototypeDTO1 = new PrototypeDTO();
        prototypeDTO1.setId(1L);
        PrototypeDTO prototypeDTO2 = new PrototypeDTO();
        assertThat(prototypeDTO1).isNotEqualTo(prototypeDTO2);
        prototypeDTO2.setId(prototypeDTO1.getId());
        assertThat(prototypeDTO1).isEqualTo(prototypeDTO2);
        prototypeDTO2.setId(2L);
        assertThat(prototypeDTO1).isNotEqualTo(prototypeDTO2);
        prototypeDTO1.setId(null);
        assertThat(prototypeDTO1).isNotEqualTo(prototypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(prototypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(prototypeMapper.fromId(null)).isNull();
    }
}
