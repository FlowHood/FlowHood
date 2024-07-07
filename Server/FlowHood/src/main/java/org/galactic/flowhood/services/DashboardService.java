package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.dto.response.LastWeekUsedRequestRes;
import org.galactic.flowhood.domain.dto.response.TodayByForm;

public interface DashboardService {

    LastWeekUsedRequestRes getLasWeekUsedRequest();

    TodayByForm getTodayByFormRequest();

}
