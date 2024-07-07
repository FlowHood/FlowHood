package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.dto.response.*;
import org.galactic.flowhood.repository.RequestRepository;
import org.galactic.flowhood.services.DashboardService;
import org.galactic.flowhood.utils.SystemStates;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Service
public class DashboardServiceImpl implements DashboardService {

    final RequestRepository requestRepository;

    public DashboardServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public LastWeekUsedRequestRes getLasWeekUsedRequest() {
        return getLastWeekUsedRequest(SystemStates.USED.getState());
    }

    @Override
    public TodayByForm getTodayByFormRequest() {
        int requestByAnonymous = requestRepository.countAllAnonymous(SystemStates.USED.getState());
        int requestByNormal = requestRepository.countAllNormal(SystemStates.USED.getState());
        return new TodayByForm(requestByNormal, requestByAnonymous);
    }

    @Override
    public CurrentWeekUsedRequestRes getCurrentWeekUsedRequest() {
        return getCurrentWeekUsedRequest(SystemStates.USED.getState());
    }

    @Override
    public LastWeekActiveRequestRes getLastWeekActiveRequest() {
        return getLastWeekActiveRequest(SystemStates.ACTIVE.getState());
    }

    @Override
    public CurrentWeekActiveRequestRes getCurrentWeekActiveRequest() {
        return getCurrentWeekActiveRequest(SystemStates.ACTIVE.getState());
    }

    @Override
    public List<TopReason> getTopReasonsForAnonymousRequests() {
        List<Object[]> results = requestRepository.findTopReasonsForAnonymousRequests();
        List<TopReason> topReasons = new ArrayList<>();
        for (Object[] result : results) {
            topReasons.add(new TopReason((String) result[0], ((Long) result[1]).intValue()));
        }
        return topReasons;
    }

    @Override
    public List<TopHouse> getTopHousesForUsedRequests() {
        List<Object[]> results = requestRepository.findTopHousesForUsedRequests(SystemStates.USED.getState());
        List<TopHouse> topHouses = new ArrayList<>();
        for (Object[] result : results) {
            topHouses.add(new TopHouse((String) result[0], ((Long) result[1]).intValue()));
        }
        return topHouses;
    }

    @Override
    public List<TopHour> getTopRequestHours() {
        List<Object[]> results = requestRepository.findTopRequestHours();
        List<TopHour> topHours = new ArrayList<>();
        for (Object[] result : results) {
            topHours.add(new TopHour((String) result[0], ((Long) result[1]).intValue()));
        }
        return topHours;
    }

    @Override
    public DashboardResDTO getCompleteAnalysis() {
        DashboardResDTO dashboardResDTO = new DashboardResDTO();

        // last week used request
        LastWeekUsedRequestRes lastWeekUsedRequestRes = getLasWeekUsedRequest();
        dashboardResDTO.setLastWeekUsedRequestRes(lastWeekUsedRequestRes);

        // current week used request
        CurrentWeekUsedRequestRes currentWeekUsedRequestRes = getCurrentWeekUsedRequest();
        dashboardResDTO.setCurrentWeekUsedRequestRes(currentWeekUsedRequestRes);

        // last week active request
        LastWeekActiveRequestRes lastWeekActiveRequestRes = getLastWeekActiveRequest();
        dashboardResDTO.setLastWeekActiveRequestRes(lastWeekActiveRequestRes);

        // current week active request
        CurrentWeekActiveRequestRes currentWeekActiveRequestRes = getCurrentWeekActiveRequest();
        dashboardResDTO.setCurrentWeekActiveRequestRes(currentWeekActiveRequestRes);

        // by form
        TodayByForm todayByForm = getTodayByFormRequest();
        dashboardResDTO.setTodayByForm(todayByForm);

        // top reasons for anonymous requests
        List<TopReason> topReasonsForAnonymousRequests = getTopReasonsForAnonymousRequests();
        dashboardResDTO.setTopReasonsForAnonymousRequests(topReasonsForAnonymousRequests);

        // top houses for used requests
        List<TopHouse> topHousesForUsedRequests = getTopHousesForUsedRequests();
        dashboardResDTO.setTopHousesForUsedRequests(topHousesForUsedRequests);

        // top request hours
        List<TopHour> topRequestHours = getTopRequestHours();
        dashboardResDTO.setTopRequestHours(topRequestHours);

        return dashboardResDTO;
    }

