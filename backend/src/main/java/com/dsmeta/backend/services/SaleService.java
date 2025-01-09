package com.dsmeta.backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsmeta.backend.entities.Sale;
import com.dsmeta.backend.repositories.SaleRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository saleRepository;
	
	public Page<Sale> getAllSalesByDate(String minDate, String maxDate, Pageable pageable) {
		
		if(minDate.equals("") && maxDate.equals("")) {
			return saleRepository.findAll(pageable);
		} else {
			LocalDate min = LocalDate.parse(minDate);
			LocalDate max = LocalDate.parse(maxDate);
			
			return saleRepository.getAllSalesByDate(min, max, pageable);
		}
	}
	
}
