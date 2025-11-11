package com.argu.repository;

import com.argu.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 카테고리 리포지토리.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    /** 이름으로 카테고리를 조회 */
    Optional<Category> findByName(String name);

    /** 정렬 순서 기준으로 모든 카테고리를 조회 */
    List<Category> findAllByOrderByOrderNumAsc();
}



