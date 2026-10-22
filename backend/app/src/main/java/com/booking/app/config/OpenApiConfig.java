package com.booking.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI showBookingOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Show Booking API")
                        .description("API for browsing shows and booking seats.")
                        .version("v1"));
    }
}
