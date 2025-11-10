package com.argu.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "argu_opinion", indexes = {
    @Index(name = "idx_argu_id", columnList = "argu_id"),
    @Index(name = "idx_user_id", columnList = "user_id"),
    @Index(name = "idx_side", columnList = "side")
}, uniqueConstraints = {
    @UniqueConstraint(name = "uk_argu_user", columnNames = {"argu_id", "user_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ArguOpinion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "argu_id", nullable = false, foreignKey = @ForeignKey(name = "fk_opinion_argu"))
    private Argu argu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_opinion_user"))
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OpinionSide side;

    @Column(columnDefinition = "TEXT")
    private String content;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum OpinionSide {
        FOR, AGAINST, NEUTRAL, OTHER
    }
}


