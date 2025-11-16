package com.argu.controller;

import com.argu.dto.request.CreateArguRequest;
import com.argu.dto.request.UpdateArguRequest;
import com.argu.dto.response.ApiResponse;
import com.argu.dto.response.ArguResponse;
import com.argu.entity.Argu;
import com.argu.service.ArguService;
import com.argu.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 논쟁(Argu) 관련 REST API 컨트롤러
 * 논쟁 생성, 조회, 검색, 삭제 등의 기능을 제공합니다.
 */
@Tag(name = "논쟁 API", description = "논쟁 생성, 조회, 검색, 삭제 등 논쟁 관련 API")
@RestController
@RequestMapping("/api/argu")
@RequiredArgsConstructor
public class ArguController {
    private final ArguService arguService;      // 논쟁 비즈니스 로직 서비스
    private final SecurityUtil securityUtil;    // 보안 유틸리티 (현재 사용자 정보 조회)

    /**
     * 새로운 논쟁 생성
     * 
     * @param request 논쟁 생성 요청 데이터 (제목, 내용, 카테고리, 시작일시, 종료일시)
     * @return 생성된 논쟁 정보
     */
    @Operation(summary = "논쟁 생성", description = "새로운 논쟁을 생성합니다. 인증이 필요합니다.")
    @SecurityRequirement(name = "JWT")
    @PostMapping
    public ResponseEntity<ApiResponse<ArguResponse>> createArgu(
            @Valid @RequestBody CreateArguRequest request) {
        // 현재 로그인한 사용자 ID 조회
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        // 논쟁 생성 및 반환
        ArguResponse response = arguService.createArgu(request, userId);
        return ResponseEntity.ok(ApiResponse.success("논쟁이 생성되었습니다", response));
    }

    /**
     * 논쟁 ID로 논쟁 상세 정보 조회
     * 
     * @param id 논쟁 ID
     * @return 논쟁 상세 정보 (좋아요 수, 댓글 수 포함)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArguResponse>> getArguById(@PathVariable Long id) {
        ArguResponse response = arguService.getArguById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 전체 논쟁 목록 조회 (페이징)
     * 
     * @param status 논쟁 상태 (선택적: SCHEDULED, ACTIVE, ENDED)
     * @param sort 정렬 기준 (latest, popular, comments, views)
     * @param pageable 페이징 정보 (기본값: 페이지당 20개)
     * @return 논쟁 목록 (페이징된 결과)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ArguResponse>>> getAllArgus(
            @RequestParam(required = false) Argu.ArguStatus status,
            @RequestParam(required = false, defaultValue = "latest") String sort,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ArguResponse> response = arguService.getAllArgus(pageable, sort, status);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 카테고리별 논쟁 목록 조회 (페이징)
     * 
     * @param categoryId 카테고리 ID
     * @param status 논쟁 상태 (선택적: SCHEDULED, ACTIVE, ENDED)
     * @param sort 정렬 기준 (latest, popular, comments, views)
     * @param pageable 페이징 정보 (기본값: 페이지당 20개)
     * @return 해당 카테고리의 논쟁 목록 (페이징된 결과)
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<Page<ArguResponse>>> getArgusByCategory(
            @PathVariable Long categoryId,
            @RequestParam(required = false) Argu.ArguStatus status,
            @RequestParam(required = false, defaultValue = "latest") String sort,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ArguResponse> response = arguService.getArgusByCategory(categoryId, pageable, sort, status);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 키워드로 논쟁 검색 (페이징)
     * 카테고리, 상태, 정렬 필터를 지원합니다.
     * 
     * @param keyword 검색 키워드
     * @param categoryId 카테고리 ID (선택적)
     * @param status 논쟁 상태 (선택적)
     * @param sort 정렬 기준 (latest, popular, comments, views)
     * @param pageable 페이징 정보 (기본값: 페이지당 20개)
     * @return 검색된 논쟁 목록 (페이징된 결과)
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<ArguResponse>>> searchArgus(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Argu.ArguStatus status,
            @RequestParam(required = false, defaultValue = "latest") String sort,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ArguResponse> response = arguService.searchArgus(keyword, categoryId, status, pageable, sort);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    /**
     * 논쟁 수정
     * 작성자만 수정 가능하며, 논쟁이 시작되기 전(SCHEDULED 상태)에만 수정 가능
     * 
     * @param id 논쟁 ID
     * @param request 논쟁 수정 요청 데이터
     * @return 수정된 논쟁 정보
     */
    @Operation(summary = "논쟁 수정", description = "논쟁을 수정합니다. 작성자만 수정 가능하며, 논쟁이 시작되기 전에만 수정 가능합니다.")
    @SecurityRequirement(name = "JWT")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ArguResponse>> updateArgu(
            @PathVariable Long id,
            @Valid @RequestBody UpdateArguRequest request) {
        // 현재 로그인한 사용자 ID 조회
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        // 논쟁 수정 (권한 및 상태 검증 포함)
        ArguResponse response = arguService.updateArgu(id, request, userId);
        return ResponseEntity.ok(ApiResponse.success("논쟁이 수정되었습니다", response));
    }

    /**
     * 논쟁 삭제
     * 작성자만 삭제 가능하며, 논쟁이 시작되기 전(SCHEDULED 상태)에만 삭제 가능
     * 
     * @param id 삭제할 논쟁 ID
     * @return 삭제 결과
     */
    @Operation(summary = "논쟁 삭제", description = "논쟁을 삭제합니다. 작성자만 삭제 가능하며, 논쟁이 시작되기 전에만 삭제 가능합니다.")
    @SecurityRequirement(name = "JWT")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteArgu(@PathVariable Long id) {
        // 현재 로그인한 사용자 ID 조회
        Long userId = securityUtil.getCurrentUserId();
        if (userId == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("인증이 필요합니다"));
        }
        
        // 논쟁 삭제 (권한 및 상태 검증 포함)
        arguService.deleteArgu(id, userId);
        return ResponseEntity.ok(ApiResponse.success("논쟁이 삭제되었습니다", null));
    }
}

