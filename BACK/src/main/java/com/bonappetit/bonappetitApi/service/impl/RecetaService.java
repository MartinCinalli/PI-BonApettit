package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.dto.entrada.RecetaEntradaDto;
import com.bonappetit.bonappetitApi.entity.Caracteristica;
import com.bonappetit.bonappetitApi.entity.Categoria;
import com.bonappetit.bonappetitApi.entity.Imagen;
import com.bonappetit.bonappetitApi.entity.Receta;
import com.bonappetit.bonappetitApi.repository.ICaracteristicaRepository;
import com.bonappetit.bonappetitApi.repository.ICategoriaRepository;
import com.bonappetit.bonappetitApi.repository.IImagenRepository;
import com.bonappetit.bonappetitApi.repository.IRecetaRepository;
import com.bonappetit.bonappetitApi.service.IImagenService;
import com.bonappetit.bonappetitApi.service.IRecetaService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecetaService implements IRecetaService {

    @Autowired
    private IRecetaRepository iRecetaRepository;
    @Autowired
    private ICategoriaRepository iCategoriaRepository;
    @Autowired
    private ICaracteristicaRepository iCaracteristicaRepository;
    @Autowired
    private IImagenRepository iImagenRepository;
    @Autowired
    private IImagenService iImagenService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Receta crearReceta(RecetaEntradaDto recetaEntradaDto) {
        List<Categoria> categorias = new ArrayList<>();
        List<Imagen> imagenes = new ArrayList<>();
        List<Caracteristica> caracteristicas = new ArrayList<>();

        for (Long categoriaId : recetaEntradaDto.getCategorias()) {
            Categoria categoria = iCategoriaRepository.findById(categoriaId).orElseThrow(() -> new EntityNotFoundException("Categoria no encontrada"));
            categorias.add(categoria);
        }

        for (String url : recetaEntradaDto.getImagenes()) {
            Imagen imagen = new Imagen();
            imagen.setUrlImg(url);
            imagen = iImagenService.crearImagen(imagen);
            imagenes.add(imagen);
        }

        for (Long caracteristicaId : recetaEntradaDto.getCaracteristicas()) {
            Caracteristica caracteristica = iCaracteristicaRepository.findById(caracteristicaId).orElseThrow(() -> new EntityNotFoundException("Caracteristica no encontrada"));
            caracteristicas.add(caracteristica);
        }

        Receta receta = modelMapper.map(recetaEntradaDto, Receta.class);
        receta.setCategorias(categorias);
        receta.setImagenes(imagenes);
        receta.setCaracteristicas(caracteristicas);

        return iRecetaRepository.save(receta);
    }

    @Override
    public List<Receta> listarRecetas() {
        return iRecetaRepository.findAll();
    }

    @Override
    public Receta buscarReceta(Long id) {
        return iRecetaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Receta no encontrada"));
    }

    @Override
    public Receta actualizarReceta(Long id, RecetaEntradaDto recetaEntradaDto) {
        Receta recetaExistente = iRecetaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Receta no encontrada"));

        // Actualizar campos simples
        recetaExistente.setNombre(recetaEntradaDto.getNombre());
        recetaExistente.setDescripcion(recetaEntradaDto.getDescripcion());
        recetaExistente.setIngredientes(recetaEntradaDto.getIngredientes());
        recetaExistente.setInstrucciones(recetaEntradaDto.getInstrucciones());

        // Actualizar categorias
        List<Categoria> categorias = new ArrayList<>();
        for (Long categoriaId : recetaEntradaDto.getCategorias()) {
            Categoria categoria = iCategoriaRepository.findById(categoriaId).orElseThrow(() -> new EntityNotFoundException("Categoria no encontrada"));
            categorias.add(categoria);
        }
        recetaExistente.setCategorias(categorias);

        // Actualizar imagenes
        List<Imagen> imagenes = new ArrayList<>();
        for (String url : recetaEntradaDto.getImagenes()) {
            Imagen imagen = new Imagen();
            imagen.setUrlImg(url);
            imagen = iImagenService.crearImagen(imagen);
            imagenes.add(imagen);
        }
        recetaExistente.setImagenes(imagenes);

        // Actualizar caracteristicas
        List<Caracteristica> caracteristicas = new ArrayList<>();
        for (Long caracteristicaId : recetaEntradaDto.getCaracteristicas()) {
            Caracteristica caracteristica = iCaracteristicaRepository.findById(caracteristicaId).orElseThrow(() -> new EntityNotFoundException("Caracteristica no encontrada"));
            caracteristicas.add(caracteristica);
        }
        recetaExistente.setCaracteristicas(caracteristicas);

        return iRecetaRepository.save(recetaExistente);
    }

    @Override
    public void eliminarReceta(Long id) {
        iRecetaRepository.deleteById(id);
    }
}
