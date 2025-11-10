package com.argu.service;

import com.argu.entity.Report;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ReportRepository;
import com.argu.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminReportService {
    private final ReportRepository reportRepository;
    private final SecurityUtil securityUtil;

    public Page<Report> getReports(Report.ReportStatus status, Pageable pageable) {
        if (status != null) {
            return reportRepository.findByStatus(status, pageable);
        }
        return reportRepository.findAll(pageable);
    }

    public Report getReportById(Long reportId) {
        return reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("신고를 찾을 수 없습니다"));
    }

    @Transactional
    public Report processReport(Long reportId, Report.ReportStatus status) {
        Report report = getReportById(reportId);
        report.setStatus(status);
        report.setProcessedBy(securityUtil.getCurrentAdminId());
        report.setProcessedAt(LocalDateTime.now());
        return reportRepository.save(report);
    }
}



