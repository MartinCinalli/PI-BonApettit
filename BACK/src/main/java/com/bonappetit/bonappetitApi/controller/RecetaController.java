package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.dto.entrada.RecetaEntradaDto;
import com.bonappetit.bonappetitApi.entity.Receta;
import com.bonappetit.bonappetitApi.service.IRecetaService;
import com.bonappetit.bonappetitApi.service.impl.CalificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/recetas")
@CrossOrigin
public class RecetaController {

    @Autowired
    IRecetaService iRecetaService;
    @Autowired
    private CalificacionService calificacionService;
    @PostMapping("/crear")
    public ResponseEntity<String> crearReceta(@RequestBody @Valid RecetaEntradaDto receta) {
        iRecetaService.crearReceta(receta);
        return new ResponseEntity<>("Receta creada", HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Receta>> listarRecetas() {
        List<Receta> listarRecetas = iRecetaService.listarRecetas();
        return new ResponseEntity<>(listarRecetas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receta> buscarReceta(@PathVariable Long id) {
        return new ResponseEntity<>(iRecetaService.buscarReceta(id), HttpStatus.OK);
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarReceta(@PathVariable Long id, @RequestBody @Valid RecetaEntradaDto receta) {
        iRecetaService.actualizarReceta(id, receta);
        return new ResponseEntity<>("Receta actualizada", HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarReceta(@PathVariable Long id) {
        iRecetaService.eliminarReceta(id);
        return new ResponseEntity<>("Receta eliminada", HttpStatus.OK);
    }

    @PostMapping("/{recetaId}/calificar")
    public ResponseEntity<String> calificarReceta(@PathVariable Long recetaId, @RequestParam Integer puntaje) {
        calificacionService.calificarReceta(recetaId, puntaje);
        return new ResponseEntity<>("Receta calificada", HttpStatus.CREATED);
    }

    @GetMapping("/{recetaId}/puntaje")
    public ResponseEntity<Double> obtenerPuntajePromedio(@PathVariable Long recetaId) {
        Double puntajePromedio = calificacionService.obtenerPuntajePromedio(recetaId);
        return new ResponseEntity<>(puntajePromedio, HttpStatus.OK);
    }

    @GetMapping("/{recetaId}/cantCalificaciones")
    public ResponseEntity<Integer> obtenerCantCalificaciones(@PathVariable Long recetaId) {
        Integer cantCalificaciones = calificacionService.obtenerCantCalificaciones(recetaId);
        return new ResponseEntity<>(cantCalificaciones, HttpStatus.OK);
    }
}
