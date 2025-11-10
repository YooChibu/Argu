package com.argu.controller;

import com.argu.dto.request.CreateAdminRequest;
import com.argu.dto.response.ApiResponse;
import com.argu.entity.Admin;
import com.argu.service.AdminManagementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "관리자 관리 API", description = "관리자 계정 조회, 생성, 수정, 삭제 등 관리자 관리 API")
@RestController
@RequestMapping("/api/admin/admins")
@RequiredArgsConstructor
public class AdminManagementController {
    private final AdminManagementService adminManagementService;

    @Operation(summary = "관리자 목록 조회", description = "전체 관리자 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<ApiResponse<List<Admin>>> getAdmins() {
        List<Admin> admins = adminManagementService.getAllAdmins();
        return ResponseEntity.ok(ApiResponse.success(admins));
    }

    @Operation(summary = "관리자 상세 조회", description = "관리자의 상세 정보를 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Admin>> getAdminDetail(@PathVariable Long id) {
        Admin admin = adminManagementService.getAdminById(id);
        return ResponseEntity.ok(ApiResponse.success(admin));
    }

    @Operation(summary = "관리자 생성", description = "새로운 관리자 계정을 생성합니다.")
    @PostMapping
    public ResponseEntity<ApiResponse<Admin>> createAdmin(@Valid @RequestBody CreateAdminRequest request) {
        Admin admin = adminManagementService.createAdmin(request);
        return ResponseEntity.ok(ApiResponse.success("관리자가 생성되었습니다", admin));
    }

    @Operation(summary = "관리자 정보 수정", description = "관리자 정보를 수정합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Admin>> updateAdmin(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Admin.AdminRole role,
            @RequestParam(required = false) Admin.AdminStatus status) {
        Admin admin = adminManagementService.updateAdmin(id, name, role, status);
        return ResponseEntity.ok(ApiResponse.success("관리자 정보가 수정되었습니다", admin));
    }

    @Operation(summary = "관리자 비밀번호 변경", description = "관리자의 비밀번호를 변경합니다.")
    @PutMapping("/{id}/password")
    public ResponseEntity<ApiResponse<Admin>> updateAdminPassword(
            @PathVariable Long id,
            @RequestParam String newPassword) {
        Admin admin = adminManagementService.updateAdminPassword(id, newPassword);
        return ResponseEntity.ok(ApiResponse.success("비밀번호가 변경되었습니다", admin));
    }

    @Operation(summary = "관리자 삭제", description = "관리자 계정을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAdmin(@PathVariable Long id) {
        adminManagementService.deleteAdmin(id);
        return ResponseEntity.ok(ApiResponse.success("관리자가 삭제되었습니다", null));
    }
}



