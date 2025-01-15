package com.dsmeta.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Carrega as variáveis do arquivo .env
        Dotenv dotenv = Dotenv.configure().load();

        // Acessar variáveis diretamente do arquivo .env
        System.setProperty("TWILIO_SID", dotenv.get("TWILIO_SID"));
        System.setProperty("TWILIO_KEY", dotenv.get("TWILIO_KEY"));
        System.setProperty("TWILIO_PHONE_FROM", dotenv.get("TWILIO_PHONE_FROM"));
        System.setProperty("TWILIO_PHONE_TO", dotenv.get("TWILIO_PHONE_TO"));
        
		SpringApplication.run(BackendApplication.class, args);
	}

}
