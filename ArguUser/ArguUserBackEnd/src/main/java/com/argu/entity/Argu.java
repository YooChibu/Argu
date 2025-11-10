package com.argu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 논쟁(Argu) 엔티티
 * 사용자들이 토론할 논쟁 주제를 저장하는 테이블
 */
@Entity
@Table(name = "argu", indexes = {
    @Index(name = "idx_user_id", columnList = "user_id"),
    @Index(name = "idx_category_id", columnList = "category_id"),
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_start_date", columnList = "start_date"),
    @Index(name = "idx_end_date", columnList = "end_date"),
    @Index(name = "idx_created_at", columnList = "created_at")
})
@Comment("논쟁 주제 테이블")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Argu {
    /**
     * 논쟁 ID (PK)
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("논쟁 ID")
    private Long id;

    /**
     * 논쟁 작성자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_argu_user"))
    @Comment("논쟁 작성자 ID")
    private User user;

    /**
     * 카테고리
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_argu_category"))
    @Comment("카테고리 ID")
    private Category category;

    /**
     * 논쟁 제목
     */
    @Column(nullable = false, length = 255)
    @Comment("논쟁 제목")
    private String title;

    /**
     * 논쟁 내용
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    @Comment("논쟁 내용")
    private String content;

    /**
     * 논쟁 시작 일시
     */
    @Column(name = "start_date", nullable = false)
    @Comment("논쟁 시작 일시")
    private LocalDateTime startDate;

    /**
     * 논쟁 종료 일시
     */
    @Column(name = "end_date", nullable = false)
    @Comment("논쟁 종료 일시")
    private LocalDateTime endDate;

    /**
     * 논쟁 상태 (SCHEDULED: 예정, ACTIVE: 진행중, ENDED: 종료)
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Comment("논쟁 상태 (SCHEDULED: 예정, ACTIVE: 진행중, ENDED: 종료)")
    @Builder.Default
    private ArguStatus status = ArguStatus.SCHEDULED;

    /**
     * 숨김 여부
     */
    @Column(name = "is_hidden", nullable = false)
    @Comment("숨김 여부")
    @Builder.Default
    private Boolean isHidden = false;

    /**
     * 조회수
     */
    @Column(name = "view_count", nullable = false)
    @Comment("조회수")
    @Builder.Default
    private Integer viewCount = 0;

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
     * 논쟁 상태 열거형
     */
    public enum ArguStatus {
        SCHEDULED, // 예정
        ACTIVE,    // 진행중
        ENDED      // 종료
    }
}


