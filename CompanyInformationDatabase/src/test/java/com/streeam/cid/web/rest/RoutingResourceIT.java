package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Routing;
import com.streeam.cid.repository.RoutingRepository;
import com.streeam.cid.service.RoutingService;
import com.streeam.cid.service.dto.RoutingDTO;
import com.streeam.cid.service.mapper.RoutingMapper;
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
 * Integration tests for the {@link RoutingResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class RoutingResourceIT {

    private static final String DEFAULT_RESOURCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RESOURCE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_RESOURCE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_RESOURCE_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_UNIT_RUN_TIME = 1;
    private static final Integer UPDATED_UNIT_RUN_TIME = 2;

    private static final String DEFAULT_PART_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PART_NUMBER = "BBBBBBBBBB";

    private static final Integer DEFAULT_LAYOUT_TIME = 0;
    private static final Integer UPDATED_LAYOUT_TIME = 1;

    private static final String DEFAULT_UNIQUE_IDENTIFIER = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_IDENTIFIER = "BBBBBBBBBB";

    @Autowired
    private RoutingRepository routingRepository;

    @Autowired
    private RoutingMapper routingMapper;

    @Autowired
    private RoutingService routingService;

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

    private MockMvc restRoutingMockMvc;

    private Routing routing;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoutingResource routingResource = new RoutingResource(routingService);
        this.restRoutingMockMvc = MockMvcBuilders.standaloneSetup(routingResource)
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
    public static Routing createEntity(EntityManager em) {
        Routing routing = new Routing()
            .resourceName(DEFAULT_RESOURCE_NAME)
            .resourceType(DEFAULT_RESOURCE_TYPE)
            .unitRunTime(DEFAULT_UNIT_RUN_TIME)
            .partNumber(DEFAULT_PART_NUMBER)
            .layoutTime(DEFAULT_LAYOUT_TIME)
            .uniqueIdentifier(DEFAULT_UNIQUE_IDENTIFIER);
        return routing;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Routing createUpdatedEntity(EntityManager em) {
        Routing routing = new Routing()
            .resourceName(UPDATED_RESOURCE_NAME)
            .resourceType(UPDATED_RESOURCE_TYPE)
            .unitRunTime(UPDATED_UNIT_RUN_TIME)
            .partNumber(UPDATED_PART_NUMBER)
            .layoutTime(UPDATED_LAYOUT_TIME)
            .uniqueIdentifier(UPDATED_UNIQUE_IDENTIFIER);
        return routing;
    }

    @BeforeEach
    public void initTest() {
        routing = createEntity(em);
    }

    @Test
    @Transactional
    public void createRouting() throws Exception {
        int databaseSizeBeforeCreate = routingRepository.findAll().size();

        // Create the Routing
        RoutingDTO routingDTO = routingMapper.toDto(routing);
        restRoutingMockMvc.perform(post("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isCreated());

        // Validate the Routing in the database
        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeCreate + 1);
        Routing testRouting = routingList.get(routingList.size() - 1);
        assertThat(testRouting.getResourceName()).isEqualTo(DEFAULT_RESOURCE_NAME);
        assertThat(testRouting.getResourceType()).isEqualTo(DEFAULT_RESOURCE_TYPE);
        assertThat(testRouting.getUnitRunTime()).isEqualTo(DEFAULT_UNIT_RUN_TIME);
        assertThat(testRouting.getPartNumber()).isEqualTo(DEFAULT_PART_NUMBER);
        assertThat(testRouting.getLayoutTime()).isEqualTo(DEFAULT_LAYOUT_TIME);
        assertThat(testRouting.getUniqueIdentifier()).isEqualTo(DEFAULT_UNIQUE_IDENTIFIER);
    }

    @Test
    @Transactional
    public void createRoutingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = routingRepository.findAll().size();

        // Create the Routing with an existing ID
        routing.setId(1L);
        RoutingDTO routingDTO = routingMapper.toDto(routing);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoutingMockMvc.perform(post("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Routing in the database
        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkResourceNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = routingRepository.findAll().size();
        // set the field null
        routing.setResourceName(null);

        // Create the Routing, which fails.
        RoutingDTO routingDTO = routingMapper.toDto(routing);

        restRoutingMockMvc.perform(post("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isBadRequest());

        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkResourceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = routingRepository.findAll().size();
        // set the field null
        routing.setResourceType(null);

        // Create the Routing, which fails.
        RoutingDTO routingDTO = routingMapper.toDto(routing);

        restRoutingMockMvc.perform(post("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isBadRequest());

        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnitRunTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = routingRepository.findAll().size();
        // set the field null
        routing.setUnitRunTime(null);

        // Create the Routing, which fails.
        RoutingDTO routingDTO = routingMapper.toDto(routing);

        restRoutingMockMvc.perform(post("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isBadRequest());

        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRoutings() throws Exception {
        // Initialize the database
        routingRepository.saveAndFlush(routing);

        // Get all the routingList
        restRoutingMockMvc.perform(get("/api/routings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(routing.getId().intValue())))
            .andExpect(jsonPath("$.[*].resourceName").value(hasItem(DEFAULT_RESOURCE_NAME)))
            .andExpect(jsonPath("$.[*].resourceType").value(hasItem(DEFAULT_RESOURCE_TYPE)))
            .andExpect(jsonPath("$.[*].unitRunTime").value(hasItem(DEFAULT_UNIT_RUN_TIME)))
            .andExpect(jsonPath("$.[*].partNumber").value(hasItem(DEFAULT_PART_NUMBER)))
            .andExpect(jsonPath("$.[*].layoutTime").value(hasItem(DEFAULT_LAYOUT_TIME)))
            .andExpect(jsonPath("$.[*].uniqueIdentifier").value(hasItem(DEFAULT_UNIQUE_IDENTIFIER)));
    }
    
    @Test
    @Transactional
    public void getRouting() throws Exception {
        // Initialize the database
        routingRepository.saveAndFlush(routing);

        // Get the routing
        restRoutingMockMvc.perform(get("/api/routings/{id}", routing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(routing.getId().intValue()))
            .andExpect(jsonPath("$.resourceName").value(DEFAULT_RESOURCE_NAME))
            .andExpect(jsonPath("$.resourceType").value(DEFAULT_RESOURCE_TYPE))
            .andExpect(jsonPath("$.unitRunTime").value(DEFAULT_UNIT_RUN_TIME))
            .andExpect(jsonPath("$.partNumber").value(DEFAULT_PART_NUMBER))
            .andExpect(jsonPath("$.layoutTime").value(DEFAULT_LAYOUT_TIME))
            .andExpect(jsonPath("$.uniqueIdentifier").value(DEFAULT_UNIQUE_IDENTIFIER));
    }

    @Test
    @Transactional
    public void getNonExistingRouting() throws Exception {
        // Get the routing
        restRoutingMockMvc.perform(get("/api/routings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRouting() throws Exception {
        // Initialize the database
        routingRepository.saveAndFlush(routing);

        int databaseSizeBeforeUpdate = routingRepository.findAll().size();

        // Update the routing
        Routing updatedRouting = routingRepository.findById(routing.getId()).get();
        // Disconnect from session so that the updates on updatedRouting are not directly saved in db
        em.detach(updatedRouting);
        updatedRouting
            .resourceName(UPDATED_RESOURCE_NAME)
            .resourceType(UPDATED_RESOURCE_TYPE)
            .unitRunTime(UPDATED_UNIT_RUN_TIME)
            .partNumber(UPDATED_PART_NUMBER)
            .layoutTime(UPDATED_LAYOUT_TIME)
            .uniqueIdentifier(UPDATED_UNIQUE_IDENTIFIER);
        RoutingDTO routingDTO = routingMapper.toDto(updatedRouting);

        restRoutingMockMvc.perform(put("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isOk());

        // Validate the Routing in the database
        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeUpdate);
        Routing testRouting = routingList.get(routingList.size() - 1);
        assertThat(testRouting.getResourceName()).isEqualTo(UPDATED_RESOURCE_NAME);
        assertThat(testRouting.getResourceType()).isEqualTo(UPDATED_RESOURCE_TYPE);
        assertThat(testRouting.getUnitRunTime()).isEqualTo(UPDATED_UNIT_RUN_TIME);
        assertThat(testRouting.getPartNumber()).isEqualTo(UPDATED_PART_NUMBER);
        assertThat(testRouting.getLayoutTime()).isEqualTo(UPDATED_LAYOUT_TIME);
        assertThat(testRouting.getUniqueIdentifier()).isEqualTo(UPDATED_UNIQUE_IDENTIFIER);
    }

    @Test
    @Transactional
    public void updateNonExistingRouting() throws Exception {
        int databaseSizeBeforeUpdate = routingRepository.findAll().size();

        // Create the Routing
        RoutingDTO routingDTO = routingMapper.toDto(routing);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoutingMockMvc.perform(put("/api/routings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(routingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Routing in the database
        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRouting() throws Exception {
        // Initialize the database
        routingRepository.saveAndFlush(routing);

        int databaseSizeBeforeDelete = routingRepository.findAll().size();

        // Delete the routing
        restRoutingMockMvc.perform(delete("/api/routings/{id}", routing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Routing> routingList = routingRepository.findAll();
        assertThat(routingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
