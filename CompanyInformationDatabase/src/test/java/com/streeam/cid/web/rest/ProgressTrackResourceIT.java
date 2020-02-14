package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.ProgressTrack;
import com.streeam.cid.repository.ProgressTrackRepository;
import com.streeam.cid.service.ProgressTrackService;
import com.streeam.cid.service.dto.ProgressTrackDTO;
import com.streeam.cid.service.mapper.ProgressTrackMapper;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.streeam.cid.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProgressTrackResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class ProgressTrackResourceIT {

    private static final String DEFAULT_PROGRESS_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_PROGRESS_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_COMPLETE = false;
    private static final Boolean UPDATED_COMPLETE = true;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ProgressTrackRepository progressTrackRepository;

    @Autowired
    private ProgressTrackMapper progressTrackMapper;

    @Autowired
    private ProgressTrackService progressTrackService;

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

    private MockMvc restProgressTrackMockMvc;

    private ProgressTrack progressTrack;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProgressTrackResource progressTrackResource = new ProgressTrackResource(progressTrackService);
        this.restProgressTrackMockMvc = MockMvcBuilders.standaloneSetup(progressTrackResource)
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
    public static ProgressTrack createEntity(EntityManager em) {
        ProgressTrack progressTrack = new ProgressTrack()
            .progressDescription(DEFAULT_PROGRESS_DESCRIPTION)
            .complete(DEFAULT_COMPLETE)
            .date(DEFAULT_DATE);
        return progressTrack;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProgressTrack createUpdatedEntity(EntityManager em) {
        ProgressTrack progressTrack = new ProgressTrack()
            .progressDescription(UPDATED_PROGRESS_DESCRIPTION)
            .complete(UPDATED_COMPLETE)
            .date(UPDATED_DATE);
        return progressTrack;
    }

    @BeforeEach
    public void initTest() {
        progressTrack = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgressTrack() throws Exception {
        int databaseSizeBeforeCreate = progressTrackRepository.findAll().size();

        // Create the ProgressTrack
        ProgressTrackDTO progressTrackDTO = progressTrackMapper.toDto(progressTrack);
        restProgressTrackMockMvc.perform(post("/api/progress-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(progressTrackDTO)))
            .andExpect(status().isCreated());

        // Validate the ProgressTrack in the database
        List<ProgressTrack> progressTrackList = progressTrackRepository.findAll();
        assertThat(progressTrackList).hasSize(databaseSizeBeforeCreate + 1);
        ProgressTrack testProgressTrack = progressTrackList.get(progressTrackList.size() - 1);
        assertThat(testProgressTrack.getProgressDescription()).isEqualTo(DEFAULT_PROGRESS_DESCRIPTION);
        assertThat(testProgressTrack.isComplete()).isEqualTo(DEFAULT_COMPLETE);
        assertThat(testProgressTrack.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createProgressTrackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = progressTrackRepository.findAll().size();

        // Create the ProgressTrack with an existing ID
        progressTrack.setId(1L);
        ProgressTrackDTO progressTrackDTO = progressTrackMapper.toDto(progressTrack);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgressTrackMockMvc.perform(post("/api/progress-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(progressTrackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProgressTrack in the database
        List<ProgressTrack> progressTrackList = progressTrackRepository.findAll();
        assertThat(progressTrackList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = progressTrackRepository.findAll().size();
        // set the field null
        progressTrack.setDate(null);

        // Create the ProgressTrack, which fails.
        ProgressTrackDTO progressTrackDTO = progressTrackMapper.toDto(progressTrack);

        restProgressTrackMockMvc.perform(post("/api/progress-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(progressTrackDTO)))
            .andExpect(status().isBadRequest());

        List<ProgressTrack> progressTrackList = progressTrackRepository.findAll();
        assertThat(progressTrackList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProgressTracks() throws Exception {
        // Initialize the database
        progressTrackRepository.saveAndFlush(progressTrack);

        // Get all the progressTrackList
        restProgressTrackMockMvc.perform(get("/api/progress-tracks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(progressTrack.getId().intValue())))
            .andExpect(jsonPath("$.[*].progressDescription").value(hasItem(DEFAULT_PROGRESS_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].complete").value(hasItem(DEFAULT_COMPLETE.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getProgressTrack() throws Exception {
        // Initialize the database
        progressTrackRepository.saveAndFlush(progressTrack);

        // Get the progressTrack
        restProgressTrackMockMvc.perform(get("/api/progress-tracks/{id}", progressTrack.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(progressTrack.getId().intValue()))
            .andExpect(jsonPath("$.progressDescription").value(DEFAULT_PROGRESS_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.complete").value(DEFAULT_COMPLETE.booleanValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProgressTrack() throws Exception {
        // Get the progressTrack
        restProgressTrackMockMvc.perform(get("/api/progress-tracks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgressTrack() throws Exception {
        // Initialize the database
        progressTrackRepository.saveAndFlush(progressTrack);

        int databaseSizeBeforeUpdate = progressTrackRepository.findAll().size();

        // Update the progressTrack
        ProgressTrack updatedProgressTrack = progressTrackRepository.findById(progressTrack.getId()).get();
        // Disconnect from session so that the updates on updatedProgressTrack are not directly saved in db
        em.detach(updatedProgressTrack);
        updatedProgressTrack
            .progressDescription(UPDATED_PROGRESS_DESCRIPTION)
            .complete(UPDATED_COMPLETE)
            .date(UPDATED_DATE);
        ProgressTrackDTO progressTrackDTO = progressTrackMapper.toDto(updatedProgressTrack);

        restProgressTrackMockMvc.perform(put("/api/progress-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(progressTrackDTO)))
            .andExpect(status().isOk());

        // Validate the ProgressTrack in the database
        List<ProgressTrack> progressTrackList = progressTrackRepository.findAll();
        assertThat(progressTrackList).hasSize(databaseSizeBeforeUpdate);
        ProgressTrack testProgressTrack = progressTrackList.get(progressTrackList.size() - 1);
        assertThat(testProgressTrack.getProgressDescription()).isEqualTo(UPDATED_PROGRESS_DESCRIPTION);
        assertThat(testProgressTrack.isComplete()).isEqualTo(UPDATED_COMPLETE);
        assertThat(testProgressTrack.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingProgressTrack() throws Exception {
        int databaseSizeBeforeUpdate = progressTrackRepository.findAll().size();

        // Create the ProgressTrack
        ProgressTrackDTO progressTrackDTO = progressTrackMapper.toDto(progressTrack);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgressTrackMockMvc.perform(put("/api/progress-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(progressTrackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProgressTrack in the database
        List<ProgressTrack> progressTrackList = progressTrackRepository.findAll();
        assertThat(progressTrackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProgressTrack() throws Exception {
        // Initialize the database
        progressTrackRepository.saveAndFlush(progressTrack);

        int databaseSizeBeforeDelete = progressTrackRepository.findAll().size();

        // Delete the progressTrack
        restProgressTrackMockMvc.perform(delete("/api/progress-tracks/{id}", progressTrack.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProgressTrack> progressTrackList = progressTrackRepository.findAll();
        assertThat(progressTrackList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
