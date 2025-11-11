package com.argu.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * JWT 설정 속성 클래스.
 * <p>
 * {@link ConfigurationProperties @ConfigurationProperties}를 통해 `application.yml`의 `jwt` 네임스페이스에
 * 선언된 값을 빈으로 바인딩한다. 서버 기동 시 유효한 시크릿 키와 만료 시간이 주입되어야 JWT 토큰 생성/검증이 정상 동작한다.
 * 운영 환경에서는 시크릿을 환경 변수나 시크릿 매니저로 분리해야 한다.
 */
@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    /** JWT 서명에 사용할 비밀 키 */
    private String secret;

    /**
     * JWT 토큰 만료 시간 (밀리초)
     */
    private Long expiration;
}



