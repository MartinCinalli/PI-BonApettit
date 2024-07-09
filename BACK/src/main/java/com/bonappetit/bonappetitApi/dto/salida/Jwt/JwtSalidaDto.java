package com.bonappetit.bonappetitApi.dto.salida.Jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtSalidaDto {
    private String token;
    private String nombre;
    private String rol;
    private String correo;
}
