package com.argu.dto.response;

import com.argu.entity.Argu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArguResponse {
    private Long id;
    private Long userId;
    private String username;
    private String nickname;
    private Long categoryId;
    private String categoryName;
    private String title;
    private String content;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Argu.ArguStatus status;
    private Boolean isHidden;
    private Integer viewCount;
    private Long likeCount;
    private Long commentCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ArguResponse from(Argu argu, Long likeCount, Long commentCount) {
        return ArguResponse.builder()
                .id(argu.getId())
                .userId(argu.getUser().getId())
                .username(argu.getUser().getUsername())
                .nickname(argu.getUser().getNickname())
                .categoryId(argu.getCategory().getId())
                .categoryName(argu.getCategory().getName())
                .title(argu.getTitle())
                .content(argu.getContent())
                .startDate(argu.getStartDate())
                .endDate(argu.getEndDate())
                .status(argu.getStatus())
                .isHidden(argu.getIsHidden())
                .viewCount(argu.getViewCount())
                .likeCount(likeCount)
                .commentCount(commentCount)
                .createdAt(argu.getCreatedAt())
                .updatedAt(argu.getUpdatedAt())
                .build();
    }
}


