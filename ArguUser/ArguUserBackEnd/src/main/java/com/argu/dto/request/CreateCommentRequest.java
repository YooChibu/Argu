package com.argu.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCommentRequest {
    @NotNull(message = "논쟁 ID는 필수입니다")
    private Long arguId;

    private Long parentId; // 대댓글인 경우

    @NotBlank(message = "댓글 내용은 필수입니다")
    private String content;
}


