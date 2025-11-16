package com.argu.service;

import com.argu.entity.Argu;
import com.argu.entity.Like;
import com.argu.entity.User;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguRepository;
import com.argu.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final ArguRepository arguRepository;

    @Transactional
    public void toggleLike(Long arguId, Long userId) {
        Argu argu = arguRepository.findById(arguId)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        User user = new User();
        user.setId(userId);

        likeRepository.findByArguAndUser(argu, user)
                .ifPresentOrElse(
                        likeRepository::delete,
                        () -> {
                            Like like = Like.builder()
                                    .argu(argu)
                                    .user(user)
                                    .build();
                            likeRepository.save(like);
                        }
                );
    }

    public boolean isLiked(Long arguId, Long userId) {
        Argu argu = new Argu();
        argu.setId(arguId);
        User user = new User();
        user.setId(userId);
        return likeRepository.existsByArguAndUser(argu, user);
    }
}


