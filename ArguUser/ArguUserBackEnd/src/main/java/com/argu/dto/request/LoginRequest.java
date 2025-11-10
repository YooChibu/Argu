package com.argu.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "이메일 또는 아이디는 필수입니다")
    private String emailOrUsername;

    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;
}


