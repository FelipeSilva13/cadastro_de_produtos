package org.cadastrodeprodutos.mapper;

import org.mapstruct.Mapper;

import org.cadastrodeprodutos.dto.ProdutoRequest;
import org.cadastrodeprodutos.dto.ProdutoResponse;
import org.cadastrodeprodutos.entity.Produto;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    Produto toEntity(ProdutoRequest produtoRequest);

    ProdutoResponse toResponse(Produto produto);
}
