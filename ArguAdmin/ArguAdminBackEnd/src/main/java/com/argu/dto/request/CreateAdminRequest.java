package com.argu.dto.request;

import com.argu.entity.Admin;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 관리자 계정 생성 요청 DTO.
 * <p>
 * 기본 역할은 ADMIN으로 설정되며, 요청 본문 검증에 사용된다.
 */
@Data
public class CreateAdminRequest {
    @NotBlank(message = "관리자 아이디는 필수입니다")
    private String adminId;

    @NotBlank(message = "비밀번호는 필수입니다")
    private String password;

    @NotBlank(message = "이름은 필수입니다")
    private String name;

    private Admin.AdminRole role = Admin.AdminRole.ADMIN;
}



