package org.cadastrodeprodutos.repository;

import org.cadastrodeprodutos.dto.ItemProdutoRequest;
import org.cadastrodeprodutos.dto.ItemProdutoResponse;
import org.cadastrodeprodutos.entity.ItemProduto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ItemProdutoMapper {

    ItemProduto toEntity(ItemProdutoRequest  itemProdutoRequest);

    ItemProdutoResponse toresponse(ItemProduto itemProduto);

}
