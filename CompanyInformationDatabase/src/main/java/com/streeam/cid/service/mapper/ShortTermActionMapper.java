package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.ShortTermAction;
import com.streeam.cid.service.dto.ShortTermActionDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link ShortTermAction} and its DTO {@link ShortTermActionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ShortTermActionMapper extends EntityMapper<ShortTermActionDTO, ShortTermAction> {



    default ShortTermAction fromId(Long id) {
        if (id == null) {
            return null;
        }
        ShortTermAction shortTermAction = new ShortTermAction();
        shortTermAction.setId(id);
        return shortTermAction;
    }
}
