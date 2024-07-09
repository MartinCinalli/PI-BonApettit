package com.bonappetit.bonappetitApi.dto.entrada;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginEntradaDto {
    private String correo;
    private String contraseña;
}
