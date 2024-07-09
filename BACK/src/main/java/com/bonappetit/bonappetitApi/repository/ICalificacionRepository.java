package com.bonappetit.bonappetitApi.repository;

import com.bonappetit.bonappetitApi.entity.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICalificacionRepository extends JpaRepository<Calificacion, Long> {
    List<Calificacion> findByRecetaId(Long recetaId);
}
