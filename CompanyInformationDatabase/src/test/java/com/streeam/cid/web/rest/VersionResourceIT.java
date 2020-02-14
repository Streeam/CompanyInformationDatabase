package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Version;
import com.streeam.cid.repository.VersionRepository;
import com.streeam.cid.service.VersionService;
import com.streeam.cid.service.dto.VersionDTO;
import com.streeam.cid.service.mapper.VersionMapper;
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
 * Integration tests for the {@link VersionResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class VersionResourceIT {

    private static final String DEFAULT_VERSION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_ISSUE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ISSUE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private VersionRepository versionRepository;

    @Autowired
    private VersionMapper versionMapper;

    @Autowired
    private VersionService versionService;

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

    private MockMvc restVersionMockMvc;

    private Version version;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersionResource versionResource = new VersionResource(versionService);
        this.restVersionMockMvc = MockMvcBuilders.standaloneSetup(versionResource)
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
    public static Version createEntity(EntityManager em) {
        Version version = new Version()
            .versionNumber(DEFAULT_VERSION_NUMBER)
            .versionStatus(DEFAULT_VERSION_STATUS)
            .issueNumber(DEFAULT_ISSUE_NUMBER);
        return version;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Version createUpdatedEntity(EntityManager em) {
        Version version = new Version()
            .versionNumber(UPDATED_VERSION_NUMBER)
            .versionStatus(UPDATED_VERSION_STATUS)
            .issueNumber(UPDATED_ISSUE_NUMBER);
        return version;
    }

    @BeforeEach
    public void initTest() {
        version = createEntity(em);
    }

    @Test
    @Transactional
    public void createVersion() throws Exception {
        int databaseSizeBeforeCreate = versionRepository.findAll().size();

        // Create the Version
        VersionDTO versionDTO = versionMapper.toDto(version);
        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionDTO)))
            .andExpect(status().isCreated());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeCreate + 1);
        Version testVersion = versionList.get(versionList.size() - 1);
        assertThat(testVersion.getVersionNumber()).isEqualTo(DEFAULT_VERSION_NUMBER);
        assertThat(testVersion.getVersionStatus()).isEqualTo(DEFAULT_VERSION_STATUS);
        assertThat(testVersion.getIssueNumber()).isEqualTo(DEFAULT_ISSUE_NUMBER);
    }

    @Test
    @Transactional
    public void createVersionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versionRepository.findAll().size();

        // Create the Version with an existing ID
        version.setId(1L);
        VersionDTO versionDTO = versionMapper.toDto(version);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkVersionNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = versionRepository.findAll().size();
        // set the field null
        version.setVersionNumber(null);

        // Create the Version, which fails.
        VersionDTO versionDTO = versionMapper.toDto(version);

        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionDTO)))
            .andExpect(status().isBadRequest());

        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVersionStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = versionRepository.findAll().size();
        // set the field null
        version.setVersionStatus(null);

        // Create the Version, which fails.
        VersionDTO versionDTO = versionMapper.toDto(version);

        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionDTO)))
            .andExpect(status().isBadRequest());

        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVersions() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        // Get all the versionList
        restVersionMockMvc.perform(get("/api/versions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(version.getId().intValue())))
            .andExpect(jsonPath("$.[*].versionNumber").value(hasItem(DEFAULT_VERSION_NUMBER)))
            .andExpect(jsonPath("$.[*].versionStatus").value(hasItem(DEFAULT_VERSION_STATUS)))
            .andExpect(jsonPath("$.[*].issueNumber").value(hasItem(DEFAULT_ISSUE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getVersion() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        // Get the version
        restVersionMockMvc.perform(get("/api/versions/{id}", version.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(version.getId().intValue()))
            .andExpect(jsonPath("$.versionNumber").value(DEFAULT_VERSION_NUMBER))
            .andExpect(jsonPath("$.versionStatus").value(DEFAULT_VERSION_STATUS))
            .andExpect(jsonPath("$.issueNumber").value(DEFAULT_ISSUE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingVersion() throws Exception {
        // Get the version
        restVersionMockMvc.perform(get("/api/versions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVersion() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        int databaseSizeBeforeUpdate = versionRepository.findAll().size();

        // Update the version
        Version updatedVersion = versionRepository.findById(version.getId()).get();
        // Disconnect from session so that the updates on updatedVersion are not directly saved in db
        em.detach(updatedVersion);
        updatedVersion
            .versionNumber(UPDATED_VERSION_NUMBER)
            .versionStatus(UPDATED_VERSION_STATUS)
            .issueNumber(UPDATED_ISSUE_NUMBER);
        VersionDTO versionDTO = versionMapper.toDto(updatedVersion);

        restVersionMockMvc.perform(put("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionDTO)))
            .andExpect(status().isOk());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeUpdate);
        Version testVersion = versionList.get(versionList.size() - 1);
        assertThat(testVersion.getVersionNumber()).isEqualTo(UPDATED_VERSION_NUMBER);
        assertThat(testVersion.getVersionStatus()).isEqualTo(UPDATED_VERSION_STATUS);
        assertThat(testVersion.getIssueNumber()).isEqualTo(UPDATED_ISSUE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingVersion() throws Exception {
        int databaseSizeBeforeUpdate = versionRepository.findAll().size();

        // Create the Version
        VersionDTO versionDTO = versionMapper.toDto(version);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVersionMockMvc.perform(put("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(versionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVersion() throws Exception {
        // Initialize the database
        versionRepository.saveAndFlush(version);

        int databaseSizeBeforeDelete = versionRepository.findAll().size();

        // Delete the version
        restVersionMockMvc.perform(delete("/api/versions/{id}", version.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Version.class);
        Version version1 = new Version();
        version1.setId(1L);
        Version version2 = new Version();
        version2.setId(version1.getId());
        assertThat(version1).isEqualTo(version2);
        version2.setId(2L);
        assertThat(version1).isNotEqualTo(version2);
        version1.setId(null);
        assertThat(version1).isNotEqualTo(version2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VersionDTO.class);
        VersionDTO versionDTO1 = new VersionDTO();
        versionDTO1.setId(1L);
        VersionDTO versionDTO2 = new VersionDTO();
        assertThat(versionDTO1).isNotEqualTo(versionDTO2);
        versionDTO2.setId(versionDTO1.getId());
        assertThat(versionDTO1).isEqualTo(versionDTO2);
        versionDTO2.setId(2L);
        assertThat(versionDTO1).isNotEqualTo(versionDTO2);
        versionDTO1.setId(null);
        assertThat(versionDTO1).isNotEqualTo(versionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(versionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(versionMapper.fromId(null)).isNull();
    }
}
