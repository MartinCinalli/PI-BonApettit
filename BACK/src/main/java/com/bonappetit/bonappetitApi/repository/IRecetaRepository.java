package com.bonappetit.bonappetitApi.repository;

import com.bonappetit.bonappetitApi.entity.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRecetaRepository extends JpaRepository<Receta, Long> {
}
