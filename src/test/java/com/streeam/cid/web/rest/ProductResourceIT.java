package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Product;
import com.streeam.cid.repository.ProductRepository;
import com.streeam.cid.service.ProductService;
import com.streeam.cid.service.dto.ProductDTO;
import com.streeam.cid.service.mapper.ProductMapper;
import com.streeam.cid.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ProductResourceIT {

    private static final String DEFAULT_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PART_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_PART_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PART_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_RELEASE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_RELEASE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PRODUCT_GROUP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_GROUP_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_SITE = "AAAAAAAAAA";
    private static final String UPDATED_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_DEPARTAMENT = "AAAAAAAAAA";
    private static final String UPDATED_DEPARTAMENT = "BBBBBBBBBB";

    private static final String DEFAULT_METHOD_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_METHOD_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_METHOD_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_METHOD_STATUS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PRIME = false;
    private static final Boolean UPDATED_PRIME = true;

    private static final String DEFAULT_UNIT_OF_MEASURE = "AAAAAAAAAA";
    private static final String UPDATED_UNIT_OF_MEASURE = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLIER_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLIER_PART_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_SUPPLIER_PART_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SUPPLIER_PART_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CURENCY = "AAAAAAAAAA";
    private static final String UPDATED_CURENCY = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEAD_TIME = 0;
    private static final Integer UPDATED_LEAD_TIME = 1;

    private static final Double DEFAULT_MIN_QUANTITY = 0D;
    private static final Double UPDATED_MIN_QUANTITY = 1D;

    private static final BigDecimal DEFAULT_LATEST_UNIT_MATERIAL_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_LATEST_UNIT_MATERIAL_COST = new BigDecimal(1);

    private static final BigDecimal DEFAULT_COST_IN_SUPPLIER_CURRENCY = new BigDecimal(0);
    private static final BigDecimal UPDATED_COST_IN_SUPPLIER_CURRENCY = new BigDecimal(1);

    private static final BigDecimal DEFAULT_SUPPLIER_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_SUPPLIER_PRICE = new BigDecimal(1);

    private static final BigDecimal DEFAULT_COST_IN_BASE_CURRENCY = new BigDecimal(0);
    private static final BigDecimal UPDATED_COST_IN_BASE_CURRENCY = new BigDecimal(1);

    private static final Double DEFAULT_SCRAP_PERCENTAGE = 0D;
    private static final Double UPDATED_SCRAP_PERCENTAGE = 1D;

    private static final Double DEFAULT_ON_HAND_STOCK = 0D;
    private static final Double UPDATED_ON_HAND_STOCK = 1D;

    private static final BigDecimal DEFAULT_STANDARD_COMPONENT_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_COMPONENT_COST = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_SUB_CONTRACT_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_SUB_CONTRACT_COST = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_UNIT_MATERIAL_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_UNIT_MATERIAL_COST = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_SET_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_SET_COST = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_RUN_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_RUN_COST = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_LANDED_COST_1 = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_LANDED_COST_1 = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_LANDED_COST_2 = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_LANDED_COST_2 = new BigDecimal(1);

    private static final BigDecimal DEFAULT_STANDARD_LANDED_COST_3 = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_LANDED_COST_3 = new BigDecimal(1);

    private static final String DEFAULT_COMMENT_1 = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT_1 = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT_2 = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT_2 = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT_3 = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT_3 = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_REVIEW_DATE_1 = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REVIEW_DATE_1 = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_REVIEW_DATE_2 = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REVIEW_DATE_2 = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_REVIEW_DATE_3 = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_REVIEW_DATE_3 = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_STANDARD_TOTAL_COST = new BigDecimal(0);
    private static final BigDecimal UPDATED_STANDARD_TOTAL_COST = new BigDecimal(1);

    private static final Double DEFAULT_MIN_BARCH_SIZE = 0D;
    private static final Double UPDATED_MIN_BARCH_SIZE = 1D;

    private static final Boolean DEFAULT_OBSOLETE = false;
    private static final Boolean UPDATED_OBSOLETE = true;

    private static final Integer DEFAULT_ORDER_MULTIPLER = 0;
    private static final Integer UPDATED_ORDER_MULTIPLER = 1;

    @Autowired
    private ProductRepository productRepository;

    @Mock
    private ProductRepository productRepositoryMock;

    @Autowired
    private ProductMapper productMapper;

    @Mock
    private ProductService productServiceMock;

    @Autowired
    private ProductService productService;

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

    private MockMvc restProductMockMvc;

    private Product product;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductResource productResource = new ProductResource(productService);
        this.restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
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
    public static Product createEntity(EntityManager em) {
        Product product = new Product()
            .partNumber(DEFAULT_PART_NUMBER)
            .partDescription(DEFAULT_PART_DESCRIPTION)
            .releaseDate(DEFAULT_RELEASE_DATE)
            .productGroupCode(DEFAULT_PRODUCT_GROUP_CODE)
            .site(DEFAULT_SITE)
            .departament(DEFAULT_DEPARTAMENT)
            .methodType(DEFAULT_METHOD_TYPE)
            .methodStatus(DEFAULT_METHOD_STATUS)
            .prime(DEFAULT_PRIME)
            .unitOfMeasure(DEFAULT_UNIT_OF_MEASURE)
            .supplierPartNumber(DEFAULT_SUPPLIER_PART_NUMBER)
            .supplierPartDescription(DEFAULT_SUPPLIER_PART_DESCRIPTION)
            .curency(DEFAULT_CURENCY)
            .leadTime(DEFAULT_LEAD_TIME)
            .minQuantity(DEFAULT_MIN_QUANTITY)
            .latestUnitMaterialCost(DEFAULT_LATEST_UNIT_MATERIAL_COST)
            .costInSupplierCurrency(DEFAULT_COST_IN_SUPPLIER_CURRENCY)
            .supplierPrice(DEFAULT_SUPPLIER_PRICE)
            .costInBaseCurrency(DEFAULT_COST_IN_BASE_CURRENCY)
            .scrapPercentage(DEFAULT_SCRAP_PERCENTAGE)
            .onHandStock(DEFAULT_ON_HAND_STOCK)
            .standardComponentCost(DEFAULT_STANDARD_COMPONENT_COST)
            .standardSubContractCost(DEFAULT_STANDARD_SUB_CONTRACT_COST)
            .standardUnitMaterialCost(DEFAULT_STANDARD_UNIT_MATERIAL_COST)
            .standardSetCost(DEFAULT_STANDARD_SET_COST)
            .standardRunCost(DEFAULT_STANDARD_RUN_COST)
            .standardLandedCost1(DEFAULT_STANDARD_LANDED_COST_1)
            .standardLandedCost2(DEFAULT_STANDARD_LANDED_COST_2)
            .standardLandedCost3(DEFAULT_STANDARD_LANDED_COST_3)
            .comment1(DEFAULT_COMMENT_1)
            .comment2(DEFAULT_COMMENT_2)
            .comment3(DEFAULT_COMMENT_3)
            .reviewDate1(DEFAULT_REVIEW_DATE_1)
            .reviewDate2(DEFAULT_REVIEW_DATE_2)
            .reviewDate3(DEFAULT_REVIEW_DATE_3)
            .standardTotalCost(DEFAULT_STANDARD_TOTAL_COST)
            .minBarchSize(DEFAULT_MIN_BARCH_SIZE)
            .obsolete(DEFAULT_OBSOLETE)
            .orderMultipler(DEFAULT_ORDER_MULTIPLER);
        return product;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Product createUpdatedEntity(EntityManager em) {
        Product product = new Product()
            .partNumber(UPDATED_PART_NUMBER)
            .partDescription(UPDATED_PART_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .productGroupCode(UPDATED_PRODUCT_GROUP_CODE)
            .site(UPDATED_SITE)
            .departament(UPDATED_DEPARTAMENT)
            .methodType(UPDATED_METHOD_TYPE)
            .methodStatus(UPDATED_METHOD_STATUS)
            .prime(UPDATED_PRIME)
            .unitOfMeasure(UPDATED_UNIT_OF_MEASURE)
            .supplierPartNumber(UPDATED_SUPPLIER_PART_NUMBER)
            .supplierPartDescription(UPDATED_SUPPLIER_PART_DESCRIPTION)
            .curency(UPDATED_CURENCY)
            .leadTime(UPDATED_LEAD_TIME)
            .minQuantity(UPDATED_MIN_QUANTITY)
            .latestUnitMaterialCost(UPDATED_LATEST_UNIT_MATERIAL_COST)
            .costInSupplierCurrency(UPDATED_COST_IN_SUPPLIER_CURRENCY)
            .supplierPrice(UPDATED_SUPPLIER_PRICE)
            .costInBaseCurrency(UPDATED_COST_IN_BASE_CURRENCY)
            .scrapPercentage(UPDATED_SCRAP_PERCENTAGE)
            .onHandStock(UPDATED_ON_HAND_STOCK)
            .standardComponentCost(UPDATED_STANDARD_COMPONENT_COST)
            .standardSubContractCost(UPDATED_STANDARD_SUB_CONTRACT_COST)
            .standardUnitMaterialCost(UPDATED_STANDARD_UNIT_MATERIAL_COST)
            .standardSetCost(UPDATED_STANDARD_SET_COST)
            .standardRunCost(UPDATED_STANDARD_RUN_COST)
            .standardLandedCost1(UPDATED_STANDARD_LANDED_COST_1)
            .standardLandedCost2(UPDATED_STANDARD_LANDED_COST_2)
            .standardLandedCost3(UPDATED_STANDARD_LANDED_COST_3)
            .comment1(UPDATED_COMMENT_1)
            .comment2(UPDATED_COMMENT_2)
            .comment3(UPDATED_COMMENT_3)
            .reviewDate1(UPDATED_REVIEW_DATE_1)
            .reviewDate2(UPDATED_REVIEW_DATE_2)
            .reviewDate3(UPDATED_REVIEW_DATE_3)
            .standardTotalCost(UPDATED_STANDARD_TOTAL_COST)
            .minBarchSize(UPDATED_MIN_BARCH_SIZE)
            .obsolete(UPDATED_OBSOLETE)
            .orderMultipler(UPDATED_ORDER_MULTIPLER);
        return product;
    }

    @BeforeEach
    public void initTest() {
        product = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduct() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isCreated());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate + 1);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getPartNumber()).isEqualTo(DEFAULT_PART_NUMBER);
        assertThat(testProduct.getPartDescription()).isEqualTo(DEFAULT_PART_DESCRIPTION);
        assertThat(testProduct.getReleaseDate()).isEqualTo(DEFAULT_RELEASE_DATE);
        assertThat(testProduct.getProductGroupCode()).isEqualTo(DEFAULT_PRODUCT_GROUP_CODE);
        assertThat(testProduct.getSite()).isEqualTo(DEFAULT_SITE);
        assertThat(testProduct.getDepartament()).isEqualTo(DEFAULT_DEPARTAMENT);
        assertThat(testProduct.getMethodType()).isEqualTo(DEFAULT_METHOD_TYPE);
        assertThat(testProduct.getMethodStatus()).isEqualTo(DEFAULT_METHOD_STATUS);
        assertThat(testProduct.isPrime()).isEqualTo(DEFAULT_PRIME);
        assertThat(testProduct.getUnitOfMeasure()).isEqualTo(DEFAULT_UNIT_OF_MEASURE);
        assertThat(testProduct.getSupplierPartNumber()).isEqualTo(DEFAULT_SUPPLIER_PART_NUMBER);
        assertThat(testProduct.getSupplierPartDescription()).isEqualTo(DEFAULT_SUPPLIER_PART_DESCRIPTION);
        assertThat(testProduct.getCurency()).isEqualTo(DEFAULT_CURENCY);
        assertThat(testProduct.getLeadTime()).isEqualTo(DEFAULT_LEAD_TIME);
        assertThat(testProduct.getMinQuantity()).isEqualTo(DEFAULT_MIN_QUANTITY);
        assertThat(testProduct.getLatestUnitMaterialCost()).isEqualTo(DEFAULT_LATEST_UNIT_MATERIAL_COST);
        assertThat(testProduct.getCostInSupplierCurrency()).isEqualTo(DEFAULT_COST_IN_SUPPLIER_CURRENCY);
        assertThat(testProduct.getSupplierPrice()).isEqualTo(DEFAULT_SUPPLIER_PRICE);
        assertThat(testProduct.getCostInBaseCurrency()).isEqualTo(DEFAULT_COST_IN_BASE_CURRENCY);
        assertThat(testProduct.getScrapPercentage()).isEqualTo(DEFAULT_SCRAP_PERCENTAGE);
        assertThat(testProduct.getOnHandStock()).isEqualTo(DEFAULT_ON_HAND_STOCK);
        assertThat(testProduct.getStandardComponentCost()).isEqualTo(DEFAULT_STANDARD_COMPONENT_COST);
        assertThat(testProduct.getStandardSubContractCost()).isEqualTo(DEFAULT_STANDARD_SUB_CONTRACT_COST);
        assertThat(testProduct.getStandardUnitMaterialCost()).isEqualTo(DEFAULT_STANDARD_UNIT_MATERIAL_COST);
        assertThat(testProduct.getStandardSetCost()).isEqualTo(DEFAULT_STANDARD_SET_COST);
        assertThat(testProduct.getStandardRunCost()).isEqualTo(DEFAULT_STANDARD_RUN_COST);
        assertThat(testProduct.getStandardLandedCost1()).isEqualTo(DEFAULT_STANDARD_LANDED_COST_1);
        assertThat(testProduct.getStandardLandedCost2()).isEqualTo(DEFAULT_STANDARD_LANDED_COST_2);
        assertThat(testProduct.getStandardLandedCost3()).isEqualTo(DEFAULT_STANDARD_LANDED_COST_3);
        assertThat(testProduct.getComment1()).isEqualTo(DEFAULT_COMMENT_1);
        assertThat(testProduct.getComment2()).isEqualTo(DEFAULT_COMMENT_2);
        assertThat(testProduct.getComment3()).isEqualTo(DEFAULT_COMMENT_3);
        assertThat(testProduct.getReviewDate1()).isEqualTo(DEFAULT_REVIEW_DATE_1);
        assertThat(testProduct.getReviewDate2()).isEqualTo(DEFAULT_REVIEW_DATE_2);
        assertThat(testProduct.getReviewDate3()).isEqualTo(DEFAULT_REVIEW_DATE_3);
        assertThat(testProduct.getStandardTotalCost()).isEqualTo(DEFAULT_STANDARD_TOTAL_COST);
        assertThat(testProduct.getMinBarchSize()).isEqualTo(DEFAULT_MIN_BARCH_SIZE);
        assertThat(testProduct.isObsolete()).isEqualTo(DEFAULT_OBSOLETE);
        assertThat(testProduct.getOrderMultipler()).isEqualTo(DEFAULT_ORDER_MULTIPLER);
    }

    @Test
    @Transactional
    public void createProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productRepository.findAll().size();

        // Create the Product with an existing ID
        product.setId(1L);
        ProductDTO productDTO = productMapper.toDto(product);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkPartNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setPartNumber(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPartDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setPartDescription(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReleaseDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setReleaseDate(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProductGroupCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setProductGroupCode(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMethodTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setMethodType(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMethodStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setMethodStatus(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setPrime(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkObsoleteIsRequired() throws Exception {
        int databaseSizeBeforeTest = productRepository.findAll().size();
        // set the field null
        product.setObsolete(null);

        // Create the Product, which fails.
        ProductDTO productDTO = productMapper.toDto(product);

        restProductMockMvc.perform(post("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProducts() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get all the productList
        restProductMockMvc.perform(get("/api/products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(product.getId().intValue())))
            .andExpect(jsonPath("$.[*].partNumber").value(hasItem(DEFAULT_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].partDescription").value(hasItem(DEFAULT_PART_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].releaseDate").value(hasItem(DEFAULT_RELEASE_DATE.toString())))
            .andExpect(jsonPath("$.[*].productGroupCode").value(hasItem(DEFAULT_PRODUCT_GROUP_CODE)))
            .andExpect(jsonPath("$.[*].site").value(hasItem(DEFAULT_SITE)))
            .andExpect(jsonPath("$.[*].departament").value(hasItem(DEFAULT_DEPARTAMENT)))
            .andExpect(jsonPath("$.[*].methodType").value(hasItem(DEFAULT_METHOD_TYPE)))
            .andExpect(jsonPath("$.[*].methodStatus").value(hasItem(DEFAULT_METHOD_STATUS)))
            .andExpect(jsonPath("$.[*].prime").value(hasItem(DEFAULT_PRIME.booleanValue())))
            .andExpect(jsonPath("$.[*].unitOfMeasure").value(hasItem(DEFAULT_UNIT_OF_MEASURE)))
            .andExpect(jsonPath("$.[*].supplierPartNumber").value(hasItem(DEFAULT_SUPPLIER_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].supplierPartDescription").value(hasItem(DEFAULT_SUPPLIER_PART_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].curency").value(hasItem(DEFAULT_CURENCY)))
            .andExpect(jsonPath("$.[*].leadTime").value(hasItem(DEFAULT_LEAD_TIME)))
            .andExpect(jsonPath("$.[*].minQuantity").value(hasItem(DEFAULT_MIN_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].latestUnitMaterialCost").value(hasItem(DEFAULT_LATEST_UNIT_MATERIAL_COST.intValue())))
            .andExpect(jsonPath("$.[*].costInSupplierCurrency").value(hasItem(DEFAULT_COST_IN_SUPPLIER_CURRENCY.intValue())))
            .andExpect(jsonPath("$.[*].supplierPrice").value(hasItem(DEFAULT_SUPPLIER_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].costInBaseCurrency").value(hasItem(DEFAULT_COST_IN_BASE_CURRENCY.intValue())))
            .andExpect(jsonPath("$.[*].scrapPercentage").value(hasItem(DEFAULT_SCRAP_PERCENTAGE.doubleValue())))
            .andExpect(jsonPath("$.[*].onHandStock").value(hasItem(DEFAULT_ON_HAND_STOCK.doubleValue())))
            .andExpect(jsonPath("$.[*].standardComponentCost").value(hasItem(DEFAULT_STANDARD_COMPONENT_COST.intValue())))
            .andExpect(jsonPath("$.[*].standardSubContractCost").value(hasItem(DEFAULT_STANDARD_SUB_CONTRACT_COST.intValue())))
            .andExpect(jsonPath("$.[*].standardUnitMaterialCost").value(hasItem(DEFAULT_STANDARD_UNIT_MATERIAL_COST.intValue())))
            .andExpect(jsonPath("$.[*].standardSetCost").value(hasItem(DEFAULT_STANDARD_SET_COST.intValue())))
            .andExpect(jsonPath("$.[*].standardRunCost").value(hasItem(DEFAULT_STANDARD_RUN_COST.intValue())))
            .andExpect(jsonPath("$.[*].standardLandedCost1").value(hasItem(DEFAULT_STANDARD_LANDED_COST_1.intValue())))
            .andExpect(jsonPath("$.[*].standardLandedCost2").value(hasItem(DEFAULT_STANDARD_LANDED_COST_2.intValue())))
            .andExpect(jsonPath("$.[*].standardLandedCost3").value(hasItem(DEFAULT_STANDARD_LANDED_COST_3.intValue())))
            .andExpect(jsonPath("$.[*].comment1").value(hasItem(DEFAULT_COMMENT_1)))
            .andExpect(jsonPath("$.[*].comment2").value(hasItem(DEFAULT_COMMENT_2)))
            .andExpect(jsonPath("$.[*].comment3").value(hasItem(DEFAULT_COMMENT_3)))
            .andExpect(jsonPath("$.[*].reviewDate1").value(hasItem(DEFAULT_REVIEW_DATE_1.toString())))
            .andExpect(jsonPath("$.[*].reviewDate2").value(hasItem(DEFAULT_REVIEW_DATE_2.toString())))
            .andExpect(jsonPath("$.[*].reviewDate3").value(hasItem(DEFAULT_REVIEW_DATE_3.toString())))
            .andExpect(jsonPath("$.[*].standardTotalCost").value(hasItem(DEFAULT_STANDARD_TOTAL_COST.intValue())))
            .andExpect(jsonPath("$.[*].minBarchSize").value(hasItem(DEFAULT_MIN_BARCH_SIZE.doubleValue())))
            .andExpect(jsonPath("$.[*].obsolete").value(hasItem(DEFAULT_OBSOLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].orderMultipler").value(hasItem(DEFAULT_ORDER_MULTIPLER)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllProductsWithEagerRelationshipsIsEnabled() throws Exception {
        ProductResource productResource = new ProductResource(productServiceMock);
        when(productServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProductMockMvc.perform(get("/api/products?eagerload=true"))
        .andExpect(status().isOk());

        verify(productServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllProductsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProductResource productResource = new ProductResource(productServiceMock);
            when(productServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProductMockMvc = MockMvcBuilders.standaloneSetup(productResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProductMockMvc.perform(get("/api/products?eagerload=true"))
        .andExpect(status().isOk());

            verify(productServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", product.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(product.getId().intValue()))
            .andExpect(jsonPath("$.partNumber").value(DEFAULT_PART_NUMBER))
            .andExpect(jsonPath("$.partDescription").value(DEFAULT_PART_DESCRIPTION))
            .andExpect(jsonPath("$.releaseDate").value(DEFAULT_RELEASE_DATE.toString()))
            .andExpect(jsonPath("$.productGroupCode").value(DEFAULT_PRODUCT_GROUP_CODE))
            .andExpect(jsonPath("$.site").value(DEFAULT_SITE))
            .andExpect(jsonPath("$.departament").value(DEFAULT_DEPARTAMENT))
            .andExpect(jsonPath("$.methodType").value(DEFAULT_METHOD_TYPE))
            .andExpect(jsonPath("$.methodStatus").value(DEFAULT_METHOD_STATUS))
            .andExpect(jsonPath("$.prime").value(DEFAULT_PRIME.booleanValue()))
            .andExpect(jsonPath("$.unitOfMeasure").value(DEFAULT_UNIT_OF_MEASURE))
            .andExpect(jsonPath("$.supplierPartNumber").value(DEFAULT_SUPPLIER_PART_NUMBER))
            .andExpect(jsonPath("$.supplierPartDescription").value(DEFAULT_SUPPLIER_PART_DESCRIPTION))
            .andExpect(jsonPath("$.curency").value(DEFAULT_CURENCY))
            .andExpect(jsonPath("$.leadTime").value(DEFAULT_LEAD_TIME))
            .andExpect(jsonPath("$.minQuantity").value(DEFAULT_MIN_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.latestUnitMaterialCost").value(DEFAULT_LATEST_UNIT_MATERIAL_COST.intValue()))
            .andExpect(jsonPath("$.costInSupplierCurrency").value(DEFAULT_COST_IN_SUPPLIER_CURRENCY.intValue()))
            .andExpect(jsonPath("$.supplierPrice").value(DEFAULT_SUPPLIER_PRICE.intValue()))
            .andExpect(jsonPath("$.costInBaseCurrency").value(DEFAULT_COST_IN_BASE_CURRENCY.intValue()))
            .andExpect(jsonPath("$.scrapPercentage").value(DEFAULT_SCRAP_PERCENTAGE.doubleValue()))
            .andExpect(jsonPath("$.onHandStock").value(DEFAULT_ON_HAND_STOCK.doubleValue()))
            .andExpect(jsonPath("$.standardComponentCost").value(DEFAULT_STANDARD_COMPONENT_COST.intValue()))
            .andExpect(jsonPath("$.standardSubContractCost").value(DEFAULT_STANDARD_SUB_CONTRACT_COST.intValue()))
            .andExpect(jsonPath("$.standardUnitMaterialCost").value(DEFAULT_STANDARD_UNIT_MATERIAL_COST.intValue()))
            .andExpect(jsonPath("$.standardSetCost").value(DEFAULT_STANDARD_SET_COST.intValue()))
            .andExpect(jsonPath("$.standardRunCost").value(DEFAULT_STANDARD_RUN_COST.intValue()))
            .andExpect(jsonPath("$.standardLandedCost1").value(DEFAULT_STANDARD_LANDED_COST_1.intValue()))
            .andExpect(jsonPath("$.standardLandedCost2").value(DEFAULT_STANDARD_LANDED_COST_2.intValue()))
            .andExpect(jsonPath("$.standardLandedCost3").value(DEFAULT_STANDARD_LANDED_COST_3.intValue()))
            .andExpect(jsonPath("$.comment1").value(DEFAULT_COMMENT_1))
            .andExpect(jsonPath("$.comment2").value(DEFAULT_COMMENT_2))
            .andExpect(jsonPath("$.comment3").value(DEFAULT_COMMENT_3))
            .andExpect(jsonPath("$.reviewDate1").value(DEFAULT_REVIEW_DATE_1.toString()))
            .andExpect(jsonPath("$.reviewDate2").value(DEFAULT_REVIEW_DATE_2.toString()))
            .andExpect(jsonPath("$.reviewDate3").value(DEFAULT_REVIEW_DATE_3.toString()))
            .andExpect(jsonPath("$.standardTotalCost").value(DEFAULT_STANDARD_TOTAL_COST.intValue()))
            .andExpect(jsonPath("$.minBarchSize").value(DEFAULT_MIN_BARCH_SIZE.doubleValue()))
            .andExpect(jsonPath("$.obsolete").value(DEFAULT_OBSOLETE.booleanValue()))
            .andExpect(jsonPath("$.orderMultipler").value(DEFAULT_ORDER_MULTIPLER));
    }

    @Test
    @Transactional
    public void getNonExistingProduct() throws Exception {
        // Get the product
        restProductMockMvc.perform(get("/api/products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Update the product
        Product updatedProduct = productRepository.findById(product.getId()).get();
        // Disconnect from session so that the updates on updatedProduct are not directly saved in db
        em.detach(updatedProduct);
        updatedProduct
            .partNumber(UPDATED_PART_NUMBER)
            .partDescription(UPDATED_PART_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .productGroupCode(UPDATED_PRODUCT_GROUP_CODE)
            .site(UPDATED_SITE)
            .departament(UPDATED_DEPARTAMENT)
            .methodType(UPDATED_METHOD_TYPE)
            .methodStatus(UPDATED_METHOD_STATUS)
            .prime(UPDATED_PRIME)
            .unitOfMeasure(UPDATED_UNIT_OF_MEASURE)
            .supplierPartNumber(UPDATED_SUPPLIER_PART_NUMBER)
            .supplierPartDescription(UPDATED_SUPPLIER_PART_DESCRIPTION)
            .curency(UPDATED_CURENCY)
            .leadTime(UPDATED_LEAD_TIME)
            .minQuantity(UPDATED_MIN_QUANTITY)
            .latestUnitMaterialCost(UPDATED_LATEST_UNIT_MATERIAL_COST)
            .costInSupplierCurrency(UPDATED_COST_IN_SUPPLIER_CURRENCY)
            .supplierPrice(UPDATED_SUPPLIER_PRICE)
            .costInBaseCurrency(UPDATED_COST_IN_BASE_CURRENCY)
            .scrapPercentage(UPDATED_SCRAP_PERCENTAGE)
            .onHandStock(UPDATED_ON_HAND_STOCK)
            .standardComponentCost(UPDATED_STANDARD_COMPONENT_COST)
            .standardSubContractCost(UPDATED_STANDARD_SUB_CONTRACT_COST)
            .standardUnitMaterialCost(UPDATED_STANDARD_UNIT_MATERIAL_COST)
            .standardSetCost(UPDATED_STANDARD_SET_COST)
            .standardRunCost(UPDATED_STANDARD_RUN_COST)
            .standardLandedCost1(UPDATED_STANDARD_LANDED_COST_1)
            .standardLandedCost2(UPDATED_STANDARD_LANDED_COST_2)
            .standardLandedCost3(UPDATED_STANDARD_LANDED_COST_3)
            .comment1(UPDATED_COMMENT_1)
            .comment2(UPDATED_COMMENT_2)
            .comment3(UPDATED_COMMENT_3)
            .reviewDate1(UPDATED_REVIEW_DATE_1)
            .reviewDate2(UPDATED_REVIEW_DATE_2)
            .reviewDate3(UPDATED_REVIEW_DATE_3)
            .standardTotalCost(UPDATED_STANDARD_TOTAL_COST)
            .minBarchSize(UPDATED_MIN_BARCH_SIZE)
            .obsolete(UPDATED_OBSOLETE)
            .orderMultipler(UPDATED_ORDER_MULTIPLER);
        ProductDTO productDTO = productMapper.toDto(updatedProduct);

        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isOk());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
        Product testProduct = productList.get(productList.size() - 1);
        assertThat(testProduct.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testProduct.getPartDescription()).isEqualTo(UPDATED_PART_DESCRIPTION);
        assertThat(testProduct.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testProduct.getProductGroupCode()).isEqualTo(UPDATED_PRODUCT_GROUP_CODE);
        assertThat(testProduct.getSite()).isEqualTo(UPDATED_SITE);
        assertThat(testProduct.getDepartament()).isEqualTo(UPDATED_DEPARTAMENT);
        assertThat(testProduct.getMethodType()).isEqualTo(UPDATED_METHOD_TYPE);
        assertThat(testProduct.getMethodStatus()).isEqualTo(UPDATED_METHOD_STATUS);
        assertThat(testProduct.isPrime()).isEqualTo(UPDATED_PRIME);
        assertThat(testProduct.getUnitOfMeasure()).isEqualTo(UPDATED_UNIT_OF_MEASURE);
        assertThat(testProduct.getSupplierPartNumber()).isEqualTo(UPDATED_SUPPLIER_PART_NUMBER);
        assertThat(testProduct.getSupplierPartDescription()).isEqualTo(UPDATED_SUPPLIER_PART_DESCRIPTION);
        assertThat(testProduct.getCurency()).isEqualTo(UPDATED_CURENCY);
        assertThat(testProduct.getLeadTime()).isEqualTo(UPDATED_LEAD_TIME);
        assertThat(testProduct.getMinQuantity()).isEqualTo(UPDATED_MIN_QUANTITY);
        assertThat(testProduct.getLatestUnitMaterialCost()).isEqualTo(UPDATED_LATEST_UNIT_MATERIAL_COST);
        assertThat(testProduct.getCostInSupplierCurrency()).isEqualTo(UPDATED_COST_IN_SUPPLIER_CURRENCY);
        assertThat(testProduct.getSupplierPrice()).isEqualTo(UPDATED_SUPPLIER_PRICE);
        assertThat(testProduct.getCostInBaseCurrency()).isEqualTo(UPDATED_COST_IN_BASE_CURRENCY);
        assertThat(testProduct.getScrapPercentage()).isEqualTo(UPDATED_SCRAP_PERCENTAGE);
        assertThat(testProduct.getOnHandStock()).isEqualTo(UPDATED_ON_HAND_STOCK);
        assertThat(testProduct.getStandardComponentCost()).isEqualTo(UPDATED_STANDARD_COMPONENT_COST);
        assertThat(testProduct.getStandardSubContractCost()).isEqualTo(UPDATED_STANDARD_SUB_CONTRACT_COST);
        assertThat(testProduct.getStandardUnitMaterialCost()).isEqualTo(UPDATED_STANDARD_UNIT_MATERIAL_COST);
        assertThat(testProduct.getStandardSetCost()).isEqualTo(UPDATED_STANDARD_SET_COST);
        assertThat(testProduct.getStandardRunCost()).isEqualTo(UPDATED_STANDARD_RUN_COST);
        assertThat(testProduct.getStandardLandedCost1()).isEqualTo(UPDATED_STANDARD_LANDED_COST_1);
        assertThat(testProduct.getStandardLandedCost2()).isEqualTo(UPDATED_STANDARD_LANDED_COST_2);
        assertThat(testProduct.getStandardLandedCost3()).isEqualTo(UPDATED_STANDARD_LANDED_COST_3);
        assertThat(testProduct.getComment1()).isEqualTo(UPDATED_COMMENT_1);
        assertThat(testProduct.getComment2()).isEqualTo(UPDATED_COMMENT_2);
        assertThat(testProduct.getComment3()).isEqualTo(UPDATED_COMMENT_3);
        assertThat(testProduct.getReviewDate1()).isEqualTo(UPDATED_REVIEW_DATE_1);
        assertThat(testProduct.getReviewDate2()).isEqualTo(UPDATED_REVIEW_DATE_2);
        assertThat(testProduct.getReviewDate3()).isEqualTo(UPDATED_REVIEW_DATE_3);
        assertThat(testProduct.getStandardTotalCost()).isEqualTo(UPDATED_STANDARD_TOTAL_COST);
        assertThat(testProduct.getMinBarchSize()).isEqualTo(UPDATED_MIN_BARCH_SIZE);
        assertThat(testProduct.isObsolete()).isEqualTo(UPDATED_OBSOLETE);
        assertThat(testProduct.getOrderMultipler()).isEqualTo(UPDATED_ORDER_MULTIPLER);
    }

    @Test
    @Transactional
    public void updateNonExistingProduct() throws Exception {
        int databaseSizeBeforeUpdate = productRepository.findAll().size();

        // Create the Product
        ProductDTO productDTO = productMapper.toDto(product);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductMockMvc.perform(put("/api/products")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Product in the database
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProduct() throws Exception {
        // Initialize the database
        productRepository.saveAndFlush(product);

        int databaseSizeBeforeDelete = productRepository.findAll().size();

        // Delete the product
        restProductMockMvc.perform(delete("/api/products/{id}", product.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Product> productList = productRepository.findAll();
        assertThat(productList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
