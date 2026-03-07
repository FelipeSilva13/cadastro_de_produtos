package org.applogin.cadastrodeprodutos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.service.registry.HttpServiceGroupConfigurer;

public record ProdutoRequest(

    @NotNull(message = "Id é obrigatório", groups =  HttpServiceGroupConfigurer.Groups.Update.class)
    int id,

    @NotBlank()
    String nome,

    double preco,

    int quantidade,

    String descricao

){}
