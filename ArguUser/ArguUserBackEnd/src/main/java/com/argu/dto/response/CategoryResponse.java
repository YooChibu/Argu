package com.argu.dto.response;

import com.argu.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 카테고리 응답 DTO
 * 카테고리 정보와 논쟁 개수를 포함합니다.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private Integer orderNum;
    private Long arguCount;  // 해당 카테고리의 논쟁 개수 (숨김 처리되지 않은 논쟁만)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * Category 엔티티와 논쟁 개수로부터 CategoryResponse 생성
     * 
     * @param category 카테고리 엔티티
     * @param arguCount 논쟁 개수
     * @return CategoryResponse 인스턴스
     */
    public static CategoryResponse from(Category category, Long arguCount) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .orderNum(category.getOrderNum())
                .arguCount(arguCount != null ? arguCount : 0L)
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}

