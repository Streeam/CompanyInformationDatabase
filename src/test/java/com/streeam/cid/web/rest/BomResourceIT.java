package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Bom;
import com.streeam.cid.repository.BomRepository;
import com.streeam.cid.service.BomService;
import com.streeam.cid.service.dto.BomDTO;
import com.streeam.cid.service.mapper.BomMapper;
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
 * Integration tests for the {@link BomResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class BomResourceIT {

    private static final Double DEFAULT_QUANTITY = 0D;
    private static final Double UPDATED_QUANTITY = 1D;

    private static final Integer DEFAULT_SEQUENCE_NUMBER = 0;
    private static final Integer UPDATED_SEQUENCE_NUMBER = 1;

    private static final String DEFAULT_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PART_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CHILD_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CHILD_PART_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_UNIQUE_IDENTIFIER = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_IDENTIFIER = "BBBBBBBBBB";

    @Autowired
    private BomRepository bomRepository;

    @Autowired
    private BomMapper bomMapper;

    @Autowired
    private BomService bomService;

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

    private MockMvc restBomMockMvc;

    private Bom bom;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BomResource bomResource = new BomResource(bomService);
        this.restBomMockMvc = MockMvcBuilders.standaloneSetup(bomResource)
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
    public static Bom createEntity(EntityManager em) {
        Bom bom = new Bom()
            .quantity(DEFAULT_QUANTITY)
            .sequenceNumber(DEFAULT_SEQUENCE_NUMBER)
            .partNumber(DEFAULT_PART_NUMBER)
            .childPartNumber(DEFAULT_CHILD_PART_NUMBER)
            .uniqueIdentifier(DEFAULT_UNIQUE_IDENTIFIER);
        return bom;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bom createUpdatedEntity(EntityManager em) {
        Bom bom = new Bom()
            .quantity(UPDATED_QUANTITY)
            .sequenceNumber(UPDATED_SEQUENCE_NUMBER)
            .partNumber(UPDATED_PART_NUMBER)
            .childPartNumber(UPDATED_CHILD_PART_NUMBER)
            .uniqueIdentifier(UPDATED_UNIQUE_IDENTIFIER);
        return bom;
    }

    @BeforeEach
    public void initTest() {
        bom = createEntity(em);
    }

    @Test
    @Transactional
    public void createBom() throws Exception {
        int databaseSizeBeforeCreate = bomRepository.findAll().size();

        // Create the Bom
        BomDTO bomDTO = bomMapper.toDto(bom);
        restBomMockMvc.perform(post("/api/boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bomDTO)))
            .andExpect(status().isCreated());

        // Validate the Bom in the database
        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeCreate + 1);
        Bom testBom = bomList.get(bomList.size() - 1);
        assertThat(testBom.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testBom.getSequenceNumber()).isEqualTo(DEFAULT_SEQUENCE_NUMBER);
        assertThat(testBom.getPartNumber()).isEqualTo(DEFAULT_PART_NUMBER);
        assertThat(testBom.getChildPartNumber()).isEqualTo(DEFAULT_CHILD_PART_NUMBER);
        assertThat(testBom.getUniqueIdentifier()).isEqualTo(DEFAULT_UNIQUE_IDENTIFIER);
    }

    @Test
    @Transactional
    public void createBomWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bomRepository.findAll().size();

        // Create the Bom with an existing ID
        bom.setId(1L);
        BomDTO bomDTO = bomMapper.toDto(bom);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBomMockMvc.perform(post("/api/boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bom in the database
        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = bomRepository.findAll().size();
        // set the field null
        bom.setQuantity(null);

        // Create the Bom, which fails.
        BomDTO bomDTO = bomMapper.toDto(bom);

        restBomMockMvc.perform(post("/api/boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bomDTO)))
            .andExpect(status().isBadRequest());

        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSequenceNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = bomRepository.findAll().size();
        // set the field null
        bom.setSequenceNumber(null);

        // Create the Bom, which fails.
        BomDTO bomDTO = bomMapper.toDto(bom);

        restBomMockMvc.perform(post("/api/boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bomDTO)))
            .andExpect(status().isBadRequest());

        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBoms() throws Exception {
        // Initialize the database
        bomRepository.saveAndFlush(bom);

        // Get all the bomList
        restBomMockMvc.perform(get("/api/boms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bom.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].sequenceNumber").value(hasItem(DEFAULT_SEQUENCE_NUMBER)))
            .andExpect(jsonPath("$.[*].partNumber").value(hasItem(DEFAULT_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].childPartNumber").value(hasItem(DEFAULT_CHILD_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].uniqueIdentifier").value(hasItem(DEFAULT_UNIQUE_IDENTIFIER)));
    }
    
    @Test
    @Transactional
    public void getBom() throws Exception {
        // Initialize the database
        bomRepository.saveAndFlush(bom);

        // Get the bom
        restBomMockMvc.perform(get("/api/boms/{id}", bom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bom.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.sequenceNumber").value(DEFAULT_SEQUENCE_NUMBER))
            .andExpect(jsonPath("$.partNumber").value(DEFAULT_PART_NUMBER))
            .andExpect(jsonPath("$.childPartNumber").value(DEFAULT_CHILD_PART_NUMBER))
            .andExpect(jsonPath("$.uniqueIdentifier").value(DEFAULT_UNIQUE_IDENTIFIER));
    }

    @Test
    @Transactional
    public void getNonExistingBom() throws Exception {
        // Get the bom
        restBomMockMvc.perform(get("/api/boms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBom() throws Exception {
        // Initialize the database
        bomRepository.saveAndFlush(bom);

        int databaseSizeBeforeUpdate = bomRepository.findAll().size();

        // Update the bom
        Bom updatedBom = bomRepository.findById(bom.getId()).get();
        // Disconnect from session so that the updates on updatedBom are not directly saved in db
        em.detach(updatedBom);
        updatedBom
            .quantity(UPDATED_QUANTITY)
            .sequenceNumber(UPDATED_SEQUENCE_NUMBER)
            .partNumber(UPDATED_PART_NUMBER)
            .childPartNumber(UPDATED_CHILD_PART_NUMBER)
            .uniqueIdentifier(UPDATED_UNIQUE_IDENTIFIER);
        BomDTO bomDTO = bomMapper.toDto(updatedBom);

        restBomMockMvc.perform(put("/api/boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bomDTO)))
            .andExpect(status().isOk());

        // Validate the Bom in the database
        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeUpdate);
        Bom testBom = bomList.get(bomList.size() - 1);
        assertThat(testBom.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testBom.getSequenceNumber()).isEqualTo(UPDATED_SEQUENCE_NUMBER);
        assertThat(testBom.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testBom.getChildPartNumber()).isEqualTo(UPDATED_CHILD_PART_NUMBER);
        assertThat(testBom.getUniqueIdentifier()).isEqualTo(UPDATED_UNIQUE_IDENTIFIER);
    }

    @Test
    @Transactional
    public void updateNonExistingBom() throws Exception {
        int databaseSizeBeforeUpdate = bomRepository.findAll().size();

        // Create the Bom
        BomDTO bomDTO = bomMapper.toDto(bom);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBomMockMvc.perform(put("/api/boms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bom in the database
        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBom() throws Exception {
        // Initialize the database
        bomRepository.saveAndFlush(bom);

        int databaseSizeBeforeDelete = bomRepository.findAll().size();

        // Delete the bom
        restBomMockMvc.perform(delete("/api/boms/{id}", bom.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bom> bomList = bomRepository.findAll();
        assertThat(bomList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
