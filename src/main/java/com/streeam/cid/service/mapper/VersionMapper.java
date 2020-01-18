package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.VersionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Version} and its DTO {@link VersionDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, AmendmentMapper.class, PrototypeMapper.class, RoutingMapper.class})
public interface VersionMapper extends EntityMapper<VersionDTO, Version> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "amendment.id", target = "amendmentId")
    @Mapping(source = "prototype.id", target = "prototypeId")
    @Mapping(source = "routing.id", target = "routingId")
    VersionDTO toDto(Version version);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "amendmentId", target = "amendment")
    @Mapping(source = "prototypeId", target = "prototype")
    @Mapping(source = "routingId", target = "routing")
    Version toEntity(VersionDTO versionDTO);

    default Version fromId(Long id) {
        if (id == null) {
            return null;
        }
        Version version = new Version();
        version.setId(id);
        return version;
    }
}
