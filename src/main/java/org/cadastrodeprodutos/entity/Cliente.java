package org.cadastrodeprodutos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Cliente {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nome", nullable = false)
    @Size(min = 1, max = 50)
    private String nome;

    @Column(nullable = false, name = "email")
    @Size(min = 1, max = 50)
    private String email;

    @Column(name = "cpf", nullable = false, unique = true)
    @Size(min = 1, max = 50)
    private String cpf;

    @Column(name = "endereco")
    @Size(min = 1, max = 50)
    private String endereco;

    @Column(name = "telefone")
    @Size(min = 1, max = 50)
    private String telefone;


}
