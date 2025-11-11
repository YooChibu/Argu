package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.Like;
import com.argu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 좋아요(Like) 리포지토리.
 */
@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    /** 논쟁과 사용자 조합으로 좋아요 존재 여부 조회 */
    Optional<Like> findByArguAndUser(Argu argu, User user);

    /** 논쟁별 좋아요 개수 */
    long countByArgu(Argu argu);
}



