package com.argu.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminLoginRequest {
    @NotBlank(message = "관리자 아이디는 필수입니다")
    private String adminId;

    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;
}



