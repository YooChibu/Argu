package com.argu.service;

import com.argu.dto.request.CreateCommentRequest;
import com.argu.dto.response.CommentResponse;
import com.argu.entity.Argu;
import com.argu.entity.Comment;
import com.argu.entity.User;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguRepository;
import com.argu.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArguRepository arguRepository;

    @Transactional
    public CommentResponse createComment(CreateCommentRequest request, Long userId) {
        Argu argu = arguRepository.findById(request.getArguId())
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        User user = new User();
        user.setId(userId);

        Comment parent = null;
        if (request.getParentId() != null) {
            parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("부모 댓글을 찾을 수 없습니다"));

            if (!parent.getArgu().getId().equals(argu.getId())) {
                throw new BadRequestException("부모 댓글이 해당 논쟁에 속하지 않습니다");
            }
        }

        Comment comment = Comment.builder()
                .user(user)
                .argu(argu)
                .parent(parent)
                .content(request.getContent())
                .isHidden(false)
                .build();

        comment = commentRepository.save(comment);
        return CommentResponse.from(comment);
    }

    public Page<CommentResponse> getCommentsByArgu(Long arguId, Pageable pageable) {
        Argu argu = arguRepository.findById(arguId)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        Page<Comment> comments = commentRepository.findByArguAndIsHiddenFalseAndParentIsNull(argu, pageable);

        return comments.map(comment -> {
            CommentResponse response = CommentResponse.from(comment);
            List<Comment> replies = commentRepository.findByParent(comment);
            response.setReplies(replies.stream()
                    .map(CommentResponse::from)
                    .collect(Collectors.toList()));
            return response;
        });
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("댓글을 찾을 수 없습니다"));

        if (!comment.getUser().getId().equals(userId)) {
            throw new BadRequestException("댓글을 삭제할 권한이 없습니다");
        }

        commentRepository.delete(comment);
    }
}


