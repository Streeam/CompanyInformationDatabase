package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.RoutingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Routing} and its DTO {@link RoutingDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RoutingMapper extends EntityMapper<RoutingDTO, Routing> {


    @Mapping(target = "versions", ignore = true)
    @Mapping(target = "removeVersion", ignore = true)
    @Mapping(target = "products", ignore = true)
    @Mapping(target = "removeProducts", ignore = true)
    Routing toEntity(RoutingDTO routingDTO);

    default Routing fromId(Long id) {
        if (id == null) {
            return null;
        }
        Routing routing = new Routing();
        routing.setId(id);
        return routing;
    }
}
