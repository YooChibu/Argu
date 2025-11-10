package com.argu.service;

import com.argu.entity.Comment;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminCommentService {
    private final CommentRepository commentRepository;

    public Page<Comment> searchComments(String keyword, Boolean isHidden, Pageable pageable) {
        return commentRepository.searchComments(keyword, isHidden, pageable);
    }

    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("댓글을 찾을 수 없습니다"));
    }

    @Transactional
    public Comment toggleCommentHidden(Long commentId) {
        Comment comment = getCommentById(commentId);
        comment.setIsHidden(!comment.getIsHidden());
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = getCommentById(commentId);
        commentRepository.delete(comment);
    }
}



