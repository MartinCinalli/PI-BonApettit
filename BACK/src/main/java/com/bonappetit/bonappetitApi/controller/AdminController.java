package com.bonappetit.bonappetitApi.controller;

import com.bonappetit.bonappetitApi.service.IUsuarioService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    IUsuarioService iUsuarioService;

    @PutMapping("/rolAdmin/{id}")
    public ResponseEntity<?> permisoAdminRol(@PathVariable Long id) {
        try {
            iUsuarioService.permisoAdminRol(id);
            return ResponseEntity.ok("Rol de ADMIN asignado correctamente al usuario con ID " + id);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/revokeRole/{id}")
    public ResponseEntity<?> dengarAdminRol(@PathVariable Long id) {
        try {
            iUsuarioService.dengarAdminRol(id);
            return ResponseEntity.ok("Rol de ADMIN revocado correctamente al usuario con ID " + id);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
