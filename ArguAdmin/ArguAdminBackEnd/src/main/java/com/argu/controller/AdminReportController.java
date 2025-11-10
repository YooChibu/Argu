package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.entity.Report;
import com.argu.service.AdminReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "관리자 신고 관리 API", description = "신고 조회, 처리 등 신고 관리 API")
@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class AdminReportController {
    private final AdminReportService adminReportService;

    @Operation(summary = "신고 목록 조회", description = "처리 상태에 따라 신고 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Report>>> getReports(
            @RequestParam(required = false) Report.ReportStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Report> reports = adminReportService.getReports(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(reports));
    }

    @Operation(summary = "신고 상세 조회", description = "신고의 상세 정보를 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Report>> getReportDetail(@PathVariable Long id) {
        Report report = adminReportService.getReportById(id);
        return ResponseEntity.ok(ApiResponse.success(report));
    }

    @Operation(summary = "신고 처리", description = "신고를 승인 또는 반려 처리합니다.")
    @PutMapping("/{id}/process")
    public ResponseEntity<ApiResponse<Report>> processReport(
            @PathVariable Long id,
            @RequestParam Report.ReportStatus status) {
        Report report = adminReportService.processReport(id, status);
        return ResponseEntity.ok(ApiResponse.success("신고가 처리되었습니다", report));
    }
}



