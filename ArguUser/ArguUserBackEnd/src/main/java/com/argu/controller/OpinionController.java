package com.argu.controller;

import com.argu.dto.request.CreateOpinionRequest;
import com.argu.dto.response.ApiResponse;
import com.argu.entity.ArguOpinion;
import com.argu.service.ArguOpinionService;
import com.argu.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opinions")
@RequiredArgsConstructor
public class OpinionController {
    private final ArguOpinionService arguOpinionService;
    private final SecurityUtil securityUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<ArguOpinion>> createOpinion(
            @Valid @RequestBody CreateOpinionRequest request) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        ArguOpinion response = arguOpinionService.createOpinion(request, userId);
        return ResponseEntity.ok(ApiResponse.success("입장이 선택되었습니다", response));
    }

    @GetMapping("/argu/{arguId}")
    public ResponseEntity<ApiResponse<List<ArguOpinion>>> getOpinionsByArgu(@PathVariable Long arguId) {
        List<ArguOpinion> opinions = arguOpinionService.getOpinionsByArgu(arguId);
        return ResponseEntity.ok(ApiResponse.success(opinions));
    }
}

