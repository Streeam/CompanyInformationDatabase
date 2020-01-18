package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.PurchaseRequestChild;
import com.streeam.cid.domain.Product;
import com.streeam.cid.repository.PurchaseRequestChildRepository;
import com.streeam.cid.service.PurchaseRequestChildService;
import com.streeam.cid.service.dto.PurchaseRequestChildDTO;
import com.streeam.cid.service.mapper.PurchaseRequestChildMapper;
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

import com.streeam.cid.domain.enumeration.PurchaseRequestStatus;
/**
 * Integration tests for the {@link PurchaseRequestChildResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class PurchaseRequestChildResourceIT {

    private static final Double DEFAULT_QUANTITY = 1D;
    private static final Double UPDATED_QUANTITY = 2D;

    private static final LocalDate DEFAULT_ORDERED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ORDERED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DUE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DUE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_COMMITED = false;
    private static final Boolean UPDATED_COMMITED = true;

    private static final PurchaseRequestStatus DEFAULT_STATUS = PurchaseRequestStatus.DESPATCHED;
    private static final PurchaseRequestStatus UPDATED_STATUS = PurchaseRequestStatus.PENDING;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private PurchaseRequestChildRepository purchaseRequestChildRepository;

    @Autowired
    private PurchaseRequestChildMapper purchaseRequestChildMapper;

    @Autowired
    private PurchaseRequestChildService purchaseRequestChildService;

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

    private MockMvc restPurchaseRequestChildMockMvc;

    private PurchaseRequestChild purchaseRequestChild;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurchaseRequestChildResource purchaseRequestChildResource = new PurchaseRequestChildResource(purchaseRequestChildService);
        this.restPurchaseRequestChildMockMvc = MockMvcBuilders.standaloneSetup(purchaseRequestChildResource)
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
    public static PurchaseRequestChild createEntity(EntityManager em) {
        PurchaseRequestChild purchaseRequestChild = new PurchaseRequestChild()
            .quantity(DEFAULT_QUANTITY)
            .orderedDate(DEFAULT_ORDERED_DATE)
            .dueDate(DEFAULT_DUE_DATE)
            .commited(DEFAULT_COMMITED)
            .status(DEFAULT_STATUS)
            .comment(DEFAULT_COMMENT);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        purchaseRequestChild.setProduct(product);
        return purchaseRequestChild;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseRequestChild createUpdatedEntity(EntityManager em) {
        PurchaseRequestChild purchaseRequestChild = new PurchaseRequestChild()
            .quantity(UPDATED_QUANTITY)
            .orderedDate(UPDATED_ORDERED_DATE)
            .dueDate(UPDATED_DUE_DATE)
            .commited(UPDATED_COMMITED)
            .status(UPDATED_STATUS)
            .comment(UPDATED_COMMENT);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        purchaseRequestChild.setProduct(product);
        return purchaseRequestChild;
    }

    @BeforeEach
    public void initTest() {
        purchaseRequestChild = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseRequestChild() throws Exception {
        int databaseSizeBeforeCreate = purchaseRequestChildRepository.findAll().size();

        // Create the PurchaseRequestChild
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);
        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isCreated());

        // Validate the PurchaseRequestChild in the database
        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseRequestChild testPurchaseRequestChild = purchaseRequestChildList.get(purchaseRequestChildList.size() - 1);
        assertThat(testPurchaseRequestChild.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testPurchaseRequestChild.getOrderedDate()).isEqualTo(DEFAULT_ORDERED_DATE);
        assertThat(testPurchaseRequestChild.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testPurchaseRequestChild.isCommited()).isEqualTo(DEFAULT_COMMITED);
        assertThat(testPurchaseRequestChild.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPurchaseRequestChild.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createPurchaseRequestChildWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseRequestChildRepository.findAll().size();

        // Create the PurchaseRequestChild with an existing ID
        purchaseRequestChild.setId(1L);
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseRequestChild in the database
        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseRequestChildRepository.findAll().size();
        // set the field null
        purchaseRequestChild.setQuantity(null);

        // Create the PurchaseRequestChild, which fails.
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOrderedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseRequestChildRepository.findAll().size();
        // set the field null
        purchaseRequestChild.setOrderedDate(null);

        // Create the PurchaseRequestChild, which fails.
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDueDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseRequestChildRepository.findAll().size();
        // set the field null
        purchaseRequestChild.setDueDate(null);

        // Create the PurchaseRequestChild, which fails.
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCommitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseRequestChildRepository.findAll().size();
        // set the field null
        purchaseRequestChild.setCommited(null);

        // Create the PurchaseRequestChild, which fails.
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseRequestChildRepository.findAll().size();
        // set the field null
        purchaseRequestChild.setStatus(null);

        // Create the PurchaseRequestChild, which fails.
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        restPurchaseRequestChildMockMvc.perform(post("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPurchaseRequestChildren() throws Exception {
        // Initialize the database
        purchaseRequestChildRepository.saveAndFlush(purchaseRequestChild);

        // Get all the purchaseRequestChildList
        restPurchaseRequestChildMockMvc.perform(get("/api/purchase-request-children?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseRequestChild.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].orderedDate").value(hasItem(DEFAULT_ORDERED_DATE.toString())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].commited").value(hasItem(DEFAULT_COMMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
    }
    
    @Test
    @Transactional
    public void getPurchaseRequestChild() throws Exception {
        // Initialize the database
        purchaseRequestChildRepository.saveAndFlush(purchaseRequestChild);

        // Get the purchaseRequestChild
        restPurchaseRequestChildMockMvc.perform(get("/api/purchase-request-children/{id}", purchaseRequestChild.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseRequestChild.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.orderedDate").value(DEFAULT_ORDERED_DATE.toString()))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.commited").value(DEFAULT_COMMITED.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT));
    }

    @Test
    @Transactional
    public void getNonExistingPurchaseRequestChild() throws Exception {
        // Get the purchaseRequestChild
        restPurchaseRequestChildMockMvc.perform(get("/api/purchase-request-children/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseRequestChild() throws Exception {
        // Initialize the database
        purchaseRequestChildRepository.saveAndFlush(purchaseRequestChild);

        int databaseSizeBeforeUpdate = purchaseRequestChildRepository.findAll().size();

        // Update the purchaseRequestChild
        PurchaseRequestChild updatedPurchaseRequestChild = purchaseRequestChildRepository.findById(purchaseRequestChild.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseRequestChild are not directly saved in db
        em.detach(updatedPurchaseRequestChild);
        updatedPurchaseRequestChild
            .quantity(UPDATED_QUANTITY)
            .orderedDate(UPDATED_ORDERED_DATE)
            .dueDate(UPDATED_DUE_DATE)
            .commited(UPDATED_COMMITED)
            .status(UPDATED_STATUS)
            .comment(UPDATED_COMMENT);
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(updatedPurchaseRequestChild);

        restPurchaseRequestChildMockMvc.perform(put("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isOk());

        // Validate the PurchaseRequestChild in the database
        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeUpdate);
        PurchaseRequestChild testPurchaseRequestChild = purchaseRequestChildList.get(purchaseRequestChildList.size() - 1);
        assertThat(testPurchaseRequestChild.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testPurchaseRequestChild.getOrderedDate()).isEqualTo(UPDATED_ORDERED_DATE);
        assertThat(testPurchaseRequestChild.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testPurchaseRequestChild.isCommited()).isEqualTo(UPDATED_COMMITED);
        assertThat(testPurchaseRequestChild.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPurchaseRequestChild.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseRequestChild() throws Exception {
        int databaseSizeBeforeUpdate = purchaseRequestChildRepository.findAll().size();

        // Create the PurchaseRequestChild
        PurchaseRequestChildDTO purchaseRequestChildDTO = purchaseRequestChildMapper.toDto(purchaseRequestChild);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseRequestChildMockMvc.perform(put("/api/purchase-request-children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purchaseRequestChildDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseRequestChild in the database
        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseRequestChild() throws Exception {
        // Initialize the database
        purchaseRequestChildRepository.saveAndFlush(purchaseRequestChild);

        int databaseSizeBeforeDelete = purchaseRequestChildRepository.findAll().size();

        // Delete the purchaseRequestChild
        restPurchaseRequestChildMockMvc.perform(delete("/api/purchase-request-children/{id}", purchaseRequestChild.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseRequestChild> purchaseRequestChildList = purchaseRequestChildRepository.findAll();
        assertThat(purchaseRequestChildList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseRequestChild.class);
        PurchaseRequestChild purchaseRequestChild1 = new PurchaseRequestChild();
        purchaseRequestChild1.setId(1L);
        PurchaseRequestChild purchaseRequestChild2 = new PurchaseRequestChild();
        purchaseRequestChild2.setId(purchaseRequestChild1.getId());
        assertThat(purchaseRequestChild1).isEqualTo(purchaseRequestChild2);
        purchaseRequestChild2.setId(2L);
        assertThat(purchaseRequestChild1).isNotEqualTo(purchaseRequestChild2);
        purchaseRequestChild1.setId(null);
        assertThat(purchaseRequestChild1).isNotEqualTo(purchaseRequestChild2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseRequestChildDTO.class);
        PurchaseRequestChildDTO purchaseRequestChildDTO1 = new PurchaseRequestChildDTO();
        purchaseRequestChildDTO1.setId(1L);
        PurchaseRequestChildDTO purchaseRequestChildDTO2 = new PurchaseRequestChildDTO();
        assertThat(purchaseRequestChildDTO1).isNotEqualTo(purchaseRequestChildDTO2);
        purchaseRequestChildDTO2.setId(purchaseRequestChildDTO1.getId());
        assertThat(purchaseRequestChildDTO1).isEqualTo(purchaseRequestChildDTO2);
        purchaseRequestChildDTO2.setId(2L);
        assertThat(purchaseRequestChildDTO1).isNotEqualTo(purchaseRequestChildDTO2);
        purchaseRequestChildDTO1.setId(null);
        assertThat(purchaseRequestChildDTO1).isNotEqualTo(purchaseRequestChildDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(purchaseRequestChildMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(purchaseRequestChildMapper.fromId(null)).isNull();
    }
}
