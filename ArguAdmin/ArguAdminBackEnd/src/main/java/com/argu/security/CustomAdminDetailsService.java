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

@Service
@RequiredArgsConstructor
public class CustomAdminDetailsService implements UserDetailsService {
    private final AdminRepository adminRepository;

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



