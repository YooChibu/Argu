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

@Service
@RequiredArgsConstructor
public class AdminStatisticsService {
    private final UserRepository userRepository;
    private final ArguRepository arguRepository;

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



