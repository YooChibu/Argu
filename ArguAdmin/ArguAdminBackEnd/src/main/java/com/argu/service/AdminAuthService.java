package com.argu.service;

import com.argu.dto.request.AdminLoginRequest;
import com.argu.dto.response.AdminAuthResponse;
import com.argu.entity.Admin;
import com.argu.exception.UnauthorizedException;
import com.argu.repository.AdminRepository;
import com.argu.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 관리자 인증 로직을 담당하는 서비스.
 * <p>
 * 로그인 요청을 처리하고 비밀번호 검증, 계정 상태 확인, JWT 발급을 수행한다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminAuthService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * 관리자 로그인 요청을 처리한다.
     *
     * @param request 관리자 아이디/비밀번호를 담은 DTO
     * @return JWT 토큰과 관리자 정보를 포함한 응답 DTO
     * @throws UnauthorizedException 계정이 없거나 비밀번호/상태가 올바르지 않을 때
     */
    public AdminAuthResponse login(AdminLoginRequest request) {
        log.info("[ADMIN-AUTH] 로그인 시도 - adminId={} ", request.getAdminId());

        Admin admin = adminRepository.findByAdminId(request.getAdminId())
                .orElseThrow(() -> {
                    log.warn("[ADMIN-AUTH] 로그인 실패 - 존재하지 않는 관리자 adminId={}", request.getAdminId());
                    return new UnauthorizedException("관리자 아이디 또는 비밀번호가 올바르지 않습니다");
                });

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            log.warn("[ADMIN-AUTH] 로그인 실패 - 비밀번호 불일치 adminId={}", request.getAdminId());
            throw new UnauthorizedException("관리자 아이디 또는 비밀번호가 올바르지 않습니다");
        }

        if (admin.getStatus() != Admin.AdminStatus.ACTIVE) {
            log.warn("[ADMIN-AUTH] 로그인 실패 - 비활성 계정 adminId={}, status={}", request.getAdminId(), admin.getStatus());
            throw new UnauthorizedException("비활성화된 관리자 계정입니다");
        }

        String token = jwtUtil.generateToken(admin.getId(), admin.getAdminId());

        log.info("[ADMIN-AUTH] 로그인 성공 - adminId={}, role={}", admin.getAdminId(), admin.getRole());

        return AdminAuthResponse.builder()
                .token(token)
                .admin(AdminAuthResponse.AdminInfo.from(admin))
                .build();
    }
}



