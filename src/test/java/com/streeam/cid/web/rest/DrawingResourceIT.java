package com.streeam.cid.web.rest;

import com.streeam.cid.CidApp;
import com.streeam.cid.domain.Drawing;
import com.streeam.cid.repository.DrawingRepository;
import com.streeam.cid.service.DrawingService;
import com.streeam.cid.service.dto.DrawingDTO;
import com.streeam.cid.service.mapper.DrawingMapper;
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
 * Integration tests for the {@link DrawingResource} REST controller.
 */
@SpringBootTest(classes = CidApp.class)
public class DrawingResourceIT {

    private static final String DEFAULT_DRAWING_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DRAWING_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_DRAWING_ISSUE = "AAAAAAAAAA";
    private static final String UPDATED_DRAWING_ISSUE = "BBBBBBBBBB";

    private static final String DEFAULT_URL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_URL_PATH = "BBBBBBBBBB";

    @Autowired
    private DrawingRepository drawingRepository;

    @Autowired
    private DrawingMapper drawingMapper;

    @Autowired
    private DrawingService drawingService;

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

    private MockMvc restDrawingMockMvc;

    private Drawing drawing;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DrawingResource drawingResource = new DrawingResource(drawingService);
        this.restDrawingMockMvc = MockMvcBuilders.standaloneSetup(drawingResource)
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
    public static Drawing createEntity(EntityManager em) {
        Drawing drawing = new Drawing()
            .drawingNumber(DEFAULT_DRAWING_NUMBER)
            .drawingIssue(DEFAULT_DRAWING_ISSUE)
            .urlPath(DEFAULT_URL_PATH);
        return drawing;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Drawing createUpdatedEntity(EntityManager em) {
        Drawing drawing = new Drawing()
            .drawingNumber(UPDATED_DRAWING_NUMBER)
            .drawingIssue(UPDATED_DRAWING_ISSUE)
            .urlPath(UPDATED_URL_PATH);
        return drawing;
    }

    @BeforeEach
    public void initTest() {
        drawing = createEntity(em);
    }

    @Test
    @Transactional
    public void createDrawing() throws Exception {
        int databaseSizeBeforeCreate = drawingRepository.findAll().size();

        // Create the Drawing
        DrawingDTO drawingDTO = drawingMapper.toDto(drawing);
        restDrawingMockMvc.perform(post("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isCreated());

        // Validate the Drawing in the database
        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeCreate + 1);
        Drawing testDrawing = drawingList.get(drawingList.size() - 1);
        assertThat(testDrawing.getDrawingNumber()).isEqualTo(DEFAULT_DRAWING_NUMBER);
        assertThat(testDrawing.getDrawingIssue()).isEqualTo(DEFAULT_DRAWING_ISSUE);
        assertThat(testDrawing.getUrlPath()).isEqualTo(DEFAULT_URL_PATH);
    }

    @Test
    @Transactional
    public void createDrawingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = drawingRepository.findAll().size();

        // Create the Drawing with an existing ID
        drawing.setId(1L);
        DrawingDTO drawingDTO = drawingMapper.toDto(drawing);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDrawingMockMvc.perform(post("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Drawing in the database
        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDrawingNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = drawingRepository.findAll().size();
        // set the field null
        drawing.setDrawingNumber(null);

        // Create the Drawing, which fails.
        DrawingDTO drawingDTO = drawingMapper.toDto(drawing);

        restDrawingMockMvc.perform(post("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isBadRequest());

        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDrawingIssueIsRequired() throws Exception {
        int databaseSizeBeforeTest = drawingRepository.findAll().size();
        // set the field null
        drawing.setDrawingIssue(null);

        // Create the Drawing, which fails.
        DrawingDTO drawingDTO = drawingMapper.toDto(drawing);

        restDrawingMockMvc.perform(post("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isBadRequest());

        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUrlPathIsRequired() throws Exception {
        int databaseSizeBeforeTest = drawingRepository.findAll().size();
        // set the field null
        drawing.setUrlPath(null);

        // Create the Drawing, which fails.
        DrawingDTO drawingDTO = drawingMapper.toDto(drawing);

        restDrawingMockMvc.perform(post("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isBadRequest());

        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDrawings() throws Exception {
        // Initialize the database
        drawingRepository.saveAndFlush(drawing);

        // Get all the drawingList
        restDrawingMockMvc.perform(get("/api/drawings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drawing.getId().intValue())))
            .andExpect(jsonPath("$.[*].drawingNumber").value(hasItem(DEFAULT_DRAWING_NUMBER)))
            .andExpect(jsonPath("$.[*].drawingIssue").value(hasItem(DEFAULT_DRAWING_ISSUE)))
            .andExpect(jsonPath("$.[*].urlPath").value(hasItem(DEFAULT_URL_PATH)));
    }
    
    @Test
    @Transactional
    public void getDrawing() throws Exception {
        // Initialize the database
        drawingRepository.saveAndFlush(drawing);

        // Get the drawing
        restDrawingMockMvc.perform(get("/api/drawings/{id}", drawing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(drawing.getId().intValue()))
            .andExpect(jsonPath("$.drawingNumber").value(DEFAULT_DRAWING_NUMBER))
            .andExpect(jsonPath("$.drawingIssue").value(DEFAULT_DRAWING_ISSUE))
            .andExpect(jsonPath("$.urlPath").value(DEFAULT_URL_PATH));
    }

    @Test
    @Transactional
    public void getNonExistingDrawing() throws Exception {
        // Get the drawing
        restDrawingMockMvc.perform(get("/api/drawings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDrawing() throws Exception {
        // Initialize the database
        drawingRepository.saveAndFlush(drawing);

        int databaseSizeBeforeUpdate = drawingRepository.findAll().size();

        // Update the drawing
        Drawing updatedDrawing = drawingRepository.findById(drawing.getId()).get();
        // Disconnect from session so that the updates on updatedDrawing are not directly saved in db
        em.detach(updatedDrawing);
        updatedDrawing
            .drawingNumber(UPDATED_DRAWING_NUMBER)
            .drawingIssue(UPDATED_DRAWING_ISSUE)
            .urlPath(UPDATED_URL_PATH);
        DrawingDTO drawingDTO = drawingMapper.toDto(updatedDrawing);

        restDrawingMockMvc.perform(put("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isOk());

        // Validate the Drawing in the database
        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeUpdate);
        Drawing testDrawing = drawingList.get(drawingList.size() - 1);
        assertThat(testDrawing.getDrawingNumber()).isEqualTo(UPDATED_DRAWING_NUMBER);
        assertThat(testDrawing.getDrawingIssue()).isEqualTo(UPDATED_DRAWING_ISSUE);
        assertThat(testDrawing.getUrlPath()).isEqualTo(UPDATED_URL_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingDrawing() throws Exception {
        int databaseSizeBeforeUpdate = drawingRepository.findAll().size();

        // Create the Drawing
        DrawingDTO drawingDTO = drawingMapper.toDto(drawing);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDrawingMockMvc.perform(put("/api/drawings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(drawingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Drawing in the database
        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDrawing() throws Exception {
        // Initialize the database
        drawingRepository.saveAndFlush(drawing);

        int databaseSizeBeforeDelete = drawingRepository.findAll().size();

        // Delete the drawing
        restDrawingMockMvc.perform(delete("/api/drawings/{id}", drawing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Drawing> drawingList = drawingRepository.findAll();
        assertThat(drawingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Drawing.class);
        Drawing drawing1 = new Drawing();
        drawing1.setId(1L);
        Drawing drawing2 = new Drawing();
        drawing2.setId(drawing1.getId());
        assertThat(drawing1).isEqualTo(drawing2);
        drawing2.setId(2L);
        assertThat(drawing1).isNotEqualTo(drawing2);
        drawing1.setId(null);
        assertThat(drawing1).isNotEqualTo(drawing2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DrawingDTO.class);
        DrawingDTO drawingDTO1 = new DrawingDTO();
        drawingDTO1.setId(1L);
        DrawingDTO drawingDTO2 = new DrawingDTO();
        assertThat(drawingDTO1).isNotEqualTo(drawingDTO2);
        drawingDTO2.setId(drawingDTO1.getId());
        assertThat(drawingDTO1).isEqualTo(drawingDTO2);
        drawingDTO2.setId(2L);
        assertThat(drawingDTO1).isNotEqualTo(drawingDTO2);
        drawingDTO1.setId(null);
        assertThat(drawingDTO1).isNotEqualTo(drawingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(drawingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(drawingMapper.fromId(null)).isNull();
    }
}
