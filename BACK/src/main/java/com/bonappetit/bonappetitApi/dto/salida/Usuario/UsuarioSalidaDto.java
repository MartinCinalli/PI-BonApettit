package com.bonappetit.bonappetitApi.dto.salida.Usuario;


import com.bonappetit.bonappetitApi.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioSalidaDto {
    private Long id;
    private String nombre;
    private String apellido;
    private String correo;
    private Set<Role> roles;
}
