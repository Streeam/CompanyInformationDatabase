package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Roles;
import com.streeam.cid.repository.RolesRepository;
import com.streeam.cid.service.RolesService;
import com.streeam.cid.service.dto.RolesDTO;
import com.streeam.cid.service.mapper.RolesMapper;
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
 * Integration tests for the {@link RolesResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class RolesResourceIT {

    private static final Boolean DEFAULT_RAISE_NONCONFORMACE = false;
    private static final Boolean UPDATED_RAISE_NONCONFORMACE = true;

    private static final Boolean DEFAULT_VIEW_NONCONFORMANCE = false;
    private static final Boolean UPDATED_VIEW_NONCONFORMANCE = true;

    private static final Boolean DEFAULT_EDIT_NONCONFORMANCE = false;
    private static final Boolean UPDATED_EDIT_NONCONFORMANCE = true;

    private static final Boolean DEFAULT_VIEW_NONCONFORMANCE_TASKS = false;
    private static final Boolean UPDATED_VIEW_NONCONFORMANCE_TASKS = true;

    private static final Boolean DEFAULT_EDIT_NONCONFORMANCE_TASKS = false;
    private static final Boolean UPDATED_EDIT_NONCONFORMANCE_TASKS = true;

    private static final Boolean DEFAULT_DELETE_NONCONFORMANCE_TASKS = false;
    private static final Boolean UPDATED_DELETE_NONCONFORMANCE_TASKS = true;

    private static final Boolean DEFAULT_DELETE_NONCONFORMANCE = false;
    private static final Boolean UPDATED_DELETE_NONCONFORMANCE = true;

    private static final Boolean DEFAULT_RAISE_CHANGE_REQUEST = false;
    private static final Boolean UPDATED_RAISE_CHANGE_REQUEST = true;

    private static final Boolean DEFAULT_VIEW_COST_ANALYSES = false;
    private static final Boolean UPDATED_VIEW_COST_ANALYSES = true;

    private static final Boolean DEFAULT_EDIT_COST_ANALYSES = false;
    private static final Boolean UPDATED_EDIT_COST_ANALYSES = true;

    private static final Boolean DEFAULT_VIEW_REQUEST_SUBMITED = false;
    private static final Boolean UPDATED_VIEW_REQUEST_SUBMITED = true;

    private static final Boolean DEFAULT_EDIT_REQUEST_SUBMITED = false;
    private static final Boolean UPDATED_EDIT_REQUEST_SUBMITED = true;

    private static final Boolean DEFAULT_APPROVE_REQUEST_SUBMITED = false;
    private static final Boolean UPDATED_APPROVE_REQUEST_SUBMITED = true;

    private static final Boolean DEFAULT_VIEW_PENDING_SUBMITED = false;
    private static final Boolean UPDATED_VIEW_PENDING_SUBMITED = true;

    private static final Boolean DEFAULT_EDIT_PENDING_SUBMITED = false;
    private static final Boolean UPDATED_EDIT_PENDING_SUBMITED = true;

    private static final Boolean DEFAULT_APPROVE_PENDING_SUBMITED = false;
    private static final Boolean UPDATED_APPROVE_PENDING_SUBMITED = true;

    private static final Boolean DEFAULT_VIEW_REJECTED = false;
    private static final Boolean UPDATED_VIEW_REJECTED = true;

    private static final Boolean DEFAULT_EDIT_REJECTED = false;
    private static final Boolean UPDATED_EDIT_REJECTED = true;

    private static final Boolean DEFAULT_EDIT_PURCHASE_REQUEST = false;
    private static final Boolean UPDATED_EDIT_PURCHASE_REQUEST = true;

    private static final Boolean DEFAULT_DELETE_PURCHASE_REQUEST = false;
    private static final Boolean UPDATED_DELETE_PURCHASE_REQUEST = true;

    private static final Boolean DEFAULT_EDIT_PRODUCT_STOCK = false;
    private static final Boolean UPDATED_EDIT_PRODUCT_STOCK = true;

    private static final Boolean DEFAULT_ADD_PRODUCT = false;
    private static final Boolean UPDATED_ADD_PRODUCT = true;

    private static final Boolean DEFAULT_DELETE_PRODUCT = false;
    private static final Boolean UPDATED_DELETE_PRODUCT = true;

    private static final Boolean DEFAULT_EDIT_PRODUCT = false;
    private static final Boolean UPDATED_EDIT_PRODUCT = true;

    private static final Boolean DEFAULT_ADD_CUSTOMER = false;
    private static final Boolean UPDATED_ADD_CUSTOMER = true;

    private static final Boolean DEFAULT_DELETE_CUSTOMER = false;
    private static final Boolean UPDATED_DELETE_CUSTOMER = true;

    private static final Boolean DEFAULT_EDIT_CUSTOMER = false;
    private static final Boolean UPDATED_EDIT_CUSTOMER = true;

    private static final Boolean DEFAULT_ADD_SUPPLIER = false;
    private static final Boolean UPDATED_ADD_SUPPLIER = true;

    private static final Boolean DEFAULT_DELETE_SUPPLIER = false;
    private static final Boolean UPDATED_DELETE_SUPPLIER = true;

    private static final Boolean DEFAULT_EDIT_SUPPLIER = false;
    private static final Boolean UPDATED_EDIT_SUPPLIER = true;

    private static final Boolean DEFAULT_RAISE_TASK = false;
    private static final Boolean UPDATED_RAISE_TASK = true;

    private static final Boolean DEFAULT_ADD_PROGRESS_TRACK = false;
    private static final Boolean UPDATED_ADD_PROGRESS_TRACK = true;

    private static final Boolean DEFAULT_DELETE_PROGRESS_TRACK = false;
    private static final Boolean UPDATED_DELETE_PROGRESS_TRACK = true;

    private static final Boolean DEFAULT_EDIT_PROGRESS_TRACK = false;
    private static final Boolean UPDATED_EDIT_PROGRESS_TRACK = true;

    private static final Boolean DEFAULT_VIEW_PROGRESS_TRACK = false;
    private static final Boolean UPDATED_VIEW_PROGRESS_TRACK = true;

    private static final Boolean DEFAULT_ADD_NON_CONFORMANCE_REASON = false;
    private static final Boolean UPDATED_ADD_NON_CONFORMANCE_REASON = true;

    private static final Boolean DEFAULT_ADD_ROOT_CAUSES = false;
    private static final Boolean UPDATED_ADD_ROOT_CAUSES = true;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private RolesMapper rolesMapper;

    @Autowired
    private RolesService rolesService;

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

    private MockMvc restRolesMockMvc;

    private Roles roles;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RolesResource rolesResource = new RolesResource(rolesService);
        this.restRolesMockMvc = MockMvcBuilders.standaloneSetup(rolesResource)
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
    public static Roles createEntity(EntityManager em) {
        Roles roles = new Roles()
            .raiseNonconformace(DEFAULT_RAISE_NONCONFORMACE)
            .viewNonconformance(DEFAULT_VIEW_NONCONFORMANCE)
            .editNonconformance(DEFAULT_EDIT_NONCONFORMANCE)
            .viewNonconformanceTasks(DEFAULT_VIEW_NONCONFORMANCE_TASKS)
            .editNonconformanceTasks(DEFAULT_EDIT_NONCONFORMANCE_TASKS)
            .deleteNonconformanceTasks(DEFAULT_DELETE_NONCONFORMANCE_TASKS)
            .deleteNonconformance(DEFAULT_DELETE_NONCONFORMANCE)
            .raiseChangeRequest(DEFAULT_RAISE_CHANGE_REQUEST)
            .viewCostAnalyses(DEFAULT_VIEW_COST_ANALYSES)
            .editCostAnalyses(DEFAULT_EDIT_COST_ANALYSES)
            .viewRequestSubmited(DEFAULT_VIEW_REQUEST_SUBMITED)
            .editRequestSubmited(DEFAULT_EDIT_REQUEST_SUBMITED)
            .approveRequestSubmited(DEFAULT_APPROVE_REQUEST_SUBMITED)
            .viewPendingSubmited(DEFAULT_VIEW_PENDING_SUBMITED)
            .editPendingSubmited(DEFAULT_EDIT_PENDING_SUBMITED)
            .approvePendingSubmited(DEFAULT_APPROVE_PENDING_SUBMITED)
            .viewRejected(DEFAULT_VIEW_REJECTED)
            .editRejected(DEFAULT_EDIT_REJECTED)
            .editPurchaseRequest(DEFAULT_EDIT_PURCHASE_REQUEST)
            .deletePurchaseRequest(DEFAULT_DELETE_PURCHASE_REQUEST)
            .editProductStock(DEFAULT_EDIT_PRODUCT_STOCK)
            .addProduct(DEFAULT_ADD_PRODUCT)
            .deleteProduct(DEFAULT_DELETE_PRODUCT)
            .editProduct(DEFAULT_EDIT_PRODUCT)
            .addCustomer(DEFAULT_ADD_CUSTOMER)
            .deleteCustomer(DEFAULT_DELETE_CUSTOMER)
            .editCustomer(DEFAULT_EDIT_CUSTOMER)
            .addSupplier(DEFAULT_ADD_SUPPLIER)
            .deleteSupplier(DEFAULT_DELETE_SUPPLIER)
            .editSupplier(DEFAULT_EDIT_SUPPLIER)
            .raiseTask(DEFAULT_RAISE_TASK)
            .addProgressTrack(DEFAULT_ADD_PROGRESS_TRACK)
            .deleteProgressTrack(DEFAULT_DELETE_PROGRESS_TRACK)
            .editProgressTrack(DEFAULT_EDIT_PROGRESS_TRACK)
            .viewProgressTrack(DEFAULT_VIEW_PROGRESS_TRACK)
            .addNonConformanceReason(DEFAULT_ADD_NON_CONFORMANCE_REASON)
            .addRootCauses(DEFAULT_ADD_ROOT_CAUSES);
        return roles;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Roles createUpdatedEntity(EntityManager em) {
        Roles roles = new Roles()
            .raiseNonconformace(UPDATED_RAISE_NONCONFORMACE)
            .viewNonconformance(UPDATED_VIEW_NONCONFORMANCE)
            .editNonconformance(UPDATED_EDIT_NONCONFORMANCE)
            .viewNonconformanceTasks(UPDATED_VIEW_NONCONFORMANCE_TASKS)
            .editNonconformanceTasks(UPDATED_EDIT_NONCONFORMANCE_TASKS)
            .deleteNonconformanceTasks(UPDATED_DELETE_NONCONFORMANCE_TASKS)
            .deleteNonconformance(UPDATED_DELETE_NONCONFORMANCE)
            .raiseChangeRequest(UPDATED_RAISE_CHANGE_REQUEST)
            .viewCostAnalyses(UPDATED_VIEW_COST_ANALYSES)
            .editCostAnalyses(UPDATED_EDIT_COST_ANALYSES)
            .viewRequestSubmited(UPDATED_VIEW_REQUEST_SUBMITED)
            .editRequestSubmited(UPDATED_EDIT_REQUEST_SUBMITED)
            .approveRequestSubmited(UPDATED_APPROVE_REQUEST_SUBMITED)
            .viewPendingSubmited(UPDATED_VIEW_PENDING_SUBMITED)
            .editPendingSubmited(UPDATED_EDIT_PENDING_SUBMITED)
            .approvePendingSubmited(UPDATED_APPROVE_PENDING_SUBMITED)
            .viewRejected(UPDATED_VIEW_REJECTED)
            .editRejected(UPDATED_EDIT_REJECTED)
            .editPurchaseRequest(UPDATED_EDIT_PURCHASE_REQUEST)
            .deletePurchaseRequest(UPDATED_DELETE_PURCHASE_REQUEST)
            .editProductStock(UPDATED_EDIT_PRODUCT_STOCK)
            .addProduct(UPDATED_ADD_PRODUCT)
            .deleteProduct(UPDATED_DELETE_PRODUCT)
            .editProduct(UPDATED_EDIT_PRODUCT)
            .addCustomer(UPDATED_ADD_CUSTOMER)
            .deleteCustomer(UPDATED_DELETE_CUSTOMER)
            .editCustomer(UPDATED_EDIT_CUSTOMER)
            .addSupplier(UPDATED_ADD_SUPPLIER)
            .deleteSupplier(UPDATED_DELETE_SUPPLIER)
            .editSupplier(UPDATED_EDIT_SUPPLIER)
            .raiseTask(UPDATED_RAISE_TASK)
            .addProgressTrack(UPDATED_ADD_PROGRESS_TRACK)
            .deleteProgressTrack(UPDATED_DELETE_PROGRESS_TRACK)
            .editProgressTrack(UPDATED_EDIT_PROGRESS_TRACK)
            .viewProgressTrack(UPDATED_VIEW_PROGRESS_TRACK)
            .addNonConformanceReason(UPDATED_ADD_NON_CONFORMANCE_REASON)
            .addRootCauses(UPDATED_ADD_ROOT_CAUSES);
        return roles;
    }

    @BeforeEach
    public void initTest() {
        roles = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoles() throws Exception {
        int databaseSizeBeforeCreate = rolesRepository.findAll().size();

        // Create the Roles
        RolesDTO rolesDTO = rolesMapper.toDto(roles);
        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isCreated());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeCreate + 1);
        Roles testRoles = rolesList.get(rolesList.size() - 1);
        assertThat(testRoles.isRaiseNonconformace()).isEqualTo(DEFAULT_RAISE_NONCONFORMACE);
        assertThat(testRoles.isViewNonconformance()).isEqualTo(DEFAULT_VIEW_NONCONFORMANCE);
        assertThat(testRoles.isEditNonconformance()).isEqualTo(DEFAULT_EDIT_NONCONFORMANCE);
        assertThat(testRoles.isViewNonconformanceTasks()).isEqualTo(DEFAULT_VIEW_NONCONFORMANCE_TASKS);
        assertThat(testRoles.isEditNonconformanceTasks()).isEqualTo(DEFAULT_EDIT_NONCONFORMANCE_TASKS);
        assertThat(testRoles.isDeleteNonconformanceTasks()).isEqualTo(DEFAULT_DELETE_NONCONFORMANCE_TASKS);
        assertThat(testRoles.isDeleteNonconformance()).isEqualTo(DEFAULT_DELETE_NONCONFORMANCE);
        assertThat(testRoles.isRaiseChangeRequest()).isEqualTo(DEFAULT_RAISE_CHANGE_REQUEST);
        assertThat(testRoles.isViewCostAnalyses()).isEqualTo(DEFAULT_VIEW_COST_ANALYSES);
        assertThat(testRoles.isEditCostAnalyses()).isEqualTo(DEFAULT_EDIT_COST_ANALYSES);
        assertThat(testRoles.isViewRequestSubmited()).isEqualTo(DEFAULT_VIEW_REQUEST_SUBMITED);
        assertThat(testRoles.isEditRequestSubmited()).isEqualTo(DEFAULT_EDIT_REQUEST_SUBMITED);
        assertThat(testRoles.isApproveRequestSubmited()).isEqualTo(DEFAULT_APPROVE_REQUEST_SUBMITED);
        assertThat(testRoles.isViewPendingSubmited()).isEqualTo(DEFAULT_VIEW_PENDING_SUBMITED);
        assertThat(testRoles.isEditPendingSubmited()).isEqualTo(DEFAULT_EDIT_PENDING_SUBMITED);
        assertThat(testRoles.isApprovePendingSubmited()).isEqualTo(DEFAULT_APPROVE_PENDING_SUBMITED);
        assertThat(testRoles.isViewRejected()).isEqualTo(DEFAULT_VIEW_REJECTED);
        assertThat(testRoles.isEditRejected()).isEqualTo(DEFAULT_EDIT_REJECTED);
        assertThat(testRoles.isEditPurchaseRequest()).isEqualTo(DEFAULT_EDIT_PURCHASE_REQUEST);
        assertThat(testRoles.isDeletePurchaseRequest()).isEqualTo(DEFAULT_DELETE_PURCHASE_REQUEST);
        assertThat(testRoles.isEditProductStock()).isEqualTo(DEFAULT_EDIT_PRODUCT_STOCK);
        assertThat(testRoles.isAddProduct()).isEqualTo(DEFAULT_ADD_PRODUCT);
        assertThat(testRoles.isDeleteProduct()).isEqualTo(DEFAULT_DELETE_PRODUCT);
        assertThat(testRoles.isEditProduct()).isEqualTo(DEFAULT_EDIT_PRODUCT);
        assertThat(testRoles.isAddCustomer()).isEqualTo(DEFAULT_ADD_CUSTOMER);
        assertThat(testRoles.isDeleteCustomer()).isEqualTo(DEFAULT_DELETE_CUSTOMER);
        assertThat(testRoles.isEditCustomer()).isEqualTo(DEFAULT_EDIT_CUSTOMER);
        assertThat(testRoles.isAddSupplier()).isEqualTo(DEFAULT_ADD_SUPPLIER);
        assertThat(testRoles.isDeleteSupplier()).isEqualTo(DEFAULT_DELETE_SUPPLIER);
        assertThat(testRoles.isEditSupplier()).isEqualTo(DEFAULT_EDIT_SUPPLIER);
        assertThat(testRoles.isRaiseTask()).isEqualTo(DEFAULT_RAISE_TASK);
        assertThat(testRoles.isAddProgressTrack()).isEqualTo(DEFAULT_ADD_PROGRESS_TRACK);
        assertThat(testRoles.isDeleteProgressTrack()).isEqualTo(DEFAULT_DELETE_PROGRESS_TRACK);
        assertThat(testRoles.isEditProgressTrack()).isEqualTo(DEFAULT_EDIT_PROGRESS_TRACK);
        assertThat(testRoles.isViewProgressTrack()).isEqualTo(DEFAULT_VIEW_PROGRESS_TRACK);
        assertThat(testRoles.isAddNonConformanceReason()).isEqualTo(DEFAULT_ADD_NON_CONFORMANCE_REASON);
        assertThat(testRoles.isAddRootCauses()).isEqualTo(DEFAULT_ADD_ROOT_CAUSES);
    }

    @Test
    @Transactional
    public void createRolesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rolesRepository.findAll().size();

        // Create the Roles with an existing ID
        roles.setId(1L);
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRaiseNonconformaceIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setRaiseNonconformace(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewNonconformanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewNonconformance(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditNonconformanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditNonconformance(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewNonconformanceTasksIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewNonconformanceTasks(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditNonconformanceTasksIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditNonconformanceTasks(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeleteNonconformanceTasksIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeleteNonconformanceTasks(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeleteNonconformanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeleteNonconformance(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRaiseChangeRequestIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setRaiseChangeRequest(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewCostAnalysesIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewCostAnalyses(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditCostAnalysesIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditCostAnalyses(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewRequestSubmitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewRequestSubmited(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditRequestSubmitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditRequestSubmited(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApproveRequestSubmitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setApproveRequestSubmited(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewPendingSubmitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewPendingSubmited(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditPendingSubmitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditPendingSubmited(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApprovePendingSubmitedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setApprovePendingSubmited(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewRejectedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewRejected(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditRejectedIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditRejected(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditPurchaseRequestIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditPurchaseRequest(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeletePurchaseRequestIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeletePurchaseRequest(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditProductStockIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditProductStock(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddProductIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setAddProduct(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeleteProductIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeleteProduct(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditProductIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditProduct(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddCustomerIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setAddCustomer(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeleteCustomerIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeleteCustomer(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditCustomerIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditCustomer(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddSupplierIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setAddSupplier(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeleteSupplierIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeleteSupplier(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditSupplierIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditSupplier(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRaiseTaskIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setRaiseTask(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddProgressTrackIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setAddProgressTrack(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDeleteProgressTrackIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setDeleteProgressTrack(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEditProgressTrackIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setEditProgressTrack(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkViewProgressTrackIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setViewProgressTrack(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddNonConformanceReasonIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setAddNonConformanceReason(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddRootCausesIsRequired() throws Exception {
        int databaseSizeBeforeTest = rolesRepository.findAll().size();
        // set the field null
        roles.setAddRootCauses(null);

        // Create the Roles, which fails.
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        restRolesMockMvc.perform(post("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRoles() throws Exception {
        // Initialize the database
        rolesRepository.saveAndFlush(roles);

        // Get all the rolesList
        restRolesMockMvc.perform(get("/api/roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roles.getId().intValue())))
            .andExpect(jsonPath("$.[*].raiseNonconformace").value(hasItem(DEFAULT_RAISE_NONCONFORMACE.booleanValue())))
            .andExpect(jsonPath("$.[*].viewNonconformance").value(hasItem(DEFAULT_VIEW_NONCONFORMANCE.booleanValue())))
            .andExpect(jsonPath("$.[*].editNonconformance").value(hasItem(DEFAULT_EDIT_NONCONFORMANCE.booleanValue())))
            .andExpect(jsonPath("$.[*].viewNonconformanceTasks").value(hasItem(DEFAULT_VIEW_NONCONFORMANCE_TASKS.booleanValue())))
            .andExpect(jsonPath("$.[*].editNonconformanceTasks").value(hasItem(DEFAULT_EDIT_NONCONFORMANCE_TASKS.booleanValue())))
            .andExpect(jsonPath("$.[*].deleteNonconformanceTasks").value(hasItem(DEFAULT_DELETE_NONCONFORMANCE_TASKS.booleanValue())))
            .andExpect(jsonPath("$.[*].deleteNonconformance").value(hasItem(DEFAULT_DELETE_NONCONFORMANCE.booleanValue())))
            .andExpect(jsonPath("$.[*].raiseChangeRequest").value(hasItem(DEFAULT_RAISE_CHANGE_REQUEST.booleanValue())))
            .andExpect(jsonPath("$.[*].viewCostAnalyses").value(hasItem(DEFAULT_VIEW_COST_ANALYSES.booleanValue())))
            .andExpect(jsonPath("$.[*].editCostAnalyses").value(hasItem(DEFAULT_EDIT_COST_ANALYSES.booleanValue())))
            .andExpect(jsonPath("$.[*].viewRequestSubmited").value(hasItem(DEFAULT_VIEW_REQUEST_SUBMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].editRequestSubmited").value(hasItem(DEFAULT_EDIT_REQUEST_SUBMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].approveRequestSubmited").value(hasItem(DEFAULT_APPROVE_REQUEST_SUBMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].viewPendingSubmited").value(hasItem(DEFAULT_VIEW_PENDING_SUBMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].editPendingSubmited").value(hasItem(DEFAULT_EDIT_PENDING_SUBMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].approvePendingSubmited").value(hasItem(DEFAULT_APPROVE_PENDING_SUBMITED.booleanValue())))
            .andExpect(jsonPath("$.[*].viewRejected").value(hasItem(DEFAULT_VIEW_REJECTED.booleanValue())))
            .andExpect(jsonPath("$.[*].editRejected").value(hasItem(DEFAULT_EDIT_REJECTED.booleanValue())))
            .andExpect(jsonPath("$.[*].editPurchaseRequest").value(hasItem(DEFAULT_EDIT_PURCHASE_REQUEST.booleanValue())))
            .andExpect(jsonPath("$.[*].deletePurchaseRequest").value(hasItem(DEFAULT_DELETE_PURCHASE_REQUEST.booleanValue())))
            .andExpect(jsonPath("$.[*].editProductStock").value(hasItem(DEFAULT_EDIT_PRODUCT_STOCK.booleanValue())))
            .andExpect(jsonPath("$.[*].addProduct").value(hasItem(DEFAULT_ADD_PRODUCT.booleanValue())))
            .andExpect(jsonPath("$.[*].deleteProduct").value(hasItem(DEFAULT_DELETE_PRODUCT.booleanValue())))
            .andExpect(jsonPath("$.[*].editProduct").value(hasItem(DEFAULT_EDIT_PRODUCT.booleanValue())))
            .andExpect(jsonPath("$.[*].addCustomer").value(hasItem(DEFAULT_ADD_CUSTOMER.booleanValue())))
            .andExpect(jsonPath("$.[*].deleteCustomer").value(hasItem(DEFAULT_DELETE_CUSTOMER.booleanValue())))
            .andExpect(jsonPath("$.[*].editCustomer").value(hasItem(DEFAULT_EDIT_CUSTOMER.booleanValue())))
            .andExpect(jsonPath("$.[*].addSupplier").value(hasItem(DEFAULT_ADD_SUPPLIER.booleanValue())))
            .andExpect(jsonPath("$.[*].deleteSupplier").value(hasItem(DEFAULT_DELETE_SUPPLIER.booleanValue())))
            .andExpect(jsonPath("$.[*].editSupplier").value(hasItem(DEFAULT_EDIT_SUPPLIER.booleanValue())))
            .andExpect(jsonPath("$.[*].raiseTask").value(hasItem(DEFAULT_RAISE_TASK.booleanValue())))
            .andExpect(jsonPath("$.[*].addProgressTrack").value(hasItem(DEFAULT_ADD_PROGRESS_TRACK.booleanValue())))
            .andExpect(jsonPath("$.[*].deleteProgressTrack").value(hasItem(DEFAULT_DELETE_PROGRESS_TRACK.booleanValue())))
            .andExpect(jsonPath("$.[*].editProgressTrack").value(hasItem(DEFAULT_EDIT_PROGRESS_TRACK.booleanValue())))
            .andExpect(jsonPath("$.[*].viewProgressTrack").value(hasItem(DEFAULT_VIEW_PROGRESS_TRACK.booleanValue())))
            .andExpect(jsonPath("$.[*].addNonConformanceReason").value(hasItem(DEFAULT_ADD_NON_CONFORMANCE_REASON.booleanValue())))
            .andExpect(jsonPath("$.[*].addRootCauses").value(hasItem(DEFAULT_ADD_ROOT_CAUSES.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRoles() throws Exception {
        // Initialize the database
        rolesRepository.saveAndFlush(roles);

        // Get the roles
        restRolesMockMvc.perform(get("/api/roles/{id}", roles.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roles.getId().intValue()))
            .andExpect(jsonPath("$.raiseNonconformace").value(DEFAULT_RAISE_NONCONFORMACE.booleanValue()))
            .andExpect(jsonPath("$.viewNonconformance").value(DEFAULT_VIEW_NONCONFORMANCE.booleanValue()))
            .andExpect(jsonPath("$.editNonconformance").value(DEFAULT_EDIT_NONCONFORMANCE.booleanValue()))
            .andExpect(jsonPath("$.viewNonconformanceTasks").value(DEFAULT_VIEW_NONCONFORMANCE_TASKS.booleanValue()))
            .andExpect(jsonPath("$.editNonconformanceTasks").value(DEFAULT_EDIT_NONCONFORMANCE_TASKS.booleanValue()))
            .andExpect(jsonPath("$.deleteNonconformanceTasks").value(DEFAULT_DELETE_NONCONFORMANCE_TASKS.booleanValue()))
            .andExpect(jsonPath("$.deleteNonconformance").value(DEFAULT_DELETE_NONCONFORMANCE.booleanValue()))
            .andExpect(jsonPath("$.raiseChangeRequest").value(DEFAULT_RAISE_CHANGE_REQUEST.booleanValue()))
            .andExpect(jsonPath("$.viewCostAnalyses").value(DEFAULT_VIEW_COST_ANALYSES.booleanValue()))
            .andExpect(jsonPath("$.editCostAnalyses").value(DEFAULT_EDIT_COST_ANALYSES.booleanValue()))
            .andExpect(jsonPath("$.viewRequestSubmited").value(DEFAULT_VIEW_REQUEST_SUBMITED.booleanValue()))
            .andExpect(jsonPath("$.editRequestSubmited").value(DEFAULT_EDIT_REQUEST_SUBMITED.booleanValue()))
            .andExpect(jsonPath("$.approveRequestSubmited").value(DEFAULT_APPROVE_REQUEST_SUBMITED.booleanValue()))
            .andExpect(jsonPath("$.viewPendingSubmited").value(DEFAULT_VIEW_PENDING_SUBMITED.booleanValue()))
            .andExpect(jsonPath("$.editPendingSubmited").value(DEFAULT_EDIT_PENDING_SUBMITED.booleanValue()))
            .andExpect(jsonPath("$.approvePendingSubmited").value(DEFAULT_APPROVE_PENDING_SUBMITED.booleanValue()))
            .andExpect(jsonPath("$.viewRejected").value(DEFAULT_VIEW_REJECTED.booleanValue()))
            .andExpect(jsonPath("$.editRejected").value(DEFAULT_EDIT_REJECTED.booleanValue()))
            .andExpect(jsonPath("$.editPurchaseRequest").value(DEFAULT_EDIT_PURCHASE_REQUEST.booleanValue()))
            .andExpect(jsonPath("$.deletePurchaseRequest").value(DEFAULT_DELETE_PURCHASE_REQUEST.booleanValue()))
            .andExpect(jsonPath("$.editProductStock").value(DEFAULT_EDIT_PRODUCT_STOCK.booleanValue()))
            .andExpect(jsonPath("$.addProduct").value(DEFAULT_ADD_PRODUCT.booleanValue()))
            .andExpect(jsonPath("$.deleteProduct").value(DEFAULT_DELETE_PRODUCT.booleanValue()))
            .andExpect(jsonPath("$.editProduct").value(DEFAULT_EDIT_PRODUCT.booleanValue()))
            .andExpect(jsonPath("$.addCustomer").value(DEFAULT_ADD_CUSTOMER.booleanValue()))
            .andExpect(jsonPath("$.deleteCustomer").value(DEFAULT_DELETE_CUSTOMER.booleanValue()))
            .andExpect(jsonPath("$.editCustomer").value(DEFAULT_EDIT_CUSTOMER.booleanValue()))
            .andExpect(jsonPath("$.addSupplier").value(DEFAULT_ADD_SUPPLIER.booleanValue()))
            .andExpect(jsonPath("$.deleteSupplier").value(DEFAULT_DELETE_SUPPLIER.booleanValue()))
            .andExpect(jsonPath("$.editSupplier").value(DEFAULT_EDIT_SUPPLIER.booleanValue()))
            .andExpect(jsonPath("$.raiseTask").value(DEFAULT_RAISE_TASK.booleanValue()))
            .andExpect(jsonPath("$.addProgressTrack").value(DEFAULT_ADD_PROGRESS_TRACK.booleanValue()))
            .andExpect(jsonPath("$.deleteProgressTrack").value(DEFAULT_DELETE_PROGRESS_TRACK.booleanValue()))
            .andExpect(jsonPath("$.editProgressTrack").value(DEFAULT_EDIT_PROGRESS_TRACK.booleanValue()))
            .andExpect(jsonPath("$.viewProgressTrack").value(DEFAULT_VIEW_PROGRESS_TRACK.booleanValue()))
            .andExpect(jsonPath("$.addNonConformanceReason").value(DEFAULT_ADD_NON_CONFORMANCE_REASON.booleanValue()))
            .andExpect(jsonPath("$.addRootCauses").value(DEFAULT_ADD_ROOT_CAUSES.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRoles() throws Exception {
        // Get the roles
        restRolesMockMvc.perform(get("/api/roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoles() throws Exception {
        // Initialize the database
        rolesRepository.saveAndFlush(roles);

        int databaseSizeBeforeUpdate = rolesRepository.findAll().size();

        // Update the roles
        Roles updatedRoles = rolesRepository.findById(roles.getId()).get();
        // Disconnect from session so that the updates on updatedRoles are not directly saved in db
        em.detach(updatedRoles);
        updatedRoles
            .raiseNonconformace(UPDATED_RAISE_NONCONFORMACE)
            .viewNonconformance(UPDATED_VIEW_NONCONFORMANCE)
            .editNonconformance(UPDATED_EDIT_NONCONFORMANCE)
            .viewNonconformanceTasks(UPDATED_VIEW_NONCONFORMANCE_TASKS)
            .editNonconformanceTasks(UPDATED_EDIT_NONCONFORMANCE_TASKS)
            .deleteNonconformanceTasks(UPDATED_DELETE_NONCONFORMANCE_TASKS)
            .deleteNonconformance(UPDATED_DELETE_NONCONFORMANCE)
            .raiseChangeRequest(UPDATED_RAISE_CHANGE_REQUEST)
            .viewCostAnalyses(UPDATED_VIEW_COST_ANALYSES)
            .editCostAnalyses(UPDATED_EDIT_COST_ANALYSES)
            .viewRequestSubmited(UPDATED_VIEW_REQUEST_SUBMITED)
            .editRequestSubmited(UPDATED_EDIT_REQUEST_SUBMITED)
            .approveRequestSubmited(UPDATED_APPROVE_REQUEST_SUBMITED)
            .viewPendingSubmited(UPDATED_VIEW_PENDING_SUBMITED)
            .editPendingSubmited(UPDATED_EDIT_PENDING_SUBMITED)
            .approvePendingSubmited(UPDATED_APPROVE_PENDING_SUBMITED)
            .viewRejected(UPDATED_VIEW_REJECTED)
            .editRejected(UPDATED_EDIT_REJECTED)
            .editPurchaseRequest(UPDATED_EDIT_PURCHASE_REQUEST)
            .deletePurchaseRequest(UPDATED_DELETE_PURCHASE_REQUEST)
            .editProductStock(UPDATED_EDIT_PRODUCT_STOCK)
            .addProduct(UPDATED_ADD_PRODUCT)
            .deleteProduct(UPDATED_DELETE_PRODUCT)
            .editProduct(UPDATED_EDIT_PRODUCT)
            .addCustomer(UPDATED_ADD_CUSTOMER)
            .deleteCustomer(UPDATED_DELETE_CUSTOMER)
            .editCustomer(UPDATED_EDIT_CUSTOMER)
            .addSupplier(UPDATED_ADD_SUPPLIER)
            .deleteSupplier(UPDATED_DELETE_SUPPLIER)
            .editSupplier(UPDATED_EDIT_SUPPLIER)
            .raiseTask(UPDATED_RAISE_TASK)
            .addProgressTrack(UPDATED_ADD_PROGRESS_TRACK)
            .deleteProgressTrack(UPDATED_DELETE_PROGRESS_TRACK)
            .editProgressTrack(UPDATED_EDIT_PROGRESS_TRACK)
            .viewProgressTrack(UPDATED_VIEW_PROGRESS_TRACK)
            .addNonConformanceReason(UPDATED_ADD_NON_CONFORMANCE_REASON)
            .addRootCauses(UPDATED_ADD_ROOT_CAUSES);
        RolesDTO rolesDTO = rolesMapper.toDto(updatedRoles);

        restRolesMockMvc.perform(put("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isOk());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeUpdate);
        Roles testRoles = rolesList.get(rolesList.size() - 1);
        assertThat(testRoles.isRaiseNonconformace()).isEqualTo(UPDATED_RAISE_NONCONFORMACE);
        assertThat(testRoles.isViewNonconformance()).isEqualTo(UPDATED_VIEW_NONCONFORMANCE);
        assertThat(testRoles.isEditNonconformance()).isEqualTo(UPDATED_EDIT_NONCONFORMANCE);
        assertThat(testRoles.isViewNonconformanceTasks()).isEqualTo(UPDATED_VIEW_NONCONFORMANCE_TASKS);
        assertThat(testRoles.isEditNonconformanceTasks()).isEqualTo(UPDATED_EDIT_NONCONFORMANCE_TASKS);
        assertThat(testRoles.isDeleteNonconformanceTasks()).isEqualTo(UPDATED_DELETE_NONCONFORMANCE_TASKS);
        assertThat(testRoles.isDeleteNonconformance()).isEqualTo(UPDATED_DELETE_NONCONFORMANCE);
        assertThat(testRoles.isRaiseChangeRequest()).isEqualTo(UPDATED_RAISE_CHANGE_REQUEST);
        assertThat(testRoles.isViewCostAnalyses()).isEqualTo(UPDATED_VIEW_COST_ANALYSES);
        assertThat(testRoles.isEditCostAnalyses()).isEqualTo(UPDATED_EDIT_COST_ANALYSES);
        assertThat(testRoles.isViewRequestSubmited()).isEqualTo(UPDATED_VIEW_REQUEST_SUBMITED);
        assertThat(testRoles.isEditRequestSubmited()).isEqualTo(UPDATED_EDIT_REQUEST_SUBMITED);
        assertThat(testRoles.isApproveRequestSubmited()).isEqualTo(UPDATED_APPROVE_REQUEST_SUBMITED);
        assertThat(testRoles.isViewPendingSubmited()).isEqualTo(UPDATED_VIEW_PENDING_SUBMITED);
        assertThat(testRoles.isEditPendingSubmited()).isEqualTo(UPDATED_EDIT_PENDING_SUBMITED);
        assertThat(testRoles.isApprovePendingSubmited()).isEqualTo(UPDATED_APPROVE_PENDING_SUBMITED);
        assertThat(testRoles.isViewRejected()).isEqualTo(UPDATED_VIEW_REJECTED);
        assertThat(testRoles.isEditRejected()).isEqualTo(UPDATED_EDIT_REJECTED);
        assertThat(testRoles.isEditPurchaseRequest()).isEqualTo(UPDATED_EDIT_PURCHASE_REQUEST);
        assertThat(testRoles.isDeletePurchaseRequest()).isEqualTo(UPDATED_DELETE_PURCHASE_REQUEST);
        assertThat(testRoles.isEditProductStock()).isEqualTo(UPDATED_EDIT_PRODUCT_STOCK);
        assertThat(testRoles.isAddProduct()).isEqualTo(UPDATED_ADD_PRODUCT);
        assertThat(testRoles.isDeleteProduct()).isEqualTo(UPDATED_DELETE_PRODUCT);
        assertThat(testRoles.isEditProduct()).isEqualTo(UPDATED_EDIT_PRODUCT);
        assertThat(testRoles.isAddCustomer()).isEqualTo(UPDATED_ADD_CUSTOMER);
        assertThat(testRoles.isDeleteCustomer()).isEqualTo(UPDATED_DELETE_CUSTOMER);
        assertThat(testRoles.isEditCustomer()).isEqualTo(UPDATED_EDIT_CUSTOMER);
        assertThat(testRoles.isAddSupplier()).isEqualTo(UPDATED_ADD_SUPPLIER);
        assertThat(testRoles.isDeleteSupplier()).isEqualTo(UPDATED_DELETE_SUPPLIER);
        assertThat(testRoles.isEditSupplier()).isEqualTo(UPDATED_EDIT_SUPPLIER);
        assertThat(testRoles.isRaiseTask()).isEqualTo(UPDATED_RAISE_TASK);
        assertThat(testRoles.isAddProgressTrack()).isEqualTo(UPDATED_ADD_PROGRESS_TRACK);
        assertThat(testRoles.isDeleteProgressTrack()).isEqualTo(UPDATED_DELETE_PROGRESS_TRACK);
        assertThat(testRoles.isEditProgressTrack()).isEqualTo(UPDATED_EDIT_PROGRESS_TRACK);
        assertThat(testRoles.isViewProgressTrack()).isEqualTo(UPDATED_VIEW_PROGRESS_TRACK);
        assertThat(testRoles.isAddNonConformanceReason()).isEqualTo(UPDATED_ADD_NON_CONFORMANCE_REASON);
        assertThat(testRoles.isAddRootCauses()).isEqualTo(UPDATED_ADD_ROOT_CAUSES);
    }

    @Test
    @Transactional
    public void updateNonExistingRoles() throws Exception {
        int databaseSizeBeforeUpdate = rolesRepository.findAll().size();

        // Create the Roles
        RolesDTO rolesDTO = rolesMapper.toDto(roles);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRolesMockMvc.perform(put("/api/roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rolesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Roles in the database
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoles() throws Exception {
        // Initialize the database
        rolesRepository.saveAndFlush(roles);

        int databaseSizeBeforeDelete = rolesRepository.findAll().size();

        // Delete the roles
        restRolesMockMvc.perform(delete("/api/roles/{id}", roles.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Roles> rolesList = rolesRepository.findAll();
        assertThat(rolesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
