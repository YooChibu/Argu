package com.argu.exception;

/**
 * 인증 정보가 없거나 권한이 부족할 때 던지는 예외.
 * <p>
 * 주로 로그인 실패, 비활성 계정 접근, 토큰 검증 실패 등에서 사용하며
 * {@link GlobalExceptionHandler}가 401 Unauthorized 응답을 반환한다.
 */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}



