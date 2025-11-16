package com.argu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 관리자 계정 정보를 저장하는 엔티티.
 * <p>
 * Spring Security 인증/인가 시 {@link com.argu.repository.AdminRepository}와 {@link com.argu.security.CustomAdminDetailsService}
 * 에 의해 로드되며, {@link AdminRole}·{@link AdminStatus}로 권한/상태를 구분한다.
 * 감사 필드는 {@link AuditingEntityListener}가 자동으로 채운다.
 */
@Entity
@Table(name = "admins", indexes = {
    @Index(name = "idx_admin_id", columnList = "admin_id"),
    @Index(name = "idx_role", columnList = "role"),
    @Index(name = "idx_status", columnList = "status")
})
@Comment("관리자 테이블")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Admin {
    /**
     * 관리자 ID (PK)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("관리자 ID")
    private Long id;

    /**
     * 관리자 아이디 (고유값)
     */
    @Column(name = "admin_id", nullable = false, unique = true, length = 50)
    @Comment("관리자 아이디")
    private String adminId;

    /**
     * 비밀번호 (BCrypt 해시)
     */
    @Column(nullable = false, length = 255)
    @Comment("비밀번호 (BCrypt 해시)")
    private String password;

    /**
     * 관리자 이름
     */
    @Column(nullable = false, length = 50)
    @Comment("관리자 이름")
    private String name;

    /**
     * 관리자 권한 (SUPER_ADMIN: 슈퍼 관리자, ADMIN: 일반 관리자)
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Comment("관리자 권한 (SUPER_ADMIN: 슈퍼 관리자, ADMIN: 일반 관리자)")
    @Builder.Default
    private AdminRole role = AdminRole.ADMIN;

    /**
     * 관리자 상태 (ACTIVE: 활성, INACTIVE: 비활성)
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Comment("관리자 상태 (ACTIVE: 활성, INACTIVE: 비활성)")
    @Builder.Default
    private AdminStatus status = AdminStatus.ACTIVE;

    /**
     * 생성 일시
     */
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    @Comment("생성 일시")
    private LocalDateTime createdAt;

    /**
     * 수정 일시
     */
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    @Comment("수정 일시")
    private LocalDateTime updatedAt;

    /**
     * 관리자 권한 열거형
     */
    public enum AdminRole {
        SUPER_ADMIN,  // 슈퍼 관리자
        ADMIN         // 일반 관리자
    }

    /**
     * 관리자 상태 열거형
     */
    public enum AdminStatus {
        ACTIVE,    // 활성
        INACTIVE   // 비활성
    }
}



