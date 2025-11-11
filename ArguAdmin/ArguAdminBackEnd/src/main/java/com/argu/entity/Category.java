package com.argu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 논쟁 분류 카테고리를 저장하는 엔티티.
 * <p>
 * `orderNum`으로 관리자 페이지에서 노출 순서를 제어하며, {@link AuditingEntityListener}를 통해 생성/수정 시각을 추적한다.
 */
@Entity
@Table(name = "categories", indexes = {
    @Index(name = "idx_order_num", columnList = "order_num")
})
@Comment("카테고리 테이블")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("카테고리 ID")
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    @Comment("카테고리명 (고유값)")
    private String name;

    @Column(columnDefinition = "TEXT")
    @Comment("카테고리 설명")
    private String description;

    @Column(name = "order_num")
    @Comment("정렬 순서")
    @Builder.Default
    private Integer orderNum = 0;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    @Comment("생성 일시")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    @Comment("수정 일시")
    private LocalDateTime updatedAt;
}



