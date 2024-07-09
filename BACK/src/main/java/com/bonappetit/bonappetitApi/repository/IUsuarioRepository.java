package com.bonappetit.bonappetitApi.repository;

import com.bonappetit.bonappetitApi.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByCorreo(String correo);
}
