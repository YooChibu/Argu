package com.argu.repository;

import com.argu.entity.Report;
import com.argu.entity.Report.ReportStatus;
import com.argu.entity.Report.TargetType;
import com.argu.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 신고(Report) 리포지토리.
 */
@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    /** 상태별 신고 목록 페이지 조회 */
    Page<Report> findByStatus(ReportStatus status, Pageable pageable);

    /** 신고 대상 유형과 ID로 신고 내역 조회 */
    List<Report> findByTargetTypeAndTargetId(TargetType targetType, Long targetId);

    /** 같은 사용자가 동일 대상에 중복 신고했는지 확인 */
    Optional<Report> findByReporterAndTargetTypeAndTargetId(User reporter, TargetType targetType, Long targetId);

    /** 신고자 기준 신고 목록 페이지 조회 */
    Page<Report> findByReporter(User reporter, Pageable pageable);

    /** 상태별 신고 수 카운트 */
    long countByStatus(ReportStatus status);
}



