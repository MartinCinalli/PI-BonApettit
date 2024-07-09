package com.bonappetit.bonappetitApi.dto.entrada;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecetaEntradaDto {
    @NotNull(message = "El nombre de la receta no puede ser nulo")
    @NotBlank(message = "Debe especificarse el nombre de la receta")
    @Size(max = 50, message = "El nombre de la receta no debe tener mas de 50 caracteres")
    private String nombre;

    @NotNull(message = "La descripcion no puede ser nula")
    @NotBlank(message = "Debe especificarse la descripcion de la receta")
    @Size(max = 250, message = "La descripcion de la receta no debe tener mas de 250 caracteres")
    private String descripcion;

    @NotNull(message = "Los ingredientes no pueden ser nulo")
    @NotBlank(message = "Debe especificarse los ingredientes de la receta")
    @Size(max = 500, message = "Los ingredientes de la receta no debe tener mas de 250 caracteres")
    private String ingredientes;

    @NotNull(message = "Las instrucciones no pueden ser nulo")
    @NotBlank(message = "Debe especificarse las instrucciones de la receta")
    @Size(max = 500, message = "Las instrucciones de la receta no debe tener mas de 250 caracteres")
    private String instrucciones;

    @NotNull(message = "Las categorías no pueden ser nulas")
    @Valid
    @NotEmpty(message = "Debe especificarse al menos una categoría")
    private List<Long> categorias;

    @NotNull(message = "Las imágenes no pueden ser nulas")
    @Valid
    @NotEmpty(message = "Debe especificarse al menos una imagen")
    private List<String> imagenes;

    @NotNull(message = "Las características no pueden ser nulas")
    @Valid
    @NotEmpty(message = "Debe especificarse al menos una característica")
    private List<Long> caracteristicas;
}
