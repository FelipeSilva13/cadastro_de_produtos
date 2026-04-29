package org.cadastrodeprodutos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClienteRequest(

        @NotBlank(message =  "O nome é obrigatorio")
        String nome,

        @NotNull
        String email,

        @NotNull
        String telefone,

        @NotBlank(message = " O CPF é obrigatorio")
        String cpf
) {
}
