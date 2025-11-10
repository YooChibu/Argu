package com.argu.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * JWT 설정 속성 클래스
 * application.yml에서 jwt 관련 설정을 읽어옵니다.
 */
@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    /**
     * JWT 서명에 사용할 비밀 키
     */
    private String secret;

    /**
     * JWT 토큰 만료 시간 (밀리초)
     */
    private Long expiration;
}



