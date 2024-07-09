package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Caracteristica;
import com.bonappetit.bonappetitApi.repository.ICaracteristicaRepository;
import com.bonappetit.bonappetitApi.service.ICaracteristicaService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaracteristicaService implements ICaracteristicaService {
    @Autowired
    ICaracteristicaRepository iCaracteristicaRepository;

    @Override
    public Caracteristica crearCaracteristica(Caracteristica caracteristica) {
        return iCaracteristicaRepository.save(caracteristica);
    }

    @Override
    public List<Caracteristica> listarCaracteristicas() {
        List<Caracteristica> listarCaracteristicas = iCaracteristicaRepository.findAll();
        return listarCaracteristicas;
    }

    @Override
    public Caracteristica buscarCaracteristica(Long id) {
        return iCaracteristicaRepository.findById(id).orElse(null);
    }

    @Override
    public Caracteristica actualizarCaracteristica(Caracteristica caracteristica) {
        if (iCaracteristicaRepository.existsById(caracteristica.getId())){
            return iCaracteristicaRepository.save(caracteristica);
        } else {
            throw new EntityNotFoundException("Característica no encontrada");
        }
    }

    @Override
    public void eliminarCaracteristica(Long id) {
        iCaracteristicaRepository.deleteById(id);
    }


}
