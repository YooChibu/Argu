package com.argu.service;

import com.argu.entity.Argu;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminArguService {
    private final ArguRepository arguRepository;

    public Page<Argu> searchArgus(String keyword, Argu.ArguStatus status, Boolean isHidden, Pageable pageable) {
        return arguRepository.searchArgus(keyword, status, isHidden, pageable);
    }

    public Argu getArguById(Long arguId) {
        return arguRepository.findById(arguId)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));
    }

    @Transactional
    public Argu updateArgu(Long arguId, String title, String content, LocalDateTime startDate, LocalDateTime endDate) {
        Argu argu = getArguById(arguId);
        if (title != null) argu.setTitle(title);
        if (content != null) argu.setContent(content);
        if (startDate != null) argu.setStartDate(startDate);
        if (endDate != null) argu.setEndDate(endDate);
        return arguRepository.save(argu);
    }

    @Transactional
    public Argu updateArguStatus(Long arguId, Argu.ArguStatus status) {
        Argu argu = getArguById(arguId);
        argu.setStatus(status);
        return arguRepository.save(argu);
    }

    @Transactional
    public Argu toggleArguHidden(Long arguId) {
        Argu argu = getArguById(arguId);
        argu.setIsHidden(!argu.getIsHidden());
        return arguRepository.save(argu);
    }

    @Transactional
    public void deleteArgu(Long arguId) {
        Argu argu = getArguById(arguId);
        arguRepository.delete(argu);
    }
}



