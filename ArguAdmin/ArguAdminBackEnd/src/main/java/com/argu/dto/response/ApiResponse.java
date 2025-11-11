package com.argu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 공통 API 응답 래퍼.
 * <p>
 * 성공 여부, 메시지, 데이터 페이로드를 통일된 형태로 전달한다.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    /**
     * 기본 성공 응답을 생성한다.
     *
     * @param data 응답 데이터
     * @return 성공 ApiResponse
     */
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message("성공")
                .data(data)
                .build();
    }

    /**
     * 메시지를 포함한 성공 응답을 생성한다.
     *
     * @param message 성공 메시지
     * @param data    응답 데이터
     * @return 성공 ApiResponse
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }

    /**
     * 실패 응답을 생성한다.
     *
     * @param message 오류 메시지
     * @return 실패 ApiResponse
     */
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .build();
    }
}



