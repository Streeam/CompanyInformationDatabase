package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.LongTermAction;
import com.streeam.cid.service.dto.LongTermActionDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link LongTermAction} and its DTO {@link LongTermActionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LongTermActionMapper extends EntityMapper<LongTermActionDTO, LongTermAction> {



    default LongTermAction fromId(Long id) {
        if (id == null) {
            return null;
        }
        LongTermAction longTermAction = new LongTermAction();
        longTermAction.setId(id);
        return longTermAction;
    }
}
