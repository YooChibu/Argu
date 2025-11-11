package com.argu.dto.response;

import com.argu.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 관리자 화면에서 회원 상세 정보를 보여주기 위한 DTO.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailResponse {
    private Long id;
    private String email;
    private String username;
    private String nickname;
    private String profileImage;
    private String bio;
    private User.UserStatus status;
    private Boolean emailVerified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long arguCount;
    private Long commentCount;

    /**
     * 회원 엔티티와 활동 지표를 DTO로 변환한다.
     *
     * @param user         회원 엔티티
     * @param arguCount    공개 논쟁 수
     * @param commentCount 댓글 수
     * @return 회원 상세 DTO
     */
    public static UserDetailResponse from(User user, Long arguCount, Long commentCount) {
        return UserDetailResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .bio(user.getBio())
                .status(user.getStatus())
                .emailVerified(user.getEmailVerified())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .arguCount(arguCount)
                .commentCount(commentCount)
                .build();
    }
}



