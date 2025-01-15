package com.dsmeta.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dsmeta.backend.entities.Sale;
import com.dsmeta.backend.repositories.SaleRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SmsService {
		
	@Autowired
	private SaleRepository saleRepository;
	
	@Value("${twilio.sid}")
	private String twilioSid;

	@Value("${twilio.key}")
	private String twilioKey;

	@Value("${twilio.phone.from}")
	private String twilioPhoneFrom;

	@Value("${twilio.phone.to}")
	private String twilioPhoneTo;

	public String notifyNormalUser(String textMessage, String phoneNumber) {

		Twilio.init(twilioSid, twilioKey);

		PhoneNumber to = new PhoneNumber(twilioPhoneTo);
		PhoneNumber from = new PhoneNumber(twilioPhoneFrom);
		
		if (!phoneNumber.equals("")) {
			to = new PhoneNumber(phoneNumber);
		}
		
		if(!textMessage.equals("")) {
			Message message = Message.creator(to, from, textMessage).create();

			log.info("[SmsService] notifyNormalUser: Message sent successfully | SID: " + message.getSid());
			return "Message sent successfully!";
		} else {
			log.error("[SmsService] notifyNormalUser: Message not sent");
			return "Message not sent!";
		}
	}
	
	public void notifySaleUser(Long id, String phoneNumber) {
		
		Twilio.init(twilioSid, twilioKey);
		
		PhoneNumber to = new PhoneNumber(twilioPhoneTo);
		PhoneNumber from = new PhoneNumber(twilioPhoneFrom);
		
		if (!phoneNumber.equals("")) {
			to = new PhoneNumber(phoneNumber);
		}
		
		Sale sale = saleRepository.findById(id).get();
		
		String date = sale.getDate().getDayOfMonth() 
				+ "/" + sale.getDate().getMonthValue() 
				+ "/" + sale.getDate().getYear();

		String msg = "O vendedor " + sale.getSellerName() 
			+ " realizou " + sale.getDeals() + " acordos"
			+ " em " + sale.getVisited() + " visitas" 
			+ " até a data " + date
			+ ", chegando ao total de R$" + String.format("%.2f", sale.getAmount()) + " em vendas.";
		
		Message message = Message.creator(to, from, msg).create();
			
		log.info("[SmsService] notifySaleUser: Message sent successfully | SID: " + message.getSid());
	}
	
}
