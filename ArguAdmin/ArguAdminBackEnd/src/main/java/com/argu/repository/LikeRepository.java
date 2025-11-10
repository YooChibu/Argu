package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.Like;
import com.argu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByArguAndUser(Argu argu, User user);
    long countByArgu(Argu argu);
}



