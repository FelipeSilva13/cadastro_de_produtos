package org.cadastrodeprodutos.mapper;


import org.cadastrodeprodutos.dto.ClienteRequest;
import org.cadastrodeprodutos.dto.ClienteResponse;
import org.cadastrodeprodutos.entity.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClienteMapper {

    Cliente toEntity(ClienteRequest clienteRequest);

    ClienteResponse toResponse(Cliente cliente);
}
