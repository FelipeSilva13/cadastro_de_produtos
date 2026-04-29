package org.cadastrodeprodutos.dto;


public record ClienteResponse(

        int id,

        String nome,

        String cpf,

        String endereco,

        String telefone
) {
}
