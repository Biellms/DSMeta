package com.dsmeta.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsmeta.backend.entities.Sale;
import com.dsmeta.backend.services.SaleService;
import com.dsmeta.backend.services.SmsService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService saleService;
	
	@Autowired
	private SmsService smsService; 
	
	@GetMapping
	public Page<Sale> getAllSalesByDate(
			@RequestParam(value = "minDate", defaultValue = "") String minDate,
			@RequestParam(value = "maxDate", defaultValue = "") String maxDate,
			Pageable pageable) {
		return saleService.getAllSalesByDate(minDate, maxDate, pageable);
	}
	
	@GetMapping("/notifyUser")
	public String notifyUserOpen(@RequestParam(value = "textMessage", defaultValue = "") String textMessage) {
		return smsService.notifyUserOpen(textMessage);
	}
	
	@GetMapping("/notifySaleUser/{id}")
	public void notifySaleUser(@PathVariable Long id) {
		smsService.notifySaleUser(id);
	}
	
}
