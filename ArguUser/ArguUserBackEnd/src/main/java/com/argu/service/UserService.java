package com.argu.service;

import com.argu.dto.response.UserResponse;
import com.argu.entity.User;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguOpinionRepository;
import com.argu.repository.ArguRepository;
import com.argu.repository.CommentRepository;
import com.argu.repository.LikeRepository;
import com.argu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final ArguOpinionRepository arguOpinionRepository;

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));
        
        // 통계 정보 계산
        long arguCount = arguRepository.findByUserAndIsHiddenFalse(user, Pageable.unpaged()).getTotalElements();
        long commentCount = commentRepository.findByUser(user).size();
        
        // 받은 좋아요 수: 사용자가 작성한 논쟁들에 받은 좋아요 총합
        long likeCount = arguRepository.findByUserAndIsHiddenFalse(user, Pageable.unpaged())
                .getContent()
                .stream()
                .mapToLong(argu -> likeRepository.countByArgu(argu))
                .sum();
        
        // 참여한 논쟁 수: 입장을 선택한 논쟁 수
        long participatedCount = arguOpinionRepository.findByUser(user).size();
        
        return UserResponse.from(user, arguCount, commentCount, likeCount, participatedCount);
    }

    @Transactional
    public UserResponse updateProfile(Long userId, String nickname, String bio, String profileImage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));

        if (nickname != null && !nickname.isEmpty()) {
            user.setNickname(nickname);
        }
        if (bio != null) {
            user.setBio(bio);
        }
        if (profileImage != null) {
            user.setProfileImage(profileImage);
        }

        user = userRepository.save(user);
        return UserResponse.from(user);
    }

    public User getUserEntity(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("사용자를 찾을 수 없습니다"));
    }
}


