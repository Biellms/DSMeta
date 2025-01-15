package com.dsmeta.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info().title("DSMeta")
                            .version("v1")
                            .description("DSMeta API Documentation")
                            .contact(new Contact().name("Gabriel Mendes")
                                                  .email("biell.mendes8@gmail.com")
                                                  .url("https://github.com/Biellms")));
    }
}
