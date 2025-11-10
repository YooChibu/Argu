package com.argu.controller;

import com.argu.dto.request.AdminLoginRequest;
import com.argu.dto.response.AdminAuthResponse;
import com.argu.dto.response.ApiResponse;
import com.argu.service.AdminAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "관리자 인증 API", description = "관리자 로그인 등 인증 관련 API")
@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {
    private final AdminAuthService adminAuthService;

    @Operation(summary = "관리자 로그인", description = "관리자 아이디와 비밀번호로 로그인하고 JWT 토큰을 발급합니다.")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AdminAuthResponse>> login(@Valid @RequestBody AdminLoginRequest request) {
        AdminAuthResponse response = adminAuthService.login(request);
        return ResponseEntity.ok(ApiResponse.success("로그인 성공", response));
    }
}



