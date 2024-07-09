package com.bonappetit.bonappetitApi.dto.salida;

import com.bonappetit.bonappetitApi.entity.Caracteristica;
import com.bonappetit.bonappetitApi.entity.Categoria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecetaSalidaDto {
    private String nombre;
    private String descripcion;
    private String ingredientes;
    private String instrucciones;
    private List<Categoria> categorias;
    private List<Caracteristica> caracteristicas;
    private Double puntajePromedio;
    private Integer cantCalificaciones;
}
