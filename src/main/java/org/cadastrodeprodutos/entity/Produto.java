package org.applogin.cadastrodeprodutos.entity;

import jakarta.persistence.Entity;

@Entity
public class Produto {

   private Integer id;
   private String nome;
   private double preco;
   private int quantidade;
   private String descricao;

}
