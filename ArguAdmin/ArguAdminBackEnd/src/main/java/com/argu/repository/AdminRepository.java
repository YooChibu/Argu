package com.argu.repository;

import com.argu.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 관리자 계정에 대한 JPA 리포지토리.
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    /**
     * 관리자 아이디로 계정을 조회한다.
     *
     * @param adminId 관리자 로그인 아이디
     * @return 관리자 Optional
     */
    Optional<Admin> findByAdminId(String adminId);

    /**
     * 동일한 관리자 아이디가 존재하는지 확인한다.
     *
     * @param adminId 관리자 로그인 아이디
     * @return 존재 여부
     */
    boolean existsByAdminId(String adminId);
}



