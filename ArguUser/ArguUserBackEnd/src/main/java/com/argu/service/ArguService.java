package com.argu.service;

import com.argu.dto.request.CreateArguRequest;
import com.argu.dto.request.UpdateArguRequest;
import com.argu.dto.response.ArguResponse;
import com.argu.entity.Argu;
import com.argu.entity.Category;
import com.argu.entity.User;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.exception.UnauthorizedException;
import com.argu.repository.ArguRepository;
import com.argu.repository.CategoryRepository;
import com.argu.repository.CommentRepository;
import com.argu.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 논쟁(Argu) 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class ArguService {
    private final ArguRepository arguRepository;           // 논쟁 데이터 접근 리포지토리
    private final CategoryRepository categoryRepository;   // 카테고리 데이터 접근 리포지토리
    private final LikeRepository likeRepository;           // 좋아요 데이터 접근 리포지토리
    private final CommentRepository commentRepository;     // 댓글 데이터 접근 리포지토리

    /**
     * 새로운 논쟁 생성
     * 
     * @param request 논쟁 생성 요청 데이터
     * @param userId 작성자 사용자 ID
     * @return 생성된 논쟁 응답 DTO
     * @throws ResourceNotFoundException 카테고리를 찾을 수 없는 경우
     * @throws BadRequestException 날짜 검증 실패 시
     */
    @Transactional
    public ArguResponse createArgu(CreateArguRequest request, Long userId) {
        // 작성자 사용자 엔티티 생성
        User user = new User();
        user.setId(userId);

        // 카테고리 조회 및 검증
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("카테고리를 찾을 수 없습니다"));

        // 날짜 검증: 시작일시는 종료일시보다 이전이어야 함
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new BadRequestException("시작일시는 종료일시보다 이전이어야 합니다");
        }

        // 날짜 검증: 시작일시는 현재 시간보다 이후여야 함
        if (request.getStartDate().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("시작일시는 현재 시간보다 이후여야 합니다");
        }

        // 논쟁 엔티티 생성
        Argu argu = Argu.builder()
                .user(user)                                    // 작성자
                .category(category)                            // 카테고리
                .title(request.getTitle())                     // 제목
                .content(request.getContent())                 // 내용
                .startDate(request.getStartDate())            // 시작일시
                .endDate(request.getEndDate())                // 종료일시
                .status(Argu.ArguStatus.SCHEDULED)            // 상태: 예정
                .isHidden(false)                               // 숨김 처리: false
                .viewCount(0)                                   // 조회수: 0
                .build();

        // 논쟁 저장
        argu = arguRepository.save(argu);
        
        // 응답 DTO 생성 (좋아요 수, 댓글 수는 0으로 초기화)
        return ArguResponse.from(argu, 0L, 0L);
    }

    /**
     * 논쟁 ID로 논쟁 상세 정보 조회
     * 조회 시 조회수가 자동으로 증가합니다.
     * 
     * @param id 논쟁 ID
     * @return 논쟁 상세 정보 (좋아요 수, 댓글 수 포함)
     * @throws ResourceNotFoundException 논쟁을 찾을 수 없거나 숨김 처리된 경우
     */
    public ArguResponse getArguById(Long id) {
        // 논쟁 조회
        Argu argu = arguRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        // 숨김 처리된 논쟁인지 확인
        if (argu.getIsHidden()) {
            throw new ResourceNotFoundException("논쟁을 찾을 수 없습니다");
        }

        // 조회수 증가
        argu.setViewCount(argu.getViewCount() + 1);
        arguRepository.save(argu);

        // 좋아요 수 조회
        Long likeCount = likeRepository.countByArgu(argu);
        
        // 댓글 수 조회 (숨김 처리되지 않은 댓글만)
        Long commentCount = commentRepository.countByArguAndIsHiddenFalse(argu);

        // 응답 DTO 생성
        return ArguResponse.from(argu, likeCount, commentCount);
    }

    /**
     * 전체 논쟁 목록 조회 (페이징)
     * 숨김 처리되지 않은 논쟁만 조회합니다.
     * 
     * @param pageable 페이징 정보
     * @return 논쟁 목록 (좋아요 수, 댓글 수 포함)
     */
    public Page<ArguResponse> getAllArgus(Pageable pageable) {
        return arguRepository.findByIsHiddenFalse(pageable)
                .map(argu -> {
                    // 각 논쟁의 좋아요 수와 댓글 수를 조회하여 응답 DTO 생성
                    Long likeCount = likeRepository.countByArgu(argu);
                    Long commentCount = commentRepository.countByArguAndIsHiddenFalse(argu);
                    return ArguResponse.from(argu, likeCount, commentCount);
                });
    }

    /**
     * 카테고리별 논쟁 목록 조회 (페이징)
     * 
     * @param categoryId 카테고리 ID
     * @param pageable 페이징 정보
     * @return 해당 카테고리의 논쟁 목록 (좋아요 수, 댓글 수 포함)
     * @throws ResourceNotFoundException 카테고리를 찾을 수 없는 경우
     */
    public Page<ArguResponse> getArgusByCategory(Long categoryId, Pageable pageable) {
        // 카테고리 조회 및 검증
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("카테고리를 찾을 수 없습니다"));

        return arguRepository.findByCategoryAndIsHiddenFalse(category, pageable)
                .map(argu -> {
                    // 각 논쟁의 좋아요 수와 댓글 수를 조회하여 응답 DTO 생성
                    Long likeCount = likeRepository.countByArgu(argu);
                    Long commentCount = commentRepository.countByArguAndIsHiddenFalse(argu);
                    return ArguResponse.from(argu, likeCount, commentCount);
                });
    }

    /**
     * 키워드로 논쟁 검색 (페이징)
     * 제목과 내용에서 키워드를 검색합니다.
     * 
     * @param keyword 검색 키워드
     * @param pageable 페이징 정보
     * @return 검색된 논쟁 목록 (좋아요 수, 댓글 수 포함)
     */
    public Page<ArguResponse> searchArgus(String keyword, Pageable pageable) {
        return arguRepository.searchByKeyword(keyword, pageable)
                .map(argu -> {
                    // 각 논쟁의 좋아요 수와 댓글 수를 조회하여 응답 DTO 생성
                    Long likeCount = likeRepository.countByArgu(argu);
                    Long commentCount = commentRepository.countByArguAndIsHiddenFalse(argu);
                    return ArguResponse.from(argu, likeCount, commentCount);
                });
    }

    /**
     * 논쟁 상태 자동 업데이트
     * 스케줄러에서 주기적으로 호출하여 논쟁 상태를 자동으로 변경합니다.
     * - SCHEDULED → ACTIVE: 시작일시가 지난 논쟁
     * - ACTIVE → ENDED: 종료일시가 지난 논쟁
     */
    @Transactional
    public void updateArguStatus() {
        LocalDateTime now = LocalDateTime.now();

        // 예정(SCHEDULED) 상태인 논쟁 중 시작일시가 지난 논쟁을 진행중(ACTIVE)으로 변경
        List<Argu> scheduledArgus = arguRepository.findByStatusAndStartDateLessThanEqual(
                Argu.ArguStatus.SCHEDULED, now);
        scheduledArgus.forEach(argu -> argu.setStatus(Argu.ArguStatus.ACTIVE));
        arguRepository.saveAll(scheduledArgus);

        // 진행중(ACTIVE) 상태인 논쟁 중 종료일시가 지난 논쟁을 종료(ENDED)로 변경
        List<Argu> activeArgus = arguRepository.findByStatusAndEndDateLessThanEqual(
                Argu.ArguStatus.ACTIVE, now);
        activeArgus.forEach(argu -> argu.setStatus(Argu.ArguStatus.ENDED));
        arguRepository.saveAll(activeArgus);
    }

    /**
     * 논쟁 수정
     * 작성자만 수정 가능하며, 논쟁이 시작되기 전(SCHEDULED 상태)에만 수정 가능합니다.
     * 
     * @param id 논쟁 ID
     * @param request 수정 요청 데이터
     * @param userId 현재 사용자 ID
     * @return 수정된 논쟁 응답 DTO
     * @throws ResourceNotFoundException 논쟁을 찾을 수 없는 경우
     * @throws UnauthorizedException 작성자가 아닌 경우
     * @throws BadRequestException 논쟁이 이미 시작되었거나 날짜 검증 실패 시
     */
    @Transactional
    public ArguResponse updateArgu(Long id, UpdateArguRequest request, Long userId) {
        // 논쟁 조회
        Argu argu = arguRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        // 숨김 처리된 논쟁인지 확인
        if (argu.getIsHidden()) {
            throw new ResourceNotFoundException("논쟁을 찾을 수 없습니다");
        }

        // 작성자 권한 확인
        if (!argu.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("논쟁을 수정할 권한이 없습니다");
        }

        // 논쟁 상태 확인 (시작 전에만 수정 가능)
        if (argu.getStatus() != Argu.ArguStatus.SCHEDULED) {
            throw new BadRequestException("논쟁이 시작된 후에는 수정할 수 없습니다");
        }

        // 제목 수정
        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            argu.setTitle(request.getTitle().trim());
        }

        // 내용 수정
        if (request.getContent() != null) {
            argu.setContent(request.getContent());
        }

        // 카테고리 수정
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("카테고리를 찾을 수 없습니다"));
            argu.setCategory(category);
        }

        // 날짜 수정 및 검증
        LocalDateTime newStartDate = request.getStartDate() != null ? request.getStartDate() : argu.getStartDate();
        LocalDateTime newEndDate = request.getEndDate() != null ? request.getEndDate() : argu.getEndDate();

        // 날짜 검증: 시작일시는 종료일시보다 이전이어야 함
        if (newStartDate.isAfter(newEndDate)) {
            throw new BadRequestException("시작일시는 종료일시보다 이전이어야 합니다");
        }

        // 날짜 검증: 시작일시는 현재 시간보다 이후여야 함
        if (newStartDate.isBefore(LocalDateTime.now())) {
            throw new BadRequestException("시작일시는 현재 시간보다 이후여야 합니다");
        }

        if (request.getStartDate() != null) {
            argu.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            argu.setEndDate(request.getEndDate());
        }

        // 논쟁 저장
        argu = arguRepository.save(argu);

        // 좋아요 수 조회
        Long likeCount = likeRepository.countByArgu(argu);
        
        // 댓글 수 조회 (숨김 처리되지 않은 댓글만)
        Long commentCount = commentRepository.countByArguAndIsHiddenFalse(argu);

        // 응답 DTO 생성
        return ArguResponse.from(argu, likeCount, commentCount);
    }

    /**
     * 논쟁 삭제
     * 작성자만 삭제 가능하며, 논쟁이 시작되기 전(SCHEDULED 상태)에만 삭제 가능합니다.
     * 
     * @param id 삭제할 논쟁 ID
     * @param userId 현재 사용자 ID
     * @throws ResourceNotFoundException 논쟁을 찾을 수 없는 경우
     * @throws UnauthorizedException 작성자가 아닌 경우
     * @throws BadRequestException 논쟁이 이미 시작된 경우
     */
    @Transactional
    public void deleteArgu(Long id, Long userId) {
        // 논쟁 조회
        Argu argu = arguRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("논쟁을 찾을 수 없습니다"));

        // 작성자 권한 확인
        if (!argu.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("논쟁을 삭제할 권한이 없습니다");
        }

        // 논쟁 상태 확인 (시작 전에만 삭제 가능)
        if (argu.getStatus() != Argu.ArguStatus.SCHEDULED) {
            throw new BadRequestException("논쟁이 시작된 후에는 삭제할 수 없습니다");
        }

        // 논쟁 삭제
        arguRepository.delete(argu);
    }
}

