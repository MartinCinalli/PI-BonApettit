package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioActualizarDto;
import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioSalidaDto;
import com.bonappetit.bonappetitApi.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {
    @Autowired
    IUsuarioService iUsuarioService;

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioSalidaDto>> listarUsuarios() {
        return new ResponseEntity<>(iUsuarioService.listarUsuarios(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioSalidaDto> buscarUsuario(@PathVariable Long id) {
        return new ResponseEntity<>(iUsuarioService.buscarUsuario(id), HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        iUsuarioService.eliminarUsuario(id);
        return new ResponseEntity<>("Usuario eliminado", HttpStatus.OK);
    }

    @GetMapping("/buscar/{correo}")
    public ResponseEntity<UsuarioSalidaDto> buscarUsuarioPorCorreo(@PathVariable String correo) {
        return ResponseEntity.ok(iUsuarioService.buscarPorCorreo(correo));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<UsuarioSalidaDto> actualizarUsuario(@RequestBody @Valid UsuarioActualizarDto usuario) {
        return new ResponseEntity<>(iUsuarioService.actualizarUsuario(usuario), HttpStatus.OK);
    }
}
