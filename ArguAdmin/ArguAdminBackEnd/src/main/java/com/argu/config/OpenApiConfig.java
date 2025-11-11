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

    /**
     * OpenAPI 스펙을 구성한다.
     * <p>
     * springdoc-openapi 스타터는 해당 빈을 읽어 Swagger UI와 `/api-docs` 엔드포인트를 생성한다.
     * 운영 환경에서는 보안 정책에 따라 문서 접근을 제한하거나 URL을 변경할 수 있다.
     *
     * @return 문서 제목, 설명, 버전이 채워진 {@link OpenAPI} 인스턴스
     */
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Argu Admin API")
                        .description("논쟁 플랫폼 관리자 백엔드 API 문서")
                        .version("1.0.0"));
    }
}



