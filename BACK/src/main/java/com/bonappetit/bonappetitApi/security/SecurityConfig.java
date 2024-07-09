package com.bonappetit.bonappetitApi.security;

import com.bonappetit.bonappetitApi.security.jwt.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserDatailServiceImpl userDetailsService;

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {
                    // Configuración de endpoints de Swagger y OpenAPI
                    http.requestMatchers("/v3/api-docs/**").permitAll();
                    http.requestMatchers("/swagger-ui/**").permitAll();
                    http.requestMatchers("/swagger-ui.html").permitAll();

                    // Config endpoints publicos
                    http.requestMatchers("/**", "/index.html").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/auth/registro").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/auth/login").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/recetas/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/categorias/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/caracteristicas/listar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/recetas/{id}").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/recetas/{recetaId}/calificar").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/recetas/{recetaId}/puntaje").permitAll();
                    // Config endpoint privados
                    http.requestMatchers(HttpMethod.POST, "/recetas/crear").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/recetas/eliminar/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/recetas/actualizar/{id}").hasRole("ADMIN");

                    http.requestMatchers(HttpMethod.GET, "/usuarios/listar").hasAnyRole("SUPER", "ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/usuarios/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/usuarios/buscar/{correo}").hasAnyRole("USER", "ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/usuarios/eliminar/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/usuarios/actualizar").hasAnyRole("USER", "ADMIN");

                    http.requestMatchers(HttpMethod.POST, "/categorias/crear").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/categorias/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/categorias/eliminar/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/categorias/actualizar").hasRole("ADMIN");

                    http.requestMatchers(HttpMethod.POST, "/caracteristicas/crear").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/caracteristicas/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/caracteristicas/eliminar/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/caracteristicas/actualizar").hasRole("ADMIN");

                    http.requestMatchers(HttpMethod.POST, "/imagenes/crear").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/imagenes/listar").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/imagenes/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/imagenes/eliminar/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/imagenes/actualizar/{id}").hasRole("ADMIN");

                    http.requestMatchers(HttpMethod.PUT, "/admin/rolAdmin/{id}").hasRole("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/admin/revokeRole/{id}").hasRole("ADMIN");

                    // Config endpoint no especificados
                    http.anyRequest().denyAll();
                })
                .httpBasic(httpBasic -> httpBasic.disable())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDatailServiceImpl userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
