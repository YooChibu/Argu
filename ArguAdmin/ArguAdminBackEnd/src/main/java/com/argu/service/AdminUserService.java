package com.argu.service;

import com.argu.dto.response.UserDetailResponse;
import com.argu.entity.User;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguRepository;
import com.argu.repository.CommentRepository;
import com.argu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;
    private final CommentRepository commentRepository;

    public Page<User> searchUsers(String keyword, User.UserStatus status, Pageable pageable) {
        return userRepository.searchUsers(keyword, status, pageable);
    }

    public UserDetailResponse getUserDetail(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));

        long arguCount = arguRepository.findByUserAndIsHiddenFalse(user, Pageable.unpaged()).getTotalElements();
        long commentCount = commentRepository.findByUser(user).size();

        return UserDetailResponse.from(user, arguCount, commentCount);
    }

    @Transactional
    public User updateUserStatus(Long userId, User.UserStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));
        user.setStatus(status);
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));
        user.setStatus(User.UserStatus.DELETED);
        userRepository.save(user);
    }
}



