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

/**
 * 관리자 인증 관련 REST 엔드포인트를 제공한다.
 * <p>
 * 로그인 성공 시 JWT 토큰을 반환하여 이후 요청에서 인증 헤더로 사용할 수 있게 한다.
 */
@Tag(name = "관리자 인증 API", description = "관리자 로그인 등 인증 관련 API")
@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminAuthController {
    private final AdminAuthService adminAuthService;

    /**
     * 관리자 로그인 요청을 처리한다.
     *
     * @param request 관리자 아이디와 비밀번호
     * @return 로그인 성공 메시지와 JWT 토큰, 관리자 정보가 담긴 API 응답
     */
    @Operation(summary = "관리자 로그인", description = "관리자 아이디와 비밀번호로 로그인하고 JWT 토큰을 발급합니다.")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AdminAuthResponse>> login(@Valid @RequestBody AdminLoginRequest request) {
        AdminAuthResponse response = adminAuthService.login(request);
        return ResponseEntity.ok(ApiResponse.success("로그인 성공", response));
    }
}



