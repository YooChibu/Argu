package com.argu.service;

import com.argu.dto.request.CreateOpinionRequest;
import com.argu.entity.Argu;
import com.argu.entity.ArguOpinion;
import com.argu.entity.User;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguOpinionRepository;
import com.argu.repository.ArguRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArguOpinionService {
    private final ArguOpinionRepository arguOpinionRepository;
    private final ArguRepository arguRepository;

    @Transactional
    public ArguOpinion createOpinion(CreateOpinionRequest request, Long userId) {
        Argu argu = arguRepository.findById(request.getArguId())
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        if (argu.getStatus() != Argu.ArguStatus.ACTIVE) {
            throw new BadRequestException("진행 중인 논쟁에만 입장을 선택할 수 있습니다");
        }

        if (LocalDateTime.now().isBefore(argu.getStartDate()) || LocalDateTime.now().isAfter(argu.getEndDate())) {
            throw new BadRequestException("논쟁 기간이 아닙니다");
        }

        User user = new User();
        user.setId(userId);

        if (arguOpinionRepository.existsByArguAndUser(argu, user)) {
            throw new BadRequestException("이미 입장을 선택했습니다");
        }

        ArguOpinion opinion = ArguOpinion.builder()
                .argu(argu)
                .user(user)
                .side(request.getSide())
                .content(request.getContent())
                .build();

        return arguOpinionRepository.save(opinion);
    }

    public List<ArguOpinion> getOpinionsByArgu(Long arguId) {
        Argu argu = arguRepository.findById(arguId)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        return arguOpinionRepository.findByArgu(argu);
    }
}


