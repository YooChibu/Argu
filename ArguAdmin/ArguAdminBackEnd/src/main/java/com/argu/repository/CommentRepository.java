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

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByArguAndIsHiddenFalseAndParentIsNull(Argu argu, Pageable pageable);
    List<Comment> findByParent(Comment parent);
    List<Comment> findByUser(User user);
    long countByArguAndIsHiddenFalse(Argu argu);
    
    @Query("SELECT c FROM Comment c WHERE " +
           "(:keyword IS NULL OR :keyword = '' OR c.content LIKE %:keyword%) " +
           "AND (:isHidden IS NULL OR c.isHidden = :isHidden)")
    Page<Comment> searchComments(@Param("keyword") String keyword,
                                @Param("isHidden") Boolean isHidden,
                                Pageable pageable);
}



