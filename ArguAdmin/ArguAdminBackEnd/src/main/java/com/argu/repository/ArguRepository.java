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

@Repository
public interface ArguRepository extends JpaRepository<Argu, Long> {
    Page<Argu> findByIsHiddenFalse(Pageable pageable);
    Page<Argu> findByCategoryAndIsHiddenFalse(Category category, Pageable pageable);
    Page<Argu> findByUserAndIsHiddenFalse(User user, Pageable pageable);
    Page<Argu> findByStatusAndIsHiddenFalse(ArguStatus status, Pageable pageable);
    
    @Query("SELECT a FROM Argu a WHERE " +
           "(:keyword IS NULL OR :keyword = '' OR " +
           "a.title LIKE %:keyword% OR a.content LIKE %:keyword%) " +
           "AND (:status IS NULL OR a.status = :status) " +
           "AND (:isHidden IS NULL OR a.isHidden = :isHidden)")
    Page<Argu> searchArgus(@Param("keyword") String keyword,
                           @Param("status") ArguStatus status,
                           @Param("isHidden") Boolean isHidden,
                           Pageable pageable);
    
    List<Argu> findByStatusAndStartDateLessThanEqual(ArguStatus status, LocalDateTime now);
    List<Argu> findByStatusAndEndDateLessThanEqual(ArguStatus status, LocalDateTime now);
    
    @Query("SELECT a FROM Argu a WHERE a.isHidden = false ORDER BY a.viewCount DESC")
    List<Argu> findTopByOrderByViewCountDesc(Pageable pageable);
    
    long countByStatus(ArguStatus status);
    long countByIsHiddenFalse();
}



