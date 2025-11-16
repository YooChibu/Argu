package com.argu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 좋아요 엔티티
 * 사용자가 논쟁에 좋아요를 누른 정보를 저장하는 테이블
 */
@Entity
@Table(name = "likes", indexes = {
    @Index(name = "idx_argu_id", columnList = "argu_id"),
    @Index(name = "idx_user_id", columnList = "user_id")
}, uniqueConstraints = {
    @UniqueConstraint(name = "uk_argu_user", columnNames = {"argu_id", "user_id"})
})
@Comment("좋아요 테이블")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Like {
    /**
     * 좋아요 ID (PK)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("좋아요 ID")
    private Long id;

    /**
     * 논쟁
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "argu_id", nullable = false, foreignKey = @ForeignKey(name = "fk_like_argu"))
    @Comment("논쟁 ID")
    private Argu argu;

    /**
     * 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_like_user"))
    @Comment("사용자 ID")
    private User user;

    /**
     * 생성 일시
     */
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    @Comment("생성 일시")
    private LocalDateTime createdAt;
}


