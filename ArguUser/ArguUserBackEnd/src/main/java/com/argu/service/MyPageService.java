package com.argu.service;

import com.argu.dto.response.ArguResponse;
import com.argu.dto.response.CommentResponse;
import com.argu.entity.ArguOpinion;
import com.argu.entity.User;
import com.argu.repository.ArguOpinionRepository;
import com.argu.repository.ArguRepository;
import com.argu.repository.CommentRepository;
import com.argu.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 마이페이지 관련 비즈니스 로직을 처리하는 서비스 클래스
 * 현재 로그인한 사용자의 마이페이지 데이터를 제공합니다.
 */
@Service
@RequiredArgsConstructor
public class MyPageService {
    private final ArguRepository arguRepository;
    private final CommentRepository commentRepository;
    private final ArguOpinionRepository arguOpinionRepository;
    private final LikeRepository likeRepository;

    /**
     * 내 논쟁 목록 조회 (페이징)
     * 현재 로그인한 사용자가 작성한 논쟁 목록을 조회합니다.
     * 
     * @param userId 사용자 ID
     * @param pageable 페이징 정보
     * @return 사용자가 작성한 논쟁 목록 (좋아요 수, 댓글 수 포함)
     */
    public Page<ArguResponse> getMyArgus(Long userId, Pageable pageable) {
        User user = new User();
        user.setId(userId);
        
        return arguRepository.findByUserAndIsHiddenFalse(user, pageable)
                .map(argu -> {
                    Long likeCount = likeRepository.countByArgu(argu);
                    Long commentCount = commentRepository.countByArguAndIsHiddenFalse(argu);
                    return ArguResponse.from(argu, likeCount, commentCount);
                });
    }

    /**
     * 내 댓글 목록 조회 (페이징)
     * 현재 로그인한 사용자가 작성한 댓글 목록을 조회합니다.
     * 
     * @param userId 사용자 ID
     * @param pageable 페이징 정보
     * @return 사용자가 작성한 댓글 목록
     */
    public Page<CommentResponse> getMyComments(Long userId, Pageable pageable) {
        User user = new User();
        user.setId(userId);
        
        List<CommentResponse> comments = commentRepository.findByUser(user)
                .stream()
                .map(CommentResponse::from)
                .collect(Collectors.toList());
        
        // 페이징 처리
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), comments.size());
        List<CommentResponse> pagedComments = comments.subList(start, end);
        
        return new org.springframework.data.domain.PageImpl<>(
            pagedComments,
            pageable,
            comments.size()
        );
    }

    /**
     * 참여한 논쟁 목록 조회 (내 의견 목록)
     * 현재 로그인한 사용자가 입장을 선택한 논쟁 목록을 조회합니다.
     * 
     * @param userId 사용자 ID
     * @return 사용자가 선택한 의견 목록
     */
    public List<ArguOpinion> getMyOpinions(Long userId) {
        User user = new User();
        user.setId(userId);
        
        return arguOpinionRepository.findByUser(user);
    }
}

