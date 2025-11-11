package com.argu.service;

import com.argu.dto.response.UserDetailResponse;
import com.argu.entity.User;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguRepository;
import com.argu.repository.CommentRepository;
import com.argu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 관리자 회원 운영 로직을 담당하는 서비스.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;
    private final CommentRepository commentRepository;

    /**
     * 조건에 맞는 회원을 페이지 조회한다.
     *
     * @param keyword  검색 키워드
     * @param status   회원 상태 필터
     * @param pageable 페이지 정보
     * @return 회원 페이지 결과
     */
    public Page<User> searchUsers(String keyword, User.UserStatus status, Pageable pageable) {
        log.debug("[ADMIN-USER] 회원 검색 - keyword={}, status={}, page={}, size={}",
                keyword, status, pageable.getPageNumber(), pageable.getPageSize());
        return userRepository.searchUsers(keyword, status, pageable);
    }

    /**
     * 회원 상세 정보와 활동 지표를 조회한다.
     *
     * @param userId 회원 ID
     * @return 회원 상세 응답 DTO
     * @throws ResourceNotFoundException 회원이 없을 때
     */
    public UserDetailResponse getUserDetail(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("[ADMIN-USER] 회원 상세 조회 실패 - 존재하지 않음 userId={}", userId);
                    return new ResourceNotFoundException("사용자를 찾을 수 없습니다");
                });

        long arguCount = arguRepository.findByUserAndIsHiddenFalse(user, Pageable.unpaged()).getTotalElements();
        long commentCount = commentRepository.findByUser(user).size();

        log.debug("[ADMIN-USER] 회원 상세 조회 - userId={}, arguCount={}, commentCount={}",
                userId, arguCount, commentCount);

        return UserDetailResponse.from(user, arguCount, commentCount);
    }

    /**
     * 회원 상태를 변경한다.
     *
     * @param userId 회원 ID
     * @param status 설정할 상태
     * @return 상태가 변경된 회원
     */
    @Transactional
    public User updateUserStatus(Long userId, User.UserStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("[ADMIN-USER] 회원 상태 변경 실패 - 존재하지 않음 userId={}", userId);
                    return new ResourceNotFoundException("사용자를 찾을 수 없습니다");
                });
        user.setStatus(status);
        User updated = userRepository.save(user);
        log.info("[ADMIN-USER] 회원 상태 변경 - userId={}, status={}", updated.getId(), updated.getStatus());
        return updated;
    }

    /**
     * 회원을 삭제 상태로 전환한다.
     *
     * @param userId 회원 ID
     */
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("[ADMIN-USER] 회원 삭제 실패 - 존재하지 않음 userId={}", userId);
                    return new ResourceNotFoundException("사용자를 찾을 수 없습니다");
                });
        user.setStatus(User.UserStatus.DELETED);
        userRepository.save(user);
        log.info("[ADMIN-USER] 회원 삭제 처리 - userId={}", userId);
    }
}



