package com.smart.gym.smartgym.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all API endpoints
                        .allowedOrigins("http://localhost:3000") // Trust the Next.js frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these methods
                        .allowedHeaders("*") // Allow all headers (like Content-Type)
                        .allowCredentials(true);
            }
        };
    }
}