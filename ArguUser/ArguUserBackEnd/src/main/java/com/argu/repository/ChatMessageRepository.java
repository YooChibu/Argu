package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findByArguOrderByCreatedAtDesc(Argu argu, Pageable pageable);
    List<ChatMessage> findByArguAndCreatedAtAfter(Argu argu, LocalDateTime after);
}


