package com.argu.dto.request;

import com.argu.entity.ArguOpinion.OpinionSide;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateOpinionRequest {
    @NotNull(message = "논쟁 ID는 필수입니다")
    private Long arguId;

    @NotNull(message = "입장은 필수입니다")
    private OpinionSide side;

    private String content; // 선택사항
}


