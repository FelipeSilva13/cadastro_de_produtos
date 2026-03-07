package org.cadastrodeprodutos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name ="nome", length = 50)
    private String nome;

    @Column(name = "preco")
    private double preco;

    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "descricao", length = 500)
    private String descricao;

}
