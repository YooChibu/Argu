package com.argu.security;

import com.argu.entity.Admin;
import com.argu.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * Spring Security에서 관리자 계정을 조회하기 위한 {@link UserDetailsService} 구현체.
 * <p>
 * 인증 필터가 JWT 토큰에서 추출한 관리자 아이디로 이 서비스를 호출하면,
 * 활성화된 관리자 계정을 {@link org.springframework.security.core.userdetails.User} 형태로 반환한다.
 */
@Service
@RequiredArgsConstructor
public class CustomAdminDetailsService implements UserDetailsService {
    private final AdminRepository adminRepository;

    /**
     * 관리자 아이디로 DB를 조회하여 Spring Security {@link UserDetails}를 생성한다.
     * <p>
     * - 계정이 존재하지 않으면 {@link UsernameNotFoundException} 발생<br>
     * - 계정이 비활성화 상태(INACTIVE)면 인증을 거부한다<br>
     * - 관리자 권한을 ROLE 어노테이션 형식으로 매핑하여 반환한다
     *
     * @param adminId 로그인 요청에서 전달된 관리자 아이디
     * @return Spring Security가 이해할 수 있는 UserDetails
     */
    @Override
    public UserDetails loadUserByUsername(String adminId) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(() -> new UsernameNotFoundException("관리자를 찾을 수 없습니다: " + adminId));

        if (admin.getStatus() != Admin.AdminStatus.ACTIVE) {
            throw new UsernameNotFoundException("비활성화된 관리자입니다: " + adminId);
        }

        String role = admin.getRole() == Admin.AdminRole.SUPER_ADMIN ? "ROLE_SUPER_ADMIN" : "ROLE_ADMIN";
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(role)
        );

        return org.springframework.security.core.userdetails.User.builder()
                .username(admin.getAdminId())
                .password(admin.getPassword())
                .authorities(authorities)
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}



