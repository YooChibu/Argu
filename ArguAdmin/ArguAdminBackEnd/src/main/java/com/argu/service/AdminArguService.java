package com.argu.service;

import com.argu.entity.Argu;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.ArguRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 관리자 논쟁(Argu) 운영 로직을 담당하는 서비스.
 * <p>
 * 검색, 상세 조회, 정보 수정, 상태 변경, 숨김 토글, 삭제 등의 CRUD 액션을 제공한다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminArguService {
    private final ArguRepository arguRepository;

    /**
     * 조건에 맞는 논쟁을 페이지 조회한다.
     *
     * @param keyword  제목/내용 검색 키워드
     * @param status   논쟁 상태
     * @param isHidden 숨김 여부
     * @param pageable 페이지 정보
     * @return 논쟁 페이지 결과
     */
    public Page<Argu> searchArgus(String keyword, Argu.ArguStatus status, Boolean isHidden, Pageable pageable) {
        log.debug("[ADMIN-ARGU] 논쟁 검색 - keyword={}, status={}, isHidden={} page={} size={}",
                keyword, status, isHidden, pageable.getPageNumber(), pageable.getPageSize());
        return arguRepository.searchArgus(keyword, status, isHidden, pageable);
    }

    /**
     * 논쟁 ID로 엔티티를 조회한다.
     *
     * @param arguId 논쟁 ID
     * @return 존재하는 논쟁 엔티티
     * @throws ResourceNotFoundException 논쟁이 없을 때
     */
    public Argu getArguById(Long arguId) {
        return arguRepository.findById(arguId)
                .orElseThrow(() -> {
                    log.warn("[ADMIN-ARGU] 논쟁 조회 실패 - 존재하지 않음 arguId={}", arguId);
                    return new ResourceNotFoundException("논쟁을 찾을 수 없습니다");
                });
    }

    /**
     * 논쟁의 기본 정보를 선택적으로 변경한다.
     *
     * @param arguId    논쟁 ID
     * @param title     변경할 제목
     * @param content   변경할 내용
     * @param startDate 변경할 시작일
     * @param endDate   변경할 종료일
     * @return 수정된 논쟁 엔티티
     */
    @Transactional
    public Argu updateArgu(Long arguId, String title, String content, LocalDateTime startDate, LocalDateTime endDate) {
        Argu argu = getArguById(arguId);
        if (title != null) argu.setTitle(title);
        if (content != null) argu.setContent(content);
        if (startDate != null) argu.setStartDate(startDate);
        if (endDate != null) argu.setEndDate(endDate);
        Argu updated = arguRepository.save(argu);
        log.info("[ADMIN-ARGU] 논쟁 수정 - arguId={}, title={}", updated.getId(), updated.getTitle());
        return updated;
    }

    /**
     * 논쟁 상태를 변경한다.
     *
     * @param arguId 논쟁 ID
     * @param status 설정할 상태
     * @return 상태가 변경된 논쟁
     */
    @Transactional
    public Argu updateArguStatus(Long arguId, Argu.ArguStatus status) {
        Argu argu = getArguById(arguId);
        argu.setStatus(status);
        Argu updated = arguRepository.save(argu);
        log.info("[ADMIN-ARGU] 논쟁 상태 변경 - arguId={}, status={}", updated.getId(), updated.getStatus());
        return updated;
    }

    /**
     * 논쟁의 숨김 플래그를 토글한다.
     *
     * @param arguId 논쟁 ID
     * @return 숨김 상태가 토글된 논쟁
     */
    @Transactional
    public Argu toggleArguHidden(Long arguId) {
        Argu argu = getArguById(arguId);
        argu.setIsHidden(!argu.getIsHidden());
        Argu updated = arguRepository.save(argu);
        log.info("[ADMIN-ARGU] 논쟁 숨김 토글 - arguId={}, hidden={}", updated.getId(), updated.getIsHidden());
        return updated;
    }

    /**
     * 논쟁을 삭제한다.
     *
     * @param arguId 논쟁 ID
     */
    @Transactional
    public void deleteArgu(Long arguId) {
        Argu argu = getArguById(arguId);
        arguRepository.delete(argu);
        log.info("[ADMIN-ARGU] 논쟁 삭제 - arguId={}", arguId);
    }
}



