package com.bonappetit.bonappetitApi.controller;


import com.bonappetit.bonappetitApi.entity.Caracteristica;
import com.bonappetit.bonappetitApi.service.ICaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caracteristicas")
@CrossOrigin
public class CaracteristicaController {

    @Autowired
    ICaracteristicaService iCaracteristicaService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearCaracteristica(@RequestBody Caracteristica caracteristica) {
        iCaracteristicaService.crearCaracteristica(caracteristica);
        return new ResponseEntity<>("Caracteristica creada", HttpStatus.CREATED);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Caracteristica>> listarCaracteristicas() {
        List<Caracteristica> listarCaracteristicas = iCaracteristicaService.listarCaracteristicas();
        return new ResponseEntity<>(listarCaracteristicas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caracteristica> buscarCaracteristica(@PathVariable Long id) {
        return new ResponseEntity<>(iCaracteristicaService.buscarCaracteristica(id), HttpStatus.OK);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarCaracteristica(@RequestBody Caracteristica caracteristica) {
        iCaracteristicaService.actualizarCaracteristica(caracteristica);
        return new ResponseEntity<>("Caracteristica actualizada", HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarCaracteristica(@PathVariable Long id) {
        iCaracteristicaService.eliminarCaracteristica(id);
        return new ResponseEntity<>("Caracteristica eliminada", HttpStatus.OK);
    }
}
