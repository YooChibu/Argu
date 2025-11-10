package com.argu.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI (Swagger) 설정 클래스
 * API 문서화를 위한 설정을 정의합니다.
 */
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Argu Admin API")
                        .description("논쟁 플랫폼 관리자 백엔드 API 문서")
                        .version("1.0.0"));
    }
}



