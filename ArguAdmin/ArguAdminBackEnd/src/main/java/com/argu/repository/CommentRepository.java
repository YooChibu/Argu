package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.Comment;
import com.argu.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 댓글 리포지토리.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    /** 특정 논쟁의 최상위 댓글을 공개 상태로 페이지 조회 */
    Page<Comment> findByArguAndIsHiddenFalseAndParentIsNull(Argu argu, Pageable pageable);

    /** 대댓글 목록 조회 */
    List<Comment> findByParent(Comment parent);

    /** 특정 사용자의 댓글을 조회 */
    List<Comment> findByUser(User user);

    /** 논쟁별 공개 댓글 수 */
    long countByArguAndIsHiddenFalse(Argu argu);
    
    @Query("SELECT c FROM Comment c WHERE " +
           "(:keyword IS NULL OR :keyword = '' OR c.content LIKE %:keyword%) " +
           "AND (:isHidden IS NULL OR c.isHidden = :isHidden)")
    /** 키워드와 숨김 여부 조건으로 댓글을 검색 */
    Page<Comment> searchComments(@Param("keyword") String keyword,
                                @Param("isHidden") Boolean isHidden,
                                Pageable pageable);
}



