package com.argu.util;

import com.argu.entity.Admin;
import com.argu.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * Spring Security 컨텍스트에서 현재 인증된 관리자 정보를 조회하기 위한 헬퍼.
 * <p>
 * 서비스/컨트롤러 단에서 인증 주체를 직접 파싱하지 않고 이 유틸을 통해 필요한 정보를 읽어온다.
 */
@Component
@RequiredArgsConstructor
public class SecurityUtil {
    private final AdminRepository adminRepository;

    /**
     * SecurityContext에 저장된 인증 객체에서 관리자 PK를 찾는다.
     *
     * @return 인증된 관리자 PK, 없으면 {@code null}
     */
    public Long getCurrentAdminId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            Admin admin = adminRepository.findByAdminId(userDetails.getUsername())
                    .orElse(null);
            return admin != null ? admin.getId() : null;
        }

        return null;
    }

    /**
     * 현재 관리자 엔티티를 로드한다.
     *
     * @return 인증된 {@link Admin} 엔티티, 없으면 {@code null}
     */
    public Admin getCurrentAdmin() {
        Long adminId = getCurrentAdminId();
        if (adminId == null) {
            return null;
        }
        return adminRepository.findById(adminId).orElse(null);
    }
}



