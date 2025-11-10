package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.dto.response.DashboardStatsResponse;
import com.argu.entity.Argu;
import com.argu.entity.Report;
import com.argu.entity.User;
import com.argu.service.AdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "관리자 대시보드 API", description = "관리자 대시보드 통계 및 최근 활동 조회 API")
@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
    private final AdminDashboardService adminDashboardService;

    @Operation(summary = "대시보드 통계 조회", description = "전체 통계 정보를 조회합니다.")
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        DashboardStatsResponse stats = adminDashboardService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @Operation(summary = "최근 가입 회원 조회", description = "최근 가입한 회원 목록을 조회합니다.")
    @GetMapping("/recent-users")
    public ResponseEntity<ApiResponse<List<User>>> getRecentUsers(
            @RequestParam(defaultValue = "10") int limit) {
        List<User> users = adminDashboardService.getRecentUsers(limit);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @Operation(summary = "인기 논쟁 조회", description = "조회수가 높은 논쟁 목록을 조회합니다.")
    @GetMapping("/top-argus")
    public ResponseEntity<ApiResponse<List<Argu>>> getTopArgus(
            @RequestParam(defaultValue = "5") int limit) {
        List<Argu> argus = adminDashboardService.getTopArgus(limit);
        return ResponseEntity.ok(ApiResponse.success(argus));
    }

    @Operation(summary = "미처리 신고 조회", description = "처리 대기 중인 신고 목록을 조회합니다.")
    @GetMapping("/pending-reports")
    public ResponseEntity<ApiResponse<List<Report>>> getPendingReports(
            @RequestParam(defaultValue = "10") int limit) {
        List<Report> reports = adminDashboardService.getPendingReports(limit);
        return ResponseEntity.ok(ApiResponse.success(reports));
    }
}



