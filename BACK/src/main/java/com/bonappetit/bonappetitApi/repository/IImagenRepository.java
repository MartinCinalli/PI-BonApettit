package com.bonappetit.bonappetitApi.repository;

import com.bonappetit.bonappetitApi.entity.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImagenRepository extends JpaRepository<Imagen, Long> {
}
