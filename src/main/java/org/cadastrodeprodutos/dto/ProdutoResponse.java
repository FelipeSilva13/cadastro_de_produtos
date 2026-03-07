package org.cadastrodeprodutos.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoResponse {

    int id;
    String nome;
    double preco;
    int quantidade;
    String descricao;
}
