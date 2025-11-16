package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.Argu.ArguStatus;
import com.argu.entity.Category;
import com.argu.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 논쟁(Argu) 엔티티용 리포지토리.
 * <p>
 * 공개 여부, 상태, 기간 등에 따른 조회 편의 메서드를 제공한다.
 */
@Repository
public interface ArguRepository extends JpaRepository<Argu, Long> {
    /** 숨겨지지 않은 논쟁을 페이지 조회 */
    Page<Argu> findByIsHiddenFalse(Pageable pageable);

    /** 특정 카테고리에 속한 공개 논쟁을 페이지 조회 */
    Page<Argu> findByCategoryAndIsHiddenFalse(Category category, Pageable pageable);

    /** 특정 사용자가 작성한 공개 논쟁을 페이지 조회 */
    Page<Argu> findByUserAndIsHiddenFalse(User user, Pageable pageable);

    /** 상태별 공개 논쟁을 페이지 조회 */
    Page<Argu> findByStatusAndIsHiddenFalse(ArguStatus status, Pageable pageable);
    
    @Query("SELECT a FROM Argu a WHERE " +
           "(:keyword IS NULL OR :keyword = '' OR " +
           "a.title LIKE %:keyword% OR a.content LIKE %:keyword%) " +
           "AND (:status IS NULL OR a.status = :status) " +
           "AND (:isHidden IS NULL OR a.isHidden = :isHidden)")
    /**
     * 키워드, 상태, 숨김 여부 조건을 동시에 적용한 검색.
     */
    Page<Argu> searchArgus(@Param("keyword") String keyword,
                           @Param("status") ArguStatus status,
                           @Param("isHidden") Boolean isHidden,
                           Pageable pageable);
    
    /** 시작일 기준으로 상태를 가진 논쟁 조회 (스케줄러 용도) */
    List<Argu> findByStatusAndStartDateLessThanEqual(ArguStatus status, LocalDateTime now);

    /** 종료일 기준으로 상태를 가진 논쟁 조회 (스케줄러 용도) */
    List<Argu> findByStatusAndEndDateLessThanEqual(ArguStatus status, LocalDateTime now);
    
    @Query("SELECT a FROM Argu a WHERE a.isHidden = false ORDER BY a.viewCount DESC")
    /**
     * 조회수가 높은 공개 논쟁을 상위 N개 반환.
     */
    List<Argu> findTopByOrderByViewCountDesc(Pageable pageable);
    
    /** 상태별 논쟁 수 카운트 */
    long countByStatus(ArguStatus status);

    /** 숨김되지 않은 논쟁 수 카운트 */
    long countByIsHiddenFalse();
}



