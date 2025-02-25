package com.dsmeta.backend.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dsmeta.backend.entities.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long>{

	@Query("SELECT obj FROM Sale obj WHERE obj.date BETWEEN :min AND :max ORDER BY obj.date DESC")
	Page<Sale> getAllSalesByDate(LocalDate min, LocalDate max, Pageable pageable);
}
