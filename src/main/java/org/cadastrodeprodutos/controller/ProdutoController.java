package org.cadastrodeprodutos.controller;

import org.cadastrodeprodutos.dto.ProdutoRequest;
import org.cadastrodeprodutos.dto.ProdutoResponse;
import org.cadastrodeprodutos.entity.Produto;
import org.cadastrodeprodutos.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }
    // LISTAR
    @GetMapping
    public List<ProdutoResponse> listar() {
        return produtoService.listar();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public ProdutoResponse buscarPorId(@PathVariable Integer id) {
        return produtoService.buscarPorId(id);
    }

    // CRIAR
    @PostMapping
    public ProdutoResponse criar(@RequestBody ProdutoRequest request) {
        return produtoService.criar(request);
    }

    // ATUALIZAR
    @PutMapping("/{id}")
    public ProdutoResponse atualizar(
            @PathVariable Integer id,
            @RequestBody ProdutoRequest request) {

        return produtoService.atualizar(id, request);
    }

    // DELETAR
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        produtoService.deletar(id);
    }
}
