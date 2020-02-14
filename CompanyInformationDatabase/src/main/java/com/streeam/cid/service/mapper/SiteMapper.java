package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.Site;
import com.streeam.cid.service.dto.SiteDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link Site} and its DTO {@link com.streeam.cid.service.dto.SiteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SiteMapper extends EntityMapper<SiteDTO, Site> {



    default Site fromId(Long id) {
        if (id == null) {
            return null;
        }
        Site site = new Site();
        site.setId(id);
        return site;
    }
}
