package com.streeam.cid.web.rest;

import com.streeam.cid.service.FileStorageService;
import com.streeam.cid.service.ImageService;
import com.streeam.cid.service.dto.ImageDTO;
import com.streeam.cid.service.util.UploadFileResponse;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.Image}.
 */
@RestController
@RequestMapping("/api")
public class ImageResource {

    private final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private static final String ENTITY_NAME = "image";

    @Autowired
    private FileStorageService fileStorageService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImageService imageService;

    public ImageResource(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * {@code POST  /images} : Create a new image.
     *
     * @param imageDTO the imageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new imageDTO, or with status {@code 400 (Bad Request)} if the image has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/images")
    public ResponseEntity<ImageDTO> createImage(@Valid @RequestBody ImageDTO imageDTO) throws URISyntaxException {
        log.debug("REST request to save Image : {}", imageDTO);
        if (imageDTO.getId() != null) {
            throw new BadRequestAlertException("A new image cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImageDTO result = imageService.save(imageDTO);
        return ResponseEntity.created(new URI("/api/images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /images} : Updates an existing image.
     *
     * @param imageDTO the imageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated imageDTO,
     * or with status {@code 400 (Bad Request)} if the imageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the imageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/images")
    public ResponseEntity<ImageDTO> updateImage(@Valid @RequestBody ImageDTO imageDTO) throws URISyntaxException {
        log.debug("REST request to update Image : {}", imageDTO);
        if (imageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImageDTO result = imageService.save(imageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, imageDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /images} : get all the images.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of images in body.
     */
    @GetMapping("/images")
    public List<ImageDTO> getAllImages() {
        log.debug("REST request to get all Images");
        return imageService.findAll();
    }

    /**
     * {@code GET  /images/:id} : get the "id" image.
     *
     * @param id the id of the imageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the imageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/images/{id}")
    public ResponseEntity<ImageDTO> getImage(@PathVariable Long id) {
        log.debug("REST request to get Image : {}", id);
        Optional<ImageDTO> imageDTO = imageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(imageDTO);
    }

    /**
     * {@code DELETE  /images/:id} : delete the "id" image.
     *
     * @param id the id of the imageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/images/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        log.debug("REST request to delete Image : {}", id);
        boolean result = imageService.delete(id);
        if (!result) {
            throw new BadRequestAlertException("", ENTITY_NAME, "The folder " + id + " could not be deleted");
        }
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }


    @PostMapping("/images/upload/{imageId}")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Long imageId) {
        String fileName = fileStorageService.storeFile(file, imageId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/downloadFile/")
            .path(fileName)
            .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
            file.getContentType(), file.getSize());
    }
//    @PostMapping("/images/uploadMultipleFiles")
//    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
//        return Arrays.asList(files)
//            .stream()
//            .map(file -> uploadFile(file))
//            .collect(Collectors.toList());
//    }

    @GetMapping("/images/download/{fileId}/{fileName:.+}")
    public ResponseEntity downloadFileFromLocal(@PathVariable String fileName, @PathVariable Long fileId, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName, fileId);
        File file = new File(fileName);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
    }
//    @DeleteMapping("/images/download/{fileId:.+}")
//    public ResponseEntity deleteFileFromLocal(@PathVariable Long fileId) {
//        // Load file
//        File file = fileStorageService.loadFile(String.valueOf(fileId));
//        boolean result = FileSystemUtils.deleteRecursively(file);
//        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, String.valueOf(fileId))).build();
//    }
}
