package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.DrawingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Drawing} and its DTO {@link DrawingDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, AmendmentMapper.class, NonConformanceDetailsMapper.class})
public interface DrawingMapper extends EntityMapper<DrawingDTO, Drawing> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "amendment.id", target = "amendmentId")
    @Mapping(source = "nonConformanceDetails.id", target = "nonConformanceDetailsId")
    DrawingDTO toDto(Drawing drawing);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "amendmentId", target = "amendment")
    @Mapping(source = "nonConformanceDetailsId", target = "nonConformanceDetails")
    Drawing toEntity(DrawingDTO drawingDTO);

    default Drawing fromId(Long id) {
        if (id == null) {
            return null;
        }
        Drawing drawing = new Drawing();
        drawing.setId(id);
        return drawing;
    }
}