    private LastWeekUsedRequestRes getLastWeekUsedRequest(String state) {
        LastWeekUsedRequestRes lastWeekUsedRequestRes = new LastWeekUsedRequestRes();

        ZoneId z = TimeZone.getDefault().toZoneId();
        LocalDate today = LocalDate.now(z);

        for (DayOfWeek day : DayOfWeek.values()) {
            LocalDateTime dayStart = today.with(TemporalAdjusters.previous(day)).atStartOfDay();
            LocalDateTime dayEnd = dayStart.with(LocalTime.MAX);

            Date startDate = Date.from(dayStart.atZone(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(dayEnd.atZone(ZoneId.systemDefault()).toInstant());

            int requestCount = requestRepository.countAllByStatusAndStartDateBetween(state, startDate, endDate);

            switch (day) {
                case MONDAY:
                    lastWeekUsedRequestRes.setMonday(requestCount);
                    break;
                case TUESDAY:
                    lastWeekUsedRequestRes.setTuesday(requestCount);
                    break;
                case WEDNESDAY:
                    lastWeekUsedRequestRes.setWednesday(requestCount);
                    break;
                case THURSDAY:
                    lastWeekUsedRequestRes.setThursday(requestCount);
                    break;
                case FRIDAY:
                    lastWeekUsedRequestRes.setFriday(requestCount);
                    break;
                case SATURDAY:
                    lastWeekUsedRequestRes.setSaturday(requestCount);
                    break;
                case SUNDAY:
                    lastWeekUsedRequestRes.setSunday(requestCount);
                    break;
            }
        }

        return lastWeekUsedRequestRes;
    }

    private CurrentWeekUsedRequestRes getCurrentWeekUsedRequest(String state) {
        CurrentWeekUsedRequestRes currentWeekUsedRequestRes = new CurrentWeekUsedRequestRes();

        ZoneId z = TimeZone.getDefault().toZoneId();
        LocalDate today = LocalDate.now(z);

        for (DayOfWeek day : DayOfWeek.values()) {
            LocalDateTime dayStart = today.with(TemporalAdjusters.previousOrSame(day)).atStartOfDay();
            LocalDateTime dayEnd = dayStart.with(LocalTime.MAX);

            Date startDate = Date.from(dayStart.atZone(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(dayEnd.atZone(ZoneId.systemDefault()).toInstant());

            int requestCount = requestRepository.countAllByStatusAndStartDateBetween(state, startDate, endDate);

            switch (day) {
                case MONDAY:
                    currentWeekUsedRequestRes.setMonday(requestCount);
                    break;
                case TUESDAY:
                    currentWeekUsedRequestRes.setTuesday(requestCount);
                    break;
                case WEDNESDAY:
                    currentWeekUsedRequestRes.setWednesday(requestCount);
                    break;
                case THURSDAY:
                    currentWeekUsedRequestRes.setThursday(requestCount);
                    break;
                case FRIDAY:
                    currentWeekUsedRequestRes.setFriday(requestCount);
                    break;
                case SATURDAY:
                    currentWeekUsedRequestRes.setSaturday(requestCount);
                    break;
                case SUNDAY:
                    currentWeekUsedRequestRes.setSunday(requestCount);
                    break;
            }
        }

        return currentWeekUsedRequestRes;
    }

    private LastWeekActiveRequestRes getLastWeekActiveRequest(String state) {
        LastWeekActiveRequestRes lastWeekActiveRequestRes = new LastWeekActiveRequestRes();

        ZoneId z = TimeZone.getDefault().toZoneId();
        LocalDate today = LocalDate.now(z);

        for (DayOfWeek day : DayOfWeek.values()) {
            LocalDateTime dayStart = today.with(TemporalAdjusters.previous(day)).atStartOfDay();
            LocalDateTime dayEnd = dayStart.with(LocalTime.MAX);

            Date startDate = Date.from(dayStart.atZone(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(dayEnd.atZone(ZoneId.systemDefault()).toInstant());

            int requestCount = requestRepository.countAllByStatusAndStartDateBetween(state, startDate, endDate);

            switch (day) {
                case MONDAY:
                    lastWeekActiveRequestRes.setMonday(requestCount);
                    break;
                case TUESDAY:
                    lastWeekActiveRequestRes.setTuesday(requestCount);
                    break;
                case WEDNESDAY:
                    lastWeekActiveRequestRes.setWednesday(requestCount);
                    break;
                case THURSDAY:
                    lastWeekActiveRequestRes.setThursday(requestCount);
                    break;
                case FRIDAY:
                    lastWeekActiveRequestRes.setFriday(requestCount);
                    break;
                case SATURDAY:
                    lastWeekActiveRequestRes.setSaturday(requestCount);
                    break;
                case SUNDAY:
                    lastWeekActiveRequestRes.setSunday(requestCount);
                    break;
            }
        }

        return lastWeekActiveRequestRes;
    }

    private CurrentWeekActiveRequestRes getCurrentWeekActiveRequest(String state) {
        CurrentWeekActiveRequestRes currentWeekActiveRequestRes = new CurrentWeekActiveRequestRes();

        ZoneId z = TimeZone.getDefault().toZoneId();
        LocalDate today = LocalDate.now(z);

        for (DayOfWeek day : DayOfWeek.values()) {
            LocalDateTime dayStart = today.with(TemporalAdjusters.previousOrSame(day)).atStartOfDay();
            LocalDateTime dayEnd = dayStart.with(LocalTime.MAX);

            Date startDate = Date.from(dayStart.atZone(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(dayEnd.atZone(ZoneId.systemDefault()).toInstant());

            int requestCount = requestRepository.countAllByStatusAndStartDateBetween(state, startDate, endDate);

            switch (day) {
                case MONDAY:
                    currentWeekActiveRequestRes.setMonday(requestCount);
                    break;
                case TUESDAY:
                    currentWeekActiveRequestRes.setTuesday(requestCount);
                    break;
                case WEDNESDAY:
                    currentWeekActiveRequestRes.setWednesday(requestCount);
                    break;
                case THURSDAY:
                    currentWeekActiveRequestRes.setThursday(requestCount);
                    break;
                case FRIDAY:
                    currentWeekActiveRequestRes.setFriday(requestCount);
                    break;
                case SATURDAY:
                    currentWeekActiveRequestRes.setSaturday(requestCount);
                    break;
                case SUNDAY:
                    currentWeekActiveRequestRes.setSunday(requestCount);
                    break;
            }
        }

        return currentWeekActiveRequestRes;
    }
}
