package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.dto.entrada.RecetaEntradaDto;
import com.bonappetit.bonappetitApi.entity.Receta;

import java.util.List;

public interface IRecetaService {

    public Receta crearReceta(RecetaEntradaDto recetaEntradaDto);

    public List<Receta> listarRecetas();

    public Receta buscarReceta(Long id);

    public Receta actualizarReceta(Long id, RecetaEntradaDto recetaEntradaDto);

    public void eliminarReceta(Long id);
}
