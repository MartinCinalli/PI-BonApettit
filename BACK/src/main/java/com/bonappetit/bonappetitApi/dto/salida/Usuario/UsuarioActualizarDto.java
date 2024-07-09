package com.bonappetit.bonappetitApi.dto.salida.Usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioActualizarDto {
    private Long id;
    private String nombre;
    private String apellido;
    private String correo;
}
