package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.dto.response.*;

import java.util.List;

public interface DashboardService {

    LastWeekUsedRequestRes getLasWeekUsedRequest();

    TodayByForm getTodayByFormRequest();

    CurrentWeekUsedRequestRes getCurrentWeekUsedRequest();

    LastWeekActiveRequestRes getLastWeekActiveRequest();

    CurrentWeekActiveRequestRes getCurrentWeekActiveRequest();

    List<TopReason> getTopReasonsForAnonymousRequests();

    List<TopHouse> getTopHousesForUsedRequests();

    List<TopHour> getTopRequestHours();

    DashboardResDTO getCompleteAnalysis();
}
