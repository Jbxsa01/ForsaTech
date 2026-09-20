package org.example.gatewayservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf()
                .disable()
            .formLogin()
                .disable()
            .authorizeExchange()
                // Allow public access to authentication endpoints
                .pathMatchers("/api/auth/**").permitAll()
                .pathMatchers("/api/profile/**").permitAll()
                .pathMatchers("/api/resumes/**").permitAll()
                .pathMatchers("/actuator/**").permitAll()
                // All other routes require authentication
                .anyExchange().authenticated()
                .and()
            .httpBasic()
                .disable();

        return http.build();
    }
}

