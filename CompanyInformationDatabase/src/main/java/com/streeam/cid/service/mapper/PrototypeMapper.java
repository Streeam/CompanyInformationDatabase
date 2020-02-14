package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.PrototypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Prototype} and its DTO {@link PrototypeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PrototypeMapper extends EntityMapper<PrototypeDTO, Prototype> {



    default Prototype fromId(Long id) {
        if (id == null) {
            return null;
        }
        Prototype prototype = new Prototype();
        prototype.setId(id);
        return prototype;
    }
}
