package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Calificacion;
import com.bonappetit.bonappetitApi.entity.Receta;
import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.repository.ICalificacionRepository;
import com.bonappetit.bonappetitApi.repository.IRecetaRepository;
import com.bonappetit.bonappetitApi.repository.IUsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CalificacionService {

    @Autowired
    private ICalificacionRepository calificacionRepository;

    @Autowired
    private IRecetaRepository recetaRepository;


    public Calificacion calificarReceta(Long recetaId, Integer puntaje) {
        Receta receta = recetaRepository.findById(recetaId).orElseThrow(() -> new EntityNotFoundException("Receta no encontrada"));

        Calificacion calificacion = new Calificacion();
        calificacion.setReceta(receta);
        calificacion.setPuntaje(puntaje);

        calificacion = calificacionRepository.save(calificacion);

        actualizarPuntajePromedio(recetaId);
        incrementarCantCalificaciones(recetaId);

        return calificacion;
    }

    public Double obtenerPuntajePromedio(Long recetaId) {
        List<Calificacion> calificaciones = calificacionRepository.findByRecetaId(recetaId);
        return calificaciones.stream().mapToInt(Calificacion::getPuntaje).average().orElse(0.0);
    }

    private void actualizarPuntajePromedio(Long recetaId) {
        Receta receta = recetaRepository.findById(recetaId).orElseThrow(() -> new EntityNotFoundException("Receta no encontrada"));
        Double puntajePromedio = obtenerPuntajePromedio(recetaId);
        receta.setPuntajePromedio(puntajePromedio);
        recetaRepository.save(receta);
    }
    private void incrementarCantCalificaciones(Long recetaId) {
        Receta receta = recetaRepository.findById(recetaId).orElseThrow(() -> new EntityNotFoundException("Receta no encontrada"));
        receta.setCantCalificaciones(receta.getCantCalificaciones() + 1);
        recetaRepository.save(receta);
    }
    public Integer obtenerCantCalificaciones(Long recetaId) {
        Receta receta = recetaRepository.findById(recetaId).orElseThrow(() -> new EntityNotFoundException("Receta no encontrada"));
        return receta.getCantCalificaciones();
    }
}

