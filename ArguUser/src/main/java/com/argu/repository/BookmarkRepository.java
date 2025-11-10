package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.Bookmark;
import com.argu.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    Optional<Bookmark> findByArguAndUser(Argu argu, User user);
    boolean existsByArguAndUser(Argu argu, User user);
    Page<Bookmark> findByUser(User user, Pageable pageable);
}


