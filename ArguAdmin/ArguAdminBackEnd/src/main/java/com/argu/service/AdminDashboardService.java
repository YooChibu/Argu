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

/**
 * 관리자 대시보드를 위한 통계 및 하이라이트 데이터를 제공하는 서비스.
 * <p>
 * 회원/논쟁/댓글/신고와 관련된 집계, 최근 활동 목록을 조회한다.
 */
@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;
    private final ReportRepository reportRepository;
    private final CommentRepository commentRepository;

    /**
     * 대시보드에 표시할 핵심 지표를 계산한다.
     * <p>
     * 현재는 전체 데이터를 메모리에 로드해 필터링하므로 데이터가 많을 경우 성능 최적화가 필요하다.
     *
     * @return 대시보드 통계 DTO
     */
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

    /**
     * 최근 가입한 회원 목록을 조회한다.
     *
     * @param limit 조회할 최대 인원수
     * @return 회원 목록
     */
    public List<User> getRecentUsers(int limit) {
        return userRepository.findAll(PageRequest.of(0, limit))
                .getContent();
    }

    /**
     * 조회수가 높은 논쟁을 조회한다.
     *
     * @param limit 조회 상위 개수
     * @return 인기 논쟁 목록
     */
    public List<Argu> getTopArgus(int limit) {
        return arguRepository.findTopByOrderByViewCountDesc(PageRequest.of(0, limit));
    }

    /**
     * 처리 대기 중인 신고 목록을 조회한다.
     *
     * @param limit 조회할 신고 수
     * @return 미처리 신고 목록
     */
    public List<Report> getPendingReports(int limit) {
        return reportRepository.findByStatus(Report.ReportStatus.PENDING, PageRequest.of(0, limit))
                .getContent();
    }
}

