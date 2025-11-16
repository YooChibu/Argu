package com.argu.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 관리자 로그인 요청 DTO.
 * <p>
 * 컨트롤러에서 요청 본문을 검증하기 위해 사용된다.
 */
@Data
public class AdminLoginRequest {
    @NotBlank(message = "관리자 아이디는 필수입니다")
    private String adminId;

    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;
}



