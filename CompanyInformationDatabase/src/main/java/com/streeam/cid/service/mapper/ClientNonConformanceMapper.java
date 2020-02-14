package com.streeam.cid.service.mapper;

import com.streeam.cid.domain.*;
import com.streeam.cid.service.dto.ClientNonConformanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ClientNonConformance} and its DTO {@link ClientNonConformanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, EmployeeMapper.class})
public interface ClientNonConformanceMapper extends EntityMapper<ClientNonConformanceDTO, ClientNonConformance> {

    @Mapping(source = "customer.id", target = "customerId")
    ClientNonConformanceDTO toDto(ClientNonConformance clientNonConformance);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(target = "removeCulpableEmployees", ignore = true)
    ClientNonConformance toEntity(ClientNonConformanceDTO clientNonConformanceDTO);

    default ClientNonConformance fromId(Long id) {
        if (id == null) {
            return null;
        }
        ClientNonConformance clientNonConformance = new ClientNonConformance();
        clientNonConformance.setId(id);
        return clientNonConformance;
    }
}
