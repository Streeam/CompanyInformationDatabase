package com.streeam.cid.service;

import com.streeam.cid.domain.Version;
import com.streeam.cid.repository.VersionRepository;
import com.streeam.cid.service.dto.VersionDTO;
import com.streeam.cid.service.mapper.VersionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Version}.
 */
@Service
@Transactional
public class VersionService {

    private final Logger log = LoggerFactory.getLogger(VersionService.class);

    private final VersionRepository versionRepository;

    private final VersionMapper versionMapper;

    public VersionService(VersionRepository versionRepository, VersionMapper versionMapper) {
        this.versionRepository = versionRepository;
        this.versionMapper = versionMapper;
    }

    /**
     * Save a version.
     *
     * @param versionDTO the entity to save.
     * @return the persisted entity.
     */
    public VersionDTO save(VersionDTO versionDTO) {
        log.debug("Request to save Version : {}", versionDTO);
        Version version = versionMapper.toEntity(versionDTO);
        version = versionRepository.save(version);
        return versionMapper.toDto(version);
    }

    /**
     * Get all the versions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<VersionDTO> findAll() {
        log.debug("Request to get all Versions");
        return versionRepository.findAll().stream()
            .map(versionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one version by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VersionDTO> findOne(Long id) {
        log.debug("Request to get Version : {}", id);
        return versionRepository.findById(id)
            .map(versionMapper::toDto);
    }

    /**
     * Delete the version by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Version : {}", id);
        versionRepository.deleteById(id);
    }
}
