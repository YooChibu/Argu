package com.argu.service;

import com.argu.entity.Argu;
import com.argu.entity.User;
import com.argu.repository.ArguRepository;
import com.argu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 관리자 통계 화면을 위한 집계 로직을 제공하는 서비스.
 * <p>
 * 현재 구현은 대부분 전체 데이터를 메모리에 로드해 필터링하므로 대량 데이터 환경에서는
 * 쿼리 최적화나 배치 집계가 필요하다.
 */
@Service
@RequiredArgsConstructor
public class AdminStatisticsService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;

    /**
     * 회원 현황 통계를 계산한다.
     *
     * @return 회원 수 통계를 담은 Map
     */
    public Map<String, Object> getUserStatistics() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.findAll().stream()
                .filter(user -> user.getStatus() == User.UserStatus.ACTIVE)
                .count();
        long suspendedUsers = userRepository.findAll().stream()
                .filter(user -> user.getStatus() == User.UserStatus.SUSPENDED)
                .count();
        long deletedUsers = userRepository.findAll().stream()
                .filter(user -> user.getStatus() == User.UserStatus.DELETED)
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("activeUsers", activeUsers);
        stats.put("suspendedUsers", suspendedUsers);
        stats.put("deletedUsers", deletedUsers);
        return stats;
    }

    /**
     * 논쟁 현황 통계를 계산한다.
     *
     * @return 논쟁 상태별/숨김 여부 통계를 담은 Map
     */
    public Map<String, Object> getArguStatistics() {
        long totalArgus = arguRepository.count();
        long scheduledArgus = arguRepository.countByStatus(Argu.ArguStatus.SCHEDULED);
        long activeArgus = arguRepository.countByStatus(Argu.ArguStatus.ACTIVE);
        long endedArgus = arguRepository.countByStatus(Argu.ArguStatus.ENDED);
        long hiddenArgus = arguRepository.findAll().stream()
                .filter(argu -> argu.getIsHidden())
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalArgus", totalArgus);
        stats.put("scheduledArgus", scheduledArgus);
        stats.put("activeArgus", activeArgus);
        stats.put("endedArgus", endedArgus);
        stats.put("hiddenArgus", hiddenArgus);
        return stats;
    }

    /**
     * 지정된 기간 동안의 일별 회원 가입 수를 계산한다.
     *
     * @param days 조회 기간(일)
     * @return 날짜 문자열을 키로 하는 가입 수 Map
     */
    public Map<String, Long> getDailyUserRegistrations(int days) {
        Map<String, Long> dailyStats = new HashMap<>();
        LocalDate today = LocalDate.now();
        
        for (int i = days - 1; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
            
            long count = userRepository.findAll().stream()
                    .filter(user -> user.getCreatedAt() != null &&
                            user.getCreatedAt().isAfter(startOfDay) &&
                            user.getCreatedAt().isBefore(endOfDay))
                    .count();
            
            dailyStats.put(date.toString(), count);
        }
        
        return dailyStats;
    }

    /**
     * 지정된 기간 동안의 일별 논쟁 생성 수를 계산한다.
     *
     * @param days 조회 기간(일)
     * @return 날짜 문자열을 키로 하는 논쟁 생성 수 Map
     */
    public Map<String, Long> getDailyArguCreations(int days) {
        Map<String, Long> dailyStats = new HashMap<>();
        LocalDate today = LocalDate.now();
        
        for (int i = days - 1; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();
            
            long count = arguRepository.findAll().stream()
                    .filter(argu -> argu.getCreatedAt() != null &&
                            argu.getCreatedAt().isAfter(startOfDay) &&
                            argu.getCreatedAt().isBefore(endOfDay))
                    .count();
            
            dailyStats.put(date.toString(), count);
        }
        
        return dailyStats;
    }
}



