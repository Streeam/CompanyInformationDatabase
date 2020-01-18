package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.ActionToBeTaken;
import com.streeam.cid.domain.NonConformanceType;
import com.streeam.cid.service.dto.ActionToBeTakenDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link NonConformanceType} and its DTO {@link ActionToBeTakenDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ActionToBeTakenMapper extends EntityMapper<ActionToBeTakenDTO, ActionToBeTaken> {



    default ActionToBeTaken fromId(Long id) {
        if (id == null) {
            return null;
        }
        ActionToBeTaken actionToBeTaken = new ActionToBeTaken();
        actionToBeTaken.setId(id);
        return actionToBeTaken;
    }
}
