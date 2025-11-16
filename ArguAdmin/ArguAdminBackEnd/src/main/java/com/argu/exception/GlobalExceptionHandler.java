package com.argu.exception;

import com.argu.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * 전역 예외 처리 핸들러.
 * <p>
 * RestController 계층 전반에서 발생하는 예외를 포착해 {@link ApiResponse} 래퍼와 함께
 * 일관된 HTTP 상태 코드 및 메시지를 반환한다. 시스템 내부 에러는 로그에 기록하고
 * 최소한의 정보를 클라이언트로 전달하도록 구성돼 있다.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 리소스를 찾을 수 없을 때 404 Not Found 응답을 생성한다.
     *
     * @param e {@link ResourceNotFoundException}
     * @return 404 응답과 에러 메시지를 담은 ApiResponse
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException e) {
        log.error("Resource not found: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(e.getMessage()));
    }

    /**
     * 잘못된 요청일 때 400 Bad Request 응답을 생성한다.
     *
     * @param e {@link BadRequestException}
     * @return 400 응답과 에러 메시지를 담은 ApiResponse
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(BadRequestException e) {
        log.error("Bad request: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(e.getMessage()));
    }

    /**
     * 인증/권한 오류일 때 401 Unauthorized 응답을 생성한다.
     *
     * @param e {@link UnauthorizedException}
     * @return 401 응답과 에러 메시지를 담은 ApiResponse
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Object>> handleUnauthorizedException(UnauthorizedException e) {
        log.error("Unauthorized: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error(e.getMessage()));
    }

    /**
     * 요청 본문 검증이 실패했을 때 400 응답을 생성한다.
     * <p>
     * 실제 오류 필드들은 로그에 기록하고, 클라이언트에는 공통 메시지를 전달한다.
     *
     * @param e {@link MethodArgumentNotValidException}
     * @return 400 응답과 에러 메시지를 담은 ApiResponse
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        log.error("Validation error: {}", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("유효성 검증 실패"));
    }

    /**
     * 기타 예상하지 못한 예외를 처리한다.
     * <p>
     * 500 Internal Server Error로 응답하며, 자세한 스택 트레이스는 서버 로그에만 남긴다.
     *
     * @param e 처리되지 않은 예외
     * @return 500 응답과 기본 오류 메시지를 담은 ApiResponse
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception e) {
        log.error("Unexpected error: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("서버 오류가 발생했습니다"));
    }
}



