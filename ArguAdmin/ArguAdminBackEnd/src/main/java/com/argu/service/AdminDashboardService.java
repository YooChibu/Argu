package com.argu.service;

import com.argu.dto.response.DashboardStatsResponse;
import com.argu.entity.Argu;
import com.argu.entity.Report;
import com.argu.entity.User;
import com.argu.repository.ArguRepository;
import com.argu.repository.CommentRepository;
import com.argu.repository.ReportRepository;
import com.argu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;

    public DashboardStatsResponse getDashboardStats() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfToday = today.atStartOfDay();
        LocalDateTime endOfToday = today.plusDays(1).atStartOfDay();

        long totalUsers = userRepository.count();
        long totalArgus = arguRepository.count();
        long activeArgus = arguRepository.countByStatus(Argu.ArguStatus.ACTIVE);
        long pendingReports = reportRepository.countByStatus(Report.ReportStatus.PENDING);
        
        long todayNewUsers = userRepository.findAll().stream()
                .filter(user -> user.getCreatedAt() != null && 
                        user.getCreatedAt().isAfter(startOfToday) && 
                        user.getCreatedAt().isBefore(endOfToday))
                .count();
        
        long todayNewArgus = arguRepository.findAll().stream()
                .filter(argu -> argu.getCreatedAt() != null && 
                        argu.getCreatedAt().isAfter(startOfToday) && 
                        argu.getCreatedAt().isBefore(endOfToday))
                .count();

        long totalComments = commentRepository.count();

        return DashboardStatsResponse.builder()
                .totalUsers(totalUsers)
                .totalArgus(totalArgus)
                .totalComments(totalComments)
                .activeArgus(activeArgus)
                .pendingReports(pendingReports)
                .todayNewUsers(todayNewUsers)
                .todayNewArgus(todayNewArgus)
                .build();
    }

    public List<User> getRecentUsers(int limit) {
        return userRepository.findAll(PageRequest.of(0, limit))
                .getContent();
    }

    public List<Argu> getTopArgus(int limit) {
        return arguRepository.findTopByOrderByViewCountDesc(PageRequest.of(0, limit));
    }

    public List<Report> getPendingReports(int limit) {
        return reportRepository.findByStatus(Report.ReportStatus.PENDING, PageRequest.of(0, limit))
                .getContent();
    }
}

