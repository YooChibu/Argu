package com.argu.dto.response;

import com.argu.entity.Admin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 관리자 로그인 성공 시 클라이언트에 반환되는 응답 DTO.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminAuthResponse {
    private String token;
    private AdminInfo admin;

    /**
     * 토큰과 함께 내려보낼 관리자 요약 정보.
     */
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

        /**
         * 관리자 엔티티를 응답 DTO로 변환한다.
         *
         * @param admin 관리자 엔티티
         * @return 관리자 요약 정보
         */
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



