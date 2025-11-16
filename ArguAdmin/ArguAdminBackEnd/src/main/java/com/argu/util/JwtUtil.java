package com.argu.util;

import com.argu.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 토큰 생성 및 검증을 담당하는 유틸리티.
 * <p>
 * JJWT 라이브러리를 사용하여 HMAC-SHA 기반의 서명 토큰을 만들고 해석한다.
 * 토큰에는 관리자 PK(subject)와 관리자 아이디(claim)를 담아 인증 필터에서 재확인할 수 있도록 구성한다.
 */
@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final JwtProperties jwtProperties;

    /**
     * 서명을 위해 {@link JwtProperties#getSecret()}에서 불러온 키로 {@link SecretKey}를 생성한다.
     * 시크릿은 충분히 긴 난수여야 하며 운영 환경에서는 외부 시크릿 저장소에 보관해야 한다.
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 관리자 인증 성공 시 JWT 토큰을 발급한다.
     *
     * @param adminId   관리자 PK
     * @param adminIdStr 관리자 계정 아이디
     * @return 만료 시간, subject, 커스텀 claim이 채워진 서명된 토큰 문자열
     */
    public String generateToken(Long adminId, String adminIdStr) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtProperties.getExpiration());

        return Jwts.builder()
                .subject(String.valueOf(adminId))
                .claim("adminId", adminIdStr)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * JWT subject(관리자 PK)를 추출한다.
     *
     * @param token 클라이언트가 보낸 JWT
     * @return 관리자 PK
     */
    public Long getAdminIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return Long.parseLong(claims.getSubject());
    }

    /**
     * JWT claim에 저장한 관리자 계정 아이디를 추출한다.
     *
     * @param token 클라이언트가 보낸 JWT
     * @return 관리자 계정 아이디
     */
    public String getAdminIdStrFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("adminId", String.class);
    }

    /**
     * 토큰의 서명 및 만료 여부를 검증한다.
     *
     * @param token 클라이언트가 보낸 JWT
     * @return 유효하면 true, 파싱/검증 중 예외가 발생하면 false
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}



