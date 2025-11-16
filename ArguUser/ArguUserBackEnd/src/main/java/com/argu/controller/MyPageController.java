package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.dto.response.ArguResponse;
import com.argu.dto.response.CommentResponse;
import com.argu.entity.ArguOpinion;
import com.argu.service.MyPageService;
import com.argu.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 마이페이지 관련 REST API 컨트롤러
 * 현재 로그인한 사용자의 마이페이지 데이터를 제공합니다.
 */
@Tag(name = "마이페이지 API", description = "마이페이지 관련 API (내 논쟁, 내 댓글, 참여한 논쟁 등)")
@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;
    private final SecurityUtil securityUtil;

    /**
     * 내 논쟁 목록 조회 (페이징)
     * 현재 로그인한 사용자가 작성한 논쟁 목록을 조회합니다.
     * 
     * @param pageable 페이징 정보 (기본값: 페이지당 20개)
     * @return 내 논쟁 목록 (페이징된 결과)
     */
    @Operation(summary = "내 논쟁 목록 조회", description = "현재 로그인한 사용자가 작성한 논쟁 목록을 조회합니다.")
    @SecurityRequirement(name = "JWT")
    @GetMapping("/argu")
    public ResponseEntity<ApiResponse<Page<ArguResponse>>> getMyArgus(
            @PageableDefault(size = 20) Pageable pageable) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        Page<ArguResponse> response = myPageService.getMyArgus(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 내 댓글 목록 조회 (페이징)
     * 현재 로그인한 사용자가 작성한 댓글 목록을 조회합니다.
     * 
     * @param pageable 페이징 정보 (기본값: 페이지당 20개)
     * @return 내 댓글 목록 (페이징된 결과)
     */
    @Operation(summary = "내 댓글 목록 조회", description = "현재 로그인한 사용자가 작성한 댓글 목록을 조회합니다.")
    @SecurityRequirement(name = "JWT")
    @GetMapping("/comments")
    public ResponseEntity<ApiResponse<Page<CommentResponse>>> getMyComments(
            @PageableDefault(size = 20) Pageable pageable) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        Page<CommentResponse> response = myPageService.getMyComments(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 참여한 논쟁 목록 조회
     * 현재 로그인한 사용자가 입장을 선택한 논쟁 목록을 조회합니다.
     * 
     * @return 참여한 논쟁 목록 (의견 정보 포함)
     */
    @Operation(summary = "참여한 논쟁 목록 조회", description = "현재 로그인한 사용자가 입장을 선택한 논쟁 목록을 조회합니다.")
    @SecurityRequirement(name = "JWT")
    @GetMapping("/opinions")
    public ResponseEntity<ApiResponse<List<ArguOpinion>>> getMyOpinions() {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        List<ArguOpinion> opinions = myPageService.getMyOpinions(userId);
        return ResponseEntity.ok(ApiResponse.success(opinions));
    }

    /**
     * 받은 좋아요 목록 조회 (페이징)
     * 현재 로그인한 사용자가 작성한 논쟁 중 좋아요를 받은 논쟁 목록을 좋아요 수가 많은 순으로 조회합니다.
     * 
     * @param pageable 페이징 정보 (기본값: 페이지당 20개)
     * @return 받은 좋아요 목록 (페이징된 결과)
     */
    @Operation(summary = "받은 좋아요 목록 조회", description = "현재 로그인한 사용자가 작성한 논쟁 중 좋아요를 받은 논쟁 목록을 좋아요 수가 많은 순으로 조회합니다.")
    @SecurityRequirement(name = "JWT")
    @GetMapping("/likes")
    public ResponseEntity<ApiResponse<Page<ArguResponse>>> getMyLikedArgus(
            @PageableDefault(size = 20) Pageable pageable) {
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        Page<ArguResponse> response = myPageService.getMyLikedArgus(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}

