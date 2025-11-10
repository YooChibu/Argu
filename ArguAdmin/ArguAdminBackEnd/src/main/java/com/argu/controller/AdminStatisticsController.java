package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.service.AdminStatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "관리자 통계 API", description = "통계 및 분석 데이터 조회 API")
@RestController
@RequestMapping("/api/admin/statistics")
@RequiredArgsConstructor
public class AdminStatisticsController {
    private final AdminStatisticsService adminStatisticsService;

    @Operation(summary = "회원 통계 조회", description = "회원 관련 통계를 조회합니다.")
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserStatistics() {
        Map<String, Object> stats = adminStatisticsService.getUserStatistics();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @Operation(summary = "논쟁 통계 조회", description = "논쟁 관련 통계를 조회합니다.")
    @GetMapping("/argus")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getArguStatistics() {
        Map<String, Object> stats = adminStatisticsService.getArguStatistics();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @Operation(summary = "일별 회원 가입 통계", description = "지정된 일수 동안의 일별 회원 가입 통계를 조회합니다.")
    @GetMapping("/users/daily")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDailyUserRegistrations(
            @RequestParam(defaultValue = "7") int days) {
        Map<String, Long> stats = adminStatisticsService.getDailyUserRegistrations(days);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @Operation(summary = "일별 논쟁 생성 통계", description = "지정된 일수 동안의 일별 논쟁 생성 통계를 조회합니다.")
    @GetMapping("/argus/daily")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDailyArguCreations(
            @RequestParam(defaultValue = "7") int days) {
        Map<String, Long> stats = adminStatisticsService.getDailyArguCreations(days);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}



