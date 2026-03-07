package org.applogin.cadastrodeprodutos.repository;

import org.applogin.cadastrodeprodutos.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

}
