package org.cadastrodeprodutos.controller;

import org.cadastrodeprodutos.dto.ClienteRequest;
import org.cadastrodeprodutos.dto.ClienteResponse;
import org.cadastrodeprodutos.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cliente")
public class ClienteController {


        @Autowired
        private final ClienteService clienteService;
        private final ClienteController clienteController;

    public ClienteController(ClienteService clienteService, ClienteController clienteController) {
        this.clienteService = clienteService;
        this.clienteController = clienteController;
    }

    // LISTAR
        @GetMapping
        public List<ClienteResponse> listar() {
            return clienteService.listar();
        }

        // BUSCAR POR ID
        @GetMapping("/{id}")
        public ClienteResponse buscarPorId(@PathVariable Integer id) {
            return clienteService.buscarPorId(id);
        }

        // CRIAR
        @PostMapping
        public ClienteResponse criar(@RequestBody ClienteRequest request) {
            return clienteService.criar(request);
        }

        // ATUALIZAR
        @PutMapping("/{id}")
        public ClienteResponse atualizar(
                @PathVariable Integer id,
                @RequestBody ClienteRequest request) {

            return clienteService.atualizar(id, request);
        }

        // DELETAR
        @DeleteMapping("/{id}")
        public void deletar(@PathVariable Integer id) {
            clienteService.deletar(id);
        }
    }

}
