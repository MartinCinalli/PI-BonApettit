package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioActualizarDto;
import com.bonappetit.bonappetitApi.dto.salida.Usuario.UsuarioSalidaDto;
import com.bonappetit.bonappetitApi.entity.Role;
import com.bonappetit.bonappetitApi.entity.RoleEnum;
import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.repository.IUsuarioRepository;
import com.bonappetit.bonappetitApi.security.jwt.JWTUtil;
import com.bonappetit.bonappetitApi.service.IEmailService;
import com.bonappetit.bonappetitApi.service.IUsuarioService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuarioRepository iUsuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private IEmailService iEmailService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Usuario registrarUsuario(Usuario usuario) {
        if (iUsuarioRepository.findUsuarioByCorreo(usuario.getCorreo()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está en uso");
        }

        usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));

        // Asigna el rol por defecto 'USER'
        Role userRole = new Role();
        userRole.setRoleEnum(RoleEnum.USER);
        usuario.getRoles().add(userRole);
        //Enviar mail al usuario
        iEmailService.sendEmail(usuario.getCorreo(), "Bienvenido a Bonappetit", "Hola " + usuario.getNombre() + " ¡Tu registro fue exitoso en Bonappetit!");
        return iUsuarioRepository.save(usuario);
    }

    @Override
    public UsuarioSalidaDto buscarPorCorreo(String correo) {
        Usuario usuario = iUsuarioRepository.findUsuarioByCorreo(correo)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con el correo: " + correo));
        UsuarioSalidaDto usuarioSalidaDto = modelMapper.map(usuario, UsuarioSalidaDto.class);
        return usuarioSalidaDto;
    }

    @Override
    public List<UsuarioSalidaDto> listarUsuarios() {
        List<UsuarioSalidaDto> usuarioSalidaDto = iUsuarioRepository.findAll()
                .stream().map(usuario -> modelMapper.map(usuario, UsuarioSalidaDto.class)).toList();
        return usuarioSalidaDto;
    }

    @Override
    public void eliminarUsuario(Long id) {
        iUsuarioRepository.deleteById(id);
    }

    @Override
    public UsuarioSalidaDto buscarUsuario(Long id) {
        Usuario usuario = iUsuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con el id: " + id));
        UsuarioSalidaDto usuarioSalidaDto = modelMapper.map(usuario, UsuarioSalidaDto.class);
        return usuarioSalidaDto;
    }

    @Override
    public UsuarioSalidaDto actualizarUsuario(UsuarioActualizarDto usuario) {
        Usuario usuarioRecibido = modelMapper.map(usuario, Usuario.class);
        Usuario usuarioAActualizar = iUsuarioRepository.findById(usuarioRecibido.getId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        if (usuarioAActualizar != null) {

            usuarioAActualizar.setNombre(usuarioRecibido.getNombre());
            usuarioAActualizar.setApellido(usuarioRecibido.getApellido());
            usuarioAActualizar.setCorreo(usuarioRecibido.getCorreo());

            iUsuarioRepository.save(usuarioAActualizar);
        }
        UsuarioSalidaDto usuarioSalidaDto = modelMapper.map(usuarioAActualizar, UsuarioSalidaDto.class);
        return usuarioSalidaDto;
    }

    public void permisoAdminRol(Long id) {
        Usuario usuario = iUsuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Buscar el rol actual del usuario
        Optional<Role> userRoleOptional = usuario.getRoles().stream()
                .filter(role -> role.getRoleEnum() == RoleEnum.USER)
                .findFirst();

        if (userRoleOptional.isPresent()) {
            // Si el usuario tiene el rol de USER, cambiarlo a ADMIN
            Role userRole = userRoleOptional.get();
            userRole.setRoleEnum(RoleEnum.ADMIN);
            iUsuarioRepository.save(usuario);
        } else if (usuario.getRoles().stream().anyMatch(role -> role.getRoleEnum() == RoleEnum.ADMIN)) {
            // Si el usuario ya tiene el rol de ADMIN, lanzar una excepción
            throw new IllegalArgumentException("El usuario ya tiene el rol de ADMIN");
        } else {
            // Si el usuario no tiene el rol de USER ni el rol de ADMIN, lanzar una excepción
            throw new IllegalArgumentException("El usuario no tiene un rol válido para cambiar a ADMIN");
        }
    }

    public void dengarAdminRol(Long id) {
        Usuario usuario = iUsuarioRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Buscar el rol de ADMIN del usuario
        Optional<Role> adminRoleOptional = usuario.getRoles().stream()
                .filter(role -> role.getRoleEnum() == RoleEnum.ADMIN)
                .findFirst();

        if (adminRoleOptional.isPresent()) {
            // Si el usuario tiene el rol de ADMIN, cambiarlo a USER
            Role adminRole = adminRoleOptional.get();
            adminRole.setRoleEnum(RoleEnum.USER);
            iUsuarioRepository.save(usuario);
        } else {
            // Si el usuario no tiene el rol de ADMIN, lanzar una excepción
            throw new IllegalArgumentException("El usuario no tiene el rol de ADMIN");
        }
    }

}
