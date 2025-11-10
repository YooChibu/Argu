package com.argu.service;

import com.argu.dto.request.AdminLoginRequest;
import com.argu.dto.response.AdminAuthResponse;
import com.argu.entity.Admin;
import com.argu.exception.UnauthorizedException;
import com.argu.repository.AdminRepository;
import com.argu.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminAuthResponse login(AdminLoginRequest request) {
        Admin admin = adminRepository.findByAdminId(request.getAdminId())
                .orElseThrow(() -> new UnauthorizedException("관리자 아이디 또는 비밀번호가 올바르지 않습니다"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new UnauthorizedException("관리자 아이디 또는 비밀번호가 올바르지 않습니다");
        }

        if (admin.getStatus() != Admin.AdminStatus.ACTIVE) {
            throw new UnauthorizedException("비활성화된 관리자 계정입니다");
        }

        String token = jwtUtil.generateToken(admin.getId(), admin.getAdminId());

        return AdminAuthResponse.builder()
                .token(token)
                .admin(AdminAuthResponse.AdminInfo.from(admin))
                .build();
    }
}



