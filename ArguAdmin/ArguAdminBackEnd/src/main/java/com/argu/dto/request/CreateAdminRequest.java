package com.argu.dto.request;

import com.argu.entity.Admin;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

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



