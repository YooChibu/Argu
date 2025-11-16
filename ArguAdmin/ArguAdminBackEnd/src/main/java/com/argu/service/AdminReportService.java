package com.argu.service;

import com.argu.entity.Report;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ReportRepository;
import com.argu.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 신고 내역 조회 및 처리 로직을 담당하는 서비스.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminReportService {
    private final ReportRepository reportRepository;
    private final SecurityUtil securityUtil;

    /**
     * 신고 목록을 상태 조건에 따라 페이지 조회한다.
     *
     * @param status   필터링할 신고 상태(선택)
     * @param pageable 페이지 정보
     * @return 신고 페이지
     */
    public Page<Report> getReports(Report.ReportStatus status, Pageable pageable) {
        if (status != null) {
            log.debug("[ADMIN-REPORT] 신고 목록 조회 - status={}", status);
            return reportRepository.findByStatus(status, pageable);
        }
        log.debug("[ADMIN-REPORT] 신고 목록 조회 - 전체");
        return reportRepository.findAll(pageable);
    }

    /**
     * 신고 ID로 단일 신고를 조회한다.
     *
     * @param reportId 신고 ID
     * @return 신고 엔티티
     * @throws ResourceNotFoundException 없을 때
     */
    public Report getReportById(Long reportId) {
        return reportRepository.findById(reportId)
                .orElseThrow(() -> {
                    log.warn("[ADMIN-REPORT] 신고 조회 실패 - 존재하지 않음 reportId={}", reportId);
                    return new ResourceNotFoundException("신고를 찾을 수 없습니다");
                });
    }

    /**
     * 신고를 승인/반려 등으로 처리하고 처리자 정보를 기록한다.
     *
     * @param reportId 신고 ID
     * @param status   설정할 상태
     * @return 처리 완료된 신고
     */
    @Transactional
    public Report processReport(Long reportId, Report.ReportStatus status) {
        Report report = getReportById(reportId);
        report.setStatus(status);
        report.setProcessedBy(securityUtil.getCurrentAdminId());
        report.setProcessedAt(LocalDateTime.now());
        Report processed = reportRepository.save(report);
        log.info("[ADMIN-REPORT] 신고 처리 - reportId={}, status={}, processedBy={}", processed.getId(), processed.getStatus(), processed.getProcessedBy());
        return processed;
    }
}



