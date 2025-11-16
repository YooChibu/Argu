package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.service.LikeService;
import com.argu.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;
    private final SecurityUtil securityUtil;

    @PostMapping("/argu/{arguId}")
    public ResponseEntity<ApiResponse<Object>> toggleLike(@PathVariable Long arguId) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        likeService.toggleLike(arguId, userId);
        return ResponseEntity.ok(ApiResponse.success("좋아요가 처리되었습니다", null));
    }

    @GetMapping("/argu/{arguId}")
    public ResponseEntity<ApiResponse<Boolean>> isLiked(@PathVariable Long arguId) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        boolean isLiked = likeService.isLiked(arguId, userId);
        return ResponseEntity.ok(ApiResponse.success(isLiked));
    }
}

