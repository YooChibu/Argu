package com.argu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ArguAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(ArguAdminApplication.class, args);
    }
}



