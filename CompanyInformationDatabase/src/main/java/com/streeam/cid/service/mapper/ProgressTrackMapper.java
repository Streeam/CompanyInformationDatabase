package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.ProgressTrackDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProgressTrack} and its DTO {@link ProgressTrackDTO}.
 */
@Mapper(componentModel = "spring", uses = {TaskMapper.class})
public interface ProgressTrackMapper extends EntityMapper<ProgressTrackDTO, ProgressTrack> {

    @Mapping(source = "task.id", target = "taskId")
    ProgressTrackDTO toDto(ProgressTrack progressTrack);

    @Mapping(source = "taskId", target = "task")
    ProgressTrack toEntity(ProgressTrackDTO progressTrackDTO);

    default ProgressTrack fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProgressTrack progressTrack = new ProgressTrack();
        progressTrack.setId(id);
        return progressTrack;
    }
}
