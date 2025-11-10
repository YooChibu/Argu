package com.argu.service;

import com.argu.dto.request.CreateAdminRequest;
import com.argu.entity.Admin;
import com.argu.exception.BadRequestException;
import com.argu.exception.ResourceNotFoundException;
import com.argu.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminManagementService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long adminId) {
        return adminRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("관리자를 찾을 수 없습니다"));
    }

    @Transactional
    public Admin createAdmin(CreateAdminRequest request) {
        if (adminRepository.existsByAdminId(request.getAdminId())) {
            throw new BadRequestException("이미 존재하는 관리자 아이디입니다");
        }

        Admin admin = Admin.builder()
                .adminId(request.getAdminId())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(request.getRole() != null ? request.getRole() : Admin.AdminRole.ADMIN)
                .status(Admin.AdminStatus.ACTIVE)
                .build();

        return adminRepository.save(admin);
    }

    @Transactional
    public Admin updateAdmin(Long adminId, String name, Admin.AdminRole role, Admin.AdminStatus status) {
        Admin admin = getAdminById(adminId);
        if (name != null) admin.setName(name);
        if (role != null) admin.setRole(role);
        if (status != null) admin.setStatus(status);
        return adminRepository.save(admin);
    }

    @Transactional
    public Admin updateAdminPassword(Long adminId, String newPassword) {
        Admin admin = getAdminById(adminId);
        admin.setPassword(passwordEncoder.encode(newPassword));
        return adminRepository.save(admin);
    }

    @Transactional
    public void deleteAdmin(Long adminId) {
        Admin admin = getAdminById(adminId);
        adminRepository.delete(admin);
    }
}



