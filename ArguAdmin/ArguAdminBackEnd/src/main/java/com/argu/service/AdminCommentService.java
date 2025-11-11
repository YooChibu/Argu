package com.argu.service;

import com.argu.entity.Comment;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 관리자 댓글 운영 로직을 담당하는 서비스.
 * <p>
 * 댓글 검색, 단일 조회, 숨김 토글, 삭제 기능을 제공한다.
 */
@Service
@RequiredArgsConstructor
public class AdminCommentService {
    private final CommentRepository commentRepository;

    /**
     * 조건에 맞는 댓글을 페이지 조회한다.
     *
     * @param keyword  댓글 내용 검색어
     * @param isHidden 숨김 여부 필터
     * @param pageable 페이지 정보
     * @return 댓글 페이지 결과
     */
    public Page<Comment> searchComments(String keyword, Boolean isHidden, Pageable pageable) {
        return commentRepository.searchComments(keyword, isHidden, pageable);
    }

    /**
     * 댓글 ID로 단일 댓글을 조회한다.
     *
     * @param commentId 댓글 ID
     * @return 댓글 엔티티
     * @throws ResourceNotFoundException 댓글이 없을 때
     */
    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("댓글을 찾을 수 없습니다"));
    }

    /**
     * 댓글 숨김 여부를 토글한다.
     *
     * @param commentId 댓글 ID
     * @return 숨김 상태가 변경된 댓글
     */
    @Transactional
    public Comment toggleCommentHidden(Long commentId) {
        Comment comment = getCommentById(commentId);
        comment.setIsHidden(!comment.getIsHidden());
        return commentRepository.save(comment);
    }

    /**
     * 댓글을 삭제한다.
     *
     * @param commentId 댓글 ID
     */
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = getCommentById(commentId);
        commentRepository.delete(comment);
    }
}



