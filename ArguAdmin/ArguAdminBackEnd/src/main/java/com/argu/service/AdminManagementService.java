package com.argu.service;

import com.argu.dto.request.CreateAdminRequest;
import com.argu.entity.Admin;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 관리자 계정 CRUD와 비밀번호/역할 관리 로직을 담당하는 서비스.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminManagementService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * 모든 관리자 목록을 조회한다.
     *
     * @return 관리자 리스트
     */
    public List<Admin> getAllAdmins() {
        log.debug("[ADMIN-MGMT] 전체 관리자 목록 조회");
        return adminRepository.findAll();
    }

    /**
     * ID로 관리자 정보를 조회한다.
     *
     * @param adminId 관리자 ID
     * @return 관리자 엔티티
     * @throws ResourceNotFoundException 없을 때
     */
    public Admin getAdminById(Long adminId) {
        return adminRepository.findById(adminId)
                .orElseThrow(() -> {
                    log.warn("[ADMIN-MGMT] 관리자 조회 실패 - 존재하지 않음 adminId={}", adminId);
                    return new ResourceNotFoundException("관리자를 찾을 수 없습니다");
                });
    }

    /**
     * 신규 관리자 계정을 생성한다.
     *
     * @param request 관리자 생성 요청 DTO
     * @return 생성된 관리자
     * @throws BadRequestException 아이디가 중복될 때
     */
    @Transactional
    public Admin createAdmin(CreateAdminRequest request) {
        if (adminRepository.existsByAdminId(request.getAdminId())) {
            log.warn("[ADMIN-MGMT] 관리자 생성 실패 - 중복 adminId={}", request.getAdminId());
            throw new BadRequestException("이미 존재하는 관리자 아이디입니다");
        }

        Admin admin = Admin.builder()
                .adminId(request.getAdminId())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(request.getRole() != null ? request.getRole() : Admin.AdminRole.ADMIN)
                .status(Admin.AdminStatus.ACTIVE)
                .build();

        Admin saved = adminRepository.save(admin);
        log.info("[ADMIN-MGMT] 관리자 생성 성공 - adminId={}, role={} ", saved.getAdminId(), saved.getRole());
        return saved;
    }

    /**
     * 관리자 이름/역할/상태를 업데이트한다.
     *
     * @param adminId 관리자 ID
     * @param name    변경할 이름
     * @param role    변경할 역할
     * @param status  변경할 상태
     * @return 수정된 관리자
     */
    @Transactional
    public Admin updateAdmin(Long adminId, String name, Admin.AdminRole role, Admin.AdminStatus status) {
        Admin admin = getAdminById(adminId);
        if (name != null) admin.setName(name);
        if (role != null) admin.setRole(role);
        if (status != null) admin.setStatus(status);
        Admin updated = adminRepository.save(admin);
        log.info("[ADMIN-MGMT] 관리자 정보 수정 - adminId={}, role={}, status={}", updated.getAdminId(), updated.getRole(), updated.getStatus());
        return updated;
    }

    /**
     * 관리자 비밀번호를 변경한다.
     *
     * @param adminId     관리자 ID
     * @param newPassword 새 비밀번호
     * @return 비밀번호가 변경된 관리자
     */
    @Transactional
    public Admin updateAdminPassword(Long adminId, String newPassword) {
        Admin admin = getAdminById(adminId);
        admin.setPassword(passwordEncoder.encode(newPassword));
        Admin updated = adminRepository.save(admin);
        log.info("[ADMIN-MGMT] 관리자 비밀번호 변경 - adminId={}", updated.getAdminId());
        return updated;
    }

    /**
     * 관리자 계정을 삭제한다.
     *
     * @param adminId 관리자 ID
     */
    @Transactional
    public void deleteAdmin(Long adminId) {
        Admin admin = getAdminById(adminId);
        adminRepository.delete(admin);
        log.info("[ADMIN-MGMT] 관리자 삭제 - adminId={}", admin.getAdminId());
    }
}



