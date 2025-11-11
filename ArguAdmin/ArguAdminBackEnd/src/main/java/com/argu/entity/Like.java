package com.argu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 논쟁에 대한 사용자 좋아요 관계를 저장하는 엔티티.
 * <p>
 * 한 사용자당 한 논쟁에 단 한 번만 좋아요를 누를 수 있도록 복합 유니크 제약(`uk_argu_user`)을 둔다.
 * 생성 일시는 감사 리스너가 채운다.
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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("좋아요 ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "argu_id", nullable = false, foreignKey = @ForeignKey(name = "fk_like_argu"))
    @Comment("논쟁 ID")
    private Argu argu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_like_user"))
    @Comment("사용자 ID")
    private User user;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    @Comment("생성 일시")
    private LocalDateTime createdAt;
}

