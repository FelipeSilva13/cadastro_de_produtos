package org.applogin.cadastrodeprodutos.controller;

import org.applogin.cadastrodeprodutos.entity.Produto;
import org.applogin.cadastrodeprodutos.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> busacr(@PathVariable Integer id) {

        Produto produto = produtoService.buscarProdutoPorId(id);
        return ResponseEntity.ok(produto);
    }
}
