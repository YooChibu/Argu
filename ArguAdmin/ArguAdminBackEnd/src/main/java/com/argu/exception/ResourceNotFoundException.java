package com.argu.exception;

/**
 * 요청한 리소스가 존재하지 않을 때 던지는 예외.
 * <p>
 * 엔티티 조회 결과가 없거나 접근 권한이 없는 리소스를 찾을 때 사용하며
 * {@link GlobalExceptionHandler}에서 404 Not Found 로 매핑된다.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}



