package com.argu.dto.response;

import com.argu.entity.Admin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminAuthResponse {
    private String token;
    private AdminInfo admin;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminInfo {
        private Long id;
        private String adminId;
        private String name;
        private Admin.AdminRole role;
        private Admin.AdminStatus status;

        public static AdminInfo from(Admin admin) {
            return AdminInfo.builder()
                    .id(admin.getId())
                    .adminId(admin.getAdminId())
                    .name(admin.getName())
                    .role(admin.getRole())
                    .status(admin.getStatus())
                    .build();
        }
    }
}



