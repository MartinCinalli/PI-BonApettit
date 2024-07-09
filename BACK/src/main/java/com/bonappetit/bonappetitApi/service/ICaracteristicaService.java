package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.entity.Caracteristica;

import java.util.List;

public interface ICaracteristicaService {

    public Caracteristica crearCaracteristica(Caracteristica caracteristica);

    public List<Caracteristica> listarCaracteristicas();

    public Caracteristica buscarCaracteristica(Long id);

    public Caracteristica actualizarCaracteristica(Caracteristica caracteristica);

    void eliminarCaracteristica(Long id);
}
