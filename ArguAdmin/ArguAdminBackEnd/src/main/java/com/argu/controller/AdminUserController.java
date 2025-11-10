package com.argu.controller;

import com.argu.dto.response.ApiResponse;
import com.argu.dto.response.UserDetailResponse;
import com.argu.entity.User;
import com.argu.service.AdminUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "관리자 회원 관리 API", description = "회원 조회, 검색, 상태 변경 등 회원 관리 API")
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @Operation(summary = "회원 목록 조회", description = "검색 조건에 따라 회원 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<User>>> getUsers(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) User.UserStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = adminUserService.searchUsers(keyword, status, pageable);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @Operation(summary = "회원 상세 조회", description = "회원의 상세 정보를 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDetailResponse>> getUserDetail(@PathVariable Long id) {
        UserDetailResponse user = adminUserService.getUserDetail(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @Operation(summary = "회원 상태 변경", description = "회원의 상태를 변경합니다 (ACTIVE, SUSPENDED, DELETED).")
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<User>> updateUserStatus(
            @PathVariable Long id,
            @RequestParam User.UserStatus status) {
        User user = adminUserService.updateUserStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("회원 상태가 변경되었습니다", user));
    }

    @Operation(summary = "회원 삭제", description = "회원을 삭제 처리합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        adminUserService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success("회원이 삭제되었습니다", null));
    }
}



