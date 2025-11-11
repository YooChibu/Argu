package com.argu.exception;

/**
 * 클라이언트 입력이 비즈니스 규칙에 맞지 않을 때 던지는 예외.
 * <p>
 * 서비스 계층에서 검증 실패, 중복 데이터 등과 같은 상황을 나타낼 때 사용하며
 * {@link GlobalExceptionHandler}가 400 Bad Request 응답으로 변환한다.
 */
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}



