package org.galactic.flowhood.domain.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DashboardResDTO {
    private LastWeekUsedRequestRes lastWeekUsedRequestRes;
    private CurrentWeekUsedRequestRes currentWeekUsedRequestRes;
    private LastWeekActiveRequestRes lastWeekActiveRequestRes;
    private CurrentWeekActiveRequestRes currentWeekActiveRequestRes;
    private TodayByForm todayByForm;
    private List<TopReason> topReasonsForAnonymousRequests;
    private List<TopHouse> topHousesForUsedRequests;
    private List<TopHour> topRequestHours;
}
