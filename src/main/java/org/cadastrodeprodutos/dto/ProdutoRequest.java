package org.cadastrodeprodutos.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProdutoRequest(


    @NotBlank(message = "O nome é obrigatório")
    @Size(max = 50)
    String nome,

    @DecimalMin("0.01")
    double preco,

    @NotNull
    int quantidade,

    @NotNull
    @Size(max = 500)
    String descricao

){

}
