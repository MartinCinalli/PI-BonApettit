package com.bonappetit.bonappetitApi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
    @NotNull
    private String categorias;
    @Column(length = 100, nullable = false)
    @NotNull
    private String descripcion;
    @Column(length = 500, nullable = false)
    @NotNull
    private String urlImg;
}
