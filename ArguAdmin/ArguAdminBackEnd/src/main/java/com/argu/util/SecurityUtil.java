package com.argu.util;

import com.argu.entity.Admin;
import com.argu.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtil {
    private final AdminRepository adminRepository;

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

    public Admin getCurrentAdmin() {
        Long adminId = getCurrentAdminId();
        if (adminId == null) {
            return null;
        }
        return adminRepository.findById(adminId).orElse(null);
    }
}



