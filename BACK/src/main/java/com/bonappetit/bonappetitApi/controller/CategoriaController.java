package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin
public class CategoriaController {

    @Autowired
    ICategoriaService iCategoriaService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearCategoria(@RequestBody Categoria categoria) {
        iCategoriaService.crearCategoria(categoria);
        return new ResponseEntity<>("Categoria creada", HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> listarCategorias = iCategoriaService.listarCategorias();
        return new ResponseEntity<>(listarCategorias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarCategoria(@PathVariable Long id) {
        return new ResponseEntity<>(iCategoriaService.buscarCategoria(id), HttpStatus.OK);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarCategoria(@RequestBody Categoria categoria) {
        iCategoriaService.actualizarCategoria(categoria);
        return new ResponseEntity<>("Categoria actualizada", HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id) {
        iCategoriaService.eliminarCategoria(id);
        return new ResponseEntity<>("Categoria eliminada", HttpStatus.OK);
    }
}
