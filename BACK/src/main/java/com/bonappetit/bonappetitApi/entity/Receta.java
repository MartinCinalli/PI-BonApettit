package com.bonappetit.bonappetitApi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    private String nombre;
    @Column(length = 250, nullable = false)
    private String descripcion;
    @Column(length = 500, nullable = false)
    private String ingredientes;
    @Column(length = 500, nullable = false)
    private String instrucciones;
    @ManyToMany
    private List<Categoria> categorias;
    @OneToMany
    private List<Imagen> imagenes;
    @ManyToMany
    private List<Caracteristica> caracteristicas;
    @OneToMany
    private List<Calificacion> calificaciones;
    @Column(nullable = false)
    private Double puntajePromedio = 0.0;
    @Column(nullable = false)
    private Integer cantCalificaciones = 0;
}
