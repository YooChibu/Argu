package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.entity.Argu;
import com.argu.service.AdminArguService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

/**
 * 관리자 콘솔에서 논쟁(Argu) 데이터를 관리하기 위한 REST 컨트롤러.
 * <p>
 * 페이징 목록 조회, 상세 조회, 내용/기간 수정, 상태 전환, 숨김 토글, 삭제 등 운영에 필요한 액션을 제공한다.
 */
@Tag(name = "관리자 논쟁 관리 API", description = "논쟁 조회, 수정, 삭제, 숨김 처리 등 논쟁 관리 API")
@RestController
@RequestMapping("/api/admin/argu")
@RequiredArgsConstructor
public class AdminArguController {
    private final AdminArguService adminArguService;

    /**
     * 조건을 지정해 논쟁 목록을 페이지 단위로 조회한다.
     *
     * @param keyword   제목/내용 검색 키워드
     * @param status    논쟁 상태(SCHEDULED/ACTIVE/ENDED)
     * @param isHidden  숨김 여부 필터
     * @param page      페이지 번호(0-base)
     * @param size      페이지 크기
     * @return 조건에 맞는 논쟁 페이지 wrapped ApiResponse
     */
    @Operation(summary = "논쟁 목록 조회", description = "검색 조건에 따라 논쟁 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Argu>>> getArgus(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Argu.ArguStatus status,
            @RequestParam(required = false) Boolean isHidden,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Argu> argus = adminArguService.searchArgus(keyword, status, isHidden, pageable);
        return ResponseEntity.ok(ApiResponse.success(argus));
    }

    /**
     * 특정 논쟁의 상세 정보를 조회한다.
     *
     * @param id 논쟁 ID
     * @return 논쟁 엔티티 wrapped ApiResponse
     */
    @Operation(summary = "논쟁 상세 조회", description = "논쟁의 상세 정보를 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Argu>> getArguDetail(@PathVariable Long id) {
        Argu argu = adminArguService.getArguById(id);
        return ResponseEntity.ok(ApiResponse.success(argu));
    }

    /**
     * 논쟁 제목/내용/시작일/종료일을 선택적으로 갱신한다.
     *
     * @param id        논쟁 ID
     * @param title     변경할 제목
     * @param content   변경할 본문
     * @param startDate 변경할 시작 시각
     * @param endDate   변경할 종료 시각
     * @return 수정된 논쟁 엔티티 wrapped ApiResponse
     */
    @Operation(summary = "논쟁 수정", description = "논쟁 정보를 수정합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Argu>> updateArgu(
            @PathVariable Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        Argu argu = adminArguService.updateArgu(id, title, content, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("논쟁이 수정되었습니다", argu));
    }

    /**
     * 논쟁의 진행 상태를 변경한다.
     *
     * @param id     논쟁 ID
     * @param status 설정할 상태 값
     * @return 변경된 논쟁 엔티티 wrapped ApiResponse
     */
    @Operation(summary = "논쟁 상태 변경", description = "논쟁의 상태를 변경합니다.")
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Argu>> updateArguStatus(
            @PathVariable Long id,
            @RequestParam Argu.ArguStatus status) {
        Argu argu = adminArguService.updateArguStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("논쟁 상태가 변경되었습니다", argu));
    }

    /**
     * 논쟁의 숨김 플래그를 토글한다.
     *
     * @param id 논쟁 ID
     * @return 토글된 논쟁 엔티티 wrapped ApiResponse
     */
    @Operation(summary = "논쟁 숨김 처리", description = "논쟁의 숨김 상태를 토글합니다.")
    @PutMapping("/{id}/toggle-hidden")
    public ResponseEntity<ApiResponse<Argu>> toggleArguHidden(@PathVariable Long id) {
        Argu argu = adminArguService.toggleArguHidden(id);
        return ResponseEntity.ok(ApiResponse.success("논쟁 숨김 상태가 변경되었습니다", argu));
    }

    /**
     * 논쟁을 영구 삭제한다.
     *
     * @param id 논쟁 ID
     * @return 성공 메시지 응답
     */
    @Operation(summary = "논쟁 삭제", description = "논쟁을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteArgu(@PathVariable Long id) {
        adminArguService.deleteArgu(id);
        return ResponseEntity.ok(ApiResponse.success("논쟁이 삭제되었습니다", null));
    }
}



