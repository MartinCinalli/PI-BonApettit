package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioActualizarDto;
import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioSalidaDto;
import com.bonappetit.bonappetitApi.entity.Usuario;

import java.util.List;


public interface IUsuarioService {

    public Usuario registrarUsuario(Usuario usuario);

    public List<UsuarioSalidaDto> listarUsuarios();

    public void eliminarUsuario(Long id);

    public UsuarioSalidaDto buscarUsuario(Long id);

    public UsuarioSalidaDto actualizarUsuario(UsuarioActualizarDto usuario);

    public void permisoAdminRol(Long id);

    public void dengarAdminRol(Long id);

    public UsuarioSalidaDto buscarPorCorreo(String correo);
}
