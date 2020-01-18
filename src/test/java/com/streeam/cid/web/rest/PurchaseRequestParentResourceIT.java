package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.PurchaseRequestParent;
import com.streeam.cid.repository.PurchaseRequestParentRepository;
import com.streeam.cid.service.PurchaseRequestParentService;
import com.streeam.cid.service.dto.PurchaseRequestParentDTO;
import com.streeam.cid.service.mapper.PurchaseRequestParentMapper;
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
 * Integration tests for the {@link PurchaseRequestParentResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class PurchaseRequestParentResourceIT {

    private static final String DEFAULT_PDF_URL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PDF_URL_PATH = "BBBBBBBBBB";

    @Autowired
    private PurchaseRequestParentRepository purchaseRequestParentRepository;

    @Autowired
    private PurchaseRequestParentMapper purchaseRequestParentMapper;

    @Autowired
    private PurchaseRequestParentService purchaseRequestParentService;

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

    private MockMvc restPurchaseRequestParentMockMvc;

    private PurchaseRequestParent purchaseRequestParent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurchaseRequestParentResource purchaseRequestParentResource = new PurchaseRequestParentResource(purchaseRequestParentService);
        this.restPurchaseRequestParentMockMvc = MockMvcBuilders.standaloneSetup(purchaseRequestParentResource)
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
    public static PurchaseRequestParent createEntity(EntityManager em) {
        PurchaseRequestParent purchaseRequestParent = new PurchaseRequestParent()
            .pdfURLPath(DEFAULT_PDF_URL_PATH);
        return purchaseRequestParent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseRequestParent createUpdatedEntity(EntityManager em) {
        PurchaseRequestParent purchaseRequestParent = new PurchaseRequestParent()
            .pdfURLPath(UPDATED_PDF_URL_PATH);
        return purchaseRequestParent;
    }

    @BeforeEach
    public void initTest() {
        purchaseRequestParent = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseRequestParent() throws Exception {
        int databaseSizeBeforeCreate = purchaseRequestParentRepository.findAll().size();

        // Create the PurchaseRequestParent
        PurchaseRequestParentDTO purchaseRequestParentDTO = purchaseRequestParentMapper.toDto(purchaseRequestParent);
        restPurchaseRequestParentMockMvc.perform(post("/api/purchase-request-parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestParentDTO)))
            .andExpect(status().isCreated());

        // Validate the PurchaseRequestParent in the database
        List<PurchaseRequestParent> purchaseRequestParentList = purchaseRequestParentRepository.findAll();
        assertThat(purchaseRequestParentList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseRequestParent testPurchaseRequestParent = purchaseRequestParentList.get(purchaseRequestParentList.size() - 1);
        assertThat(testPurchaseRequestParent.getPdfURLPath()).isEqualTo(DEFAULT_PDF_URL_PATH);
    }

    @Test
    @Transactional
    public void createPurchaseRequestParentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseRequestParentRepository.findAll().size();

        // Create the PurchaseRequestParent with an existing ID
        purchaseRequestParent.setId(1L);
        PurchaseRequestParentDTO purchaseRequestParentDTO = purchaseRequestParentMapper.toDto(purchaseRequestParent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseRequestParentMockMvc.perform(post("/api/purchase-request-parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestParentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseRequestParent in the database
        List<PurchaseRequestParent> purchaseRequestParentList = purchaseRequestParentRepository.findAll();
        assertThat(purchaseRequestParentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPdfURLPathIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseRequestParentRepository.findAll().size();
        // set the field null
        purchaseRequestParent.setPdfURLPath(null);

        // Create the PurchaseRequestParent, which fails.
        PurchaseRequestParentDTO purchaseRequestParentDTO = purchaseRequestParentMapper.toDto(purchaseRequestParent);

        restPurchaseRequestParentMockMvc.perform(post("/api/purchase-request-parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestParentDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseRequestParent> purchaseRequestParentList = purchaseRequestParentRepository.findAll();
        assertThat(purchaseRequestParentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPurchaseRequestParents() throws Exception {
        // Initialize the database
        purchaseRequestParentRepository.saveAndFlush(purchaseRequestParent);

        // Get all the purchaseRequestParentList
        restPurchaseRequestParentMockMvc.perform(get("/api/purchase-request-parents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseRequestParent.getId().intValue())))
            .andExpect(jsonPath("$.[*].pdfURLPath").value(hasItem(DEFAULT_PDF_URL_PATH)));
    }
    
    @Test
    @Transactional
    public void getPurchaseRequestParent() throws Exception {
        // Initialize the database
        purchaseRequestParentRepository.saveAndFlush(purchaseRequestParent);

        // Get the purchaseRequestParent
        restPurchaseRequestParentMockMvc.perform(get("/api/purchase-request-parents/{id}", purchaseRequestParent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseRequestParent.getId().intValue()))
            .andExpect(jsonPath("$.pdfURLPath").value(DEFAULT_PDF_URL_PATH));
    }

    @Test
    @Transactional
    public void getNonExistingPurchaseRequestParent() throws Exception {
        // Get the purchaseRequestParent
        restPurchaseRequestParentMockMvc.perform(get("/api/purchase-request-parents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseRequestParent() throws Exception {
        // Initialize the database
        purchaseRequestParentRepository.saveAndFlush(purchaseRequestParent);

        int databaseSizeBeforeUpdate = purchaseRequestParentRepository.findAll().size();

        // Update the purchaseRequestParent
        PurchaseRequestParent updatedPurchaseRequestParent = purchaseRequestParentRepository.findById(purchaseRequestParent.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseRequestParent are not directly saved in db
        em.detach(updatedPurchaseRequestParent);
        updatedPurchaseRequestParent
            .pdfURLPath(UPDATED_PDF_URL_PATH);
        PurchaseRequestParentDTO purchaseRequestParentDTO = purchaseRequestParentMapper.toDto(updatedPurchaseRequestParent);

        restPurchaseRequestParentMockMvc.perform(put("/api/purchase-request-parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestParentDTO)))
            .andExpect(status().isOk());

        // Validate the PurchaseRequestParent in the database
        List<PurchaseRequestParent> purchaseRequestParentList = purchaseRequestParentRepository.findAll();
        assertThat(purchaseRequestParentList).hasSize(databaseSizeBeforeUpdate);
        PurchaseRequestParent testPurchaseRequestParent = purchaseRequestParentList.get(purchaseRequestParentList.size() - 1);
        assertThat(testPurchaseRequestParent.getPdfURLPath()).isEqualTo(UPDATED_PDF_URL_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseRequestParent() throws Exception {
        int databaseSizeBeforeUpdate = purchaseRequestParentRepository.findAll().size();

        // Create the PurchaseRequestParent
        PurchaseRequestParentDTO purchaseRequestParentDTO = purchaseRequestParentMapper.toDto(purchaseRequestParent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseRequestParentMockMvc.perform(put("/api/purchase-request-parents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestParentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseRequestParent in the database
        List<PurchaseRequestParent> purchaseRequestParentList = purchaseRequestParentRepository.findAll();
        assertThat(purchaseRequestParentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseRequestParent() throws Exception {
        // Initialize the database
        purchaseRequestParentRepository.saveAndFlush(purchaseRequestParent);

        int databaseSizeBeforeDelete = purchaseRequestParentRepository.findAll().size();

        // Delete the purchaseRequestParent
        restPurchaseRequestParentMockMvc.perform(delete("/api/purchase-request-parents/{id}", purchaseRequestParent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseRequestParent> purchaseRequestParentList = purchaseRequestParentRepository.findAll();
        assertThat(purchaseRequestParentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseRequestParent.class);
        PurchaseRequestParent purchaseRequestParent1 = new PurchaseRequestParent();
        purchaseRequestParent1.setId(1L);
        PurchaseRequestParent purchaseRequestParent2 = new PurchaseRequestParent();
        purchaseRequestParent2.setId(purchaseRequestParent1.getId());
        assertThat(purchaseRequestParent1).isEqualTo(purchaseRequestParent2);
        purchaseRequestParent2.setId(2L);
        assertThat(purchaseRequestParent1).isNotEqualTo(purchaseRequestParent2);
        purchaseRequestParent1.setId(null);
        assertThat(purchaseRequestParent1).isNotEqualTo(purchaseRequestParent2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseRequestParentDTO.class);
        PurchaseRequestParentDTO purchaseRequestParentDTO1 = new PurchaseRequestParentDTO();
        purchaseRequestParentDTO1.setId(1L);
        PurchaseRequestParentDTO purchaseRequestParentDTO2 = new PurchaseRequestParentDTO();
        assertThat(purchaseRequestParentDTO1).isNotEqualTo(purchaseRequestParentDTO2);
        purchaseRequestParentDTO2.setId(purchaseRequestParentDTO1.getId());
        assertThat(purchaseRequestParentDTO1).isEqualTo(purchaseRequestParentDTO2);
        purchaseRequestParentDTO2.setId(2L);
        assertThat(purchaseRequestParentDTO1).isNotEqualTo(purchaseRequestParentDTO2);
        purchaseRequestParentDTO1.setId(null);
        assertThat(purchaseRequestParentDTO1).isNotEqualTo(purchaseRequestParentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(purchaseRequestParentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(purchaseRequestParentMapper.fromId(null)).isNull();
    }
}
