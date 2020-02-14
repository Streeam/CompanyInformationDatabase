package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.BomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bom} and its DTO {@link BomDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BomMapper extends EntityMapper<BomDTO, Bom> {


    @Mapping(target = "products", ignore = true)
    @Mapping(target = "removeProduct", ignore = true)
    Bom toEntity(BomDTO bomDTO);

    default Bom fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bom bom = new Bom();
        bom.setId(id);
        return bom;
    }
}
