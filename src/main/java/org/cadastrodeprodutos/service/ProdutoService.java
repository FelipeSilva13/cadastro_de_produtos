package org.cadastrodeprodutos.service;

import org.cadastrodeprodutos.dto.ProdutoRequest;
import org.cadastrodeprodutos.dto.ProdutoResponse;
import org.cadastrodeprodutos.entity.Produto;
import org.cadastrodeprodutos.mapper.ProdutoMapper;
import org.cadastrodeprodutos.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ProdutoMapper produtoMapper;

    public ProdutoService(ProdutoRepository produtoRepository, ProdutoMapper produtoMapper) {
        this.produtoRepository = produtoRepository;
        this.produtoMapper = produtoMapper;
    }

    // LISTAR
    public List<ProdutoResponse> listar() {
        return produtoRepository.findAll()
                .stream()
                .map(produtoMapper::toResponse)
                .toList();
    }

    // BUSCAR POR ID
    public ProdutoResponse buscarPorId(Integer id) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        return produtoMapper.toResponse(produto);
    }

    // CRIAR
    public ProdutoResponse criar(ProdutoRequest request) {

        Produto produto = produtoMapper.toEntity(request);

        Produto salvo = produtoRepository.save(produto);

        return produtoMapper.toResponse(salvo);
    }

    // ATUALIZAR
    public ProdutoResponse atualizar(Integer id, ProdutoRequest request) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(request.nome());
        produto.setPreco(request.preco());

        Produto atualizado = produtoRepository.save(produto);

        return produtoMapper.toResponse(atualizado);
    }

    // DELETAR
    public void deletar(Integer id) {
        produtoRepository.deleteById(id);
    }

}
