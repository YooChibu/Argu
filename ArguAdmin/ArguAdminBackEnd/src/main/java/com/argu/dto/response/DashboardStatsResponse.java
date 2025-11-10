package com.argu.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private Long totalUsers;
    private Long totalArgus;
    private Long totalComments;
    private Long activeArgus;
    private Long pendingReports;
    private Long todayNewUsers;
    private Long todayNewArgus;
}



