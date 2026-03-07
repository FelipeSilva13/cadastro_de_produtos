package org.applogin.cadastrodeprodutos.service;

import org.applogin.cadastrodeprodutos.entity.Produto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    

    public Produto criarProduto(Produto produto){

        return produto;
    }

    public List<Produto> listarProdutos(){

        List<Produto> produtos = repository.findAll();

        if(produtos.isEmpty()){
            return List.of();
        }
        return produtos;

    }

    public Produto buscarProdutoPorId(Integer id){

        Optional<Produto> produtos = repository.findById(id);

        if(produtos.isEmpty()){
            throw new RuntimeException("Produto não encontrado");
        }
        return produtos.get();

    }


    public void excluirProduto(Integer id){

    }

}
