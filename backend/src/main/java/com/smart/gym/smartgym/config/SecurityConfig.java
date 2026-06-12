package com.smart.gym.smartgym.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/activities/**").hasAnyRole("MONITOR", "ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/activities/**").hasAnyRole("MONITOR", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/activities/**").hasAnyRole("MONITOR", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/activities/**").authenticated()

                        .requestMatchers("/api/monitors/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/*").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/members/*/activities").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/members/*/activities/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/members/*/activities/**").authenticated()
                        .requestMatchers("/api/members/**").hasAnyRole("MONITOR", "ADMIN")

                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
