package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.dto.response.LastWeekUsedRequestRes;
import org.galactic.flowhood.repository.RequestRepository;
import org.galactic.flowhood.services.DashboardService;
import org.galactic.flowhood.utils.SystemStates;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.TimeZone;

@Service
public class DashboardServiceImpl implements DashboardService {

    final RequestRepository requestRepository;

    public DashboardServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public LastWeekUsedRequestRes getLasWeekUsedRequest() {
        LastWeekUsedRequestRes lastWeekUsedRequestRes = new LastWeekUsedRequestRes();
        String usedState = SystemStates.USED.getState();

        ZoneId z = TimeZone.getDefault().toZoneId();
        LocalDate today = LocalDate.now( z );

        //monday
        LocalDateTime previousMondayStart = today.with(TemporalAdjusters.previous(DayOfWeek.MONDAY)).atTime(0,0,0);
        LocalDateTime previousMondayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.MONDAY)).atTime(23,59,59);
        Date MondayStart = Date.from(previousMondayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date MondayEnd = Date.from(previousMondayEnd.atZone(ZoneId.systemDefault()).toInstant());

        //tuesday
        LocalDateTime previousTuesdayStart = today.with(TemporalAdjusters.previous(DayOfWeek.TUESDAY)).atTime(0,0,0);
        LocalDateTime previousTuesdayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.TUESDAY)).atTime(23,59,59);
        Date TuesdayStart = Date.from(previousTuesdayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date TuesdayEnd = Date.from(previousTuesdayEnd.atZone(ZoneId.systemDefault()).toInstant());

        //wednesday
        LocalDateTime previousWednesdayStart = today.with(TemporalAdjusters.previous(DayOfWeek.WEDNESDAY)).atTime(0,0,0);
        LocalDateTime previousWednesdayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.WEDNESDAY)).atTime(23,59,59);
        Date WednesdayStart = Date.from(previousWednesdayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date WednesdayEnd = Date.from(previousWednesdayEnd.atZone(ZoneId.systemDefault()).toInstant());

        //Thursday
        LocalDateTime previousThursdayStart = today.with(TemporalAdjusters.previous(DayOfWeek.THURSDAY)).atTime(0,0,0);
        LocalDateTime previousThursdayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.THURSDAY)).atTime(23,59,59);
        Date ThursdayStart = Date.from(previousThursdayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date ThursdayEnd = Date.from(previousThursdayEnd.atZone(ZoneId.systemDefault()).toInstant());

        //Friday
        LocalDateTime previousFridayStart = today.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY)).atTime(0,0,0);
        LocalDateTime previousFridayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.FRIDAY)).atTime(23,59,59);
        Date FridayStart = Date.from(previousFridayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date FridayEnd = Date.from(previousFridayEnd.atZone(ZoneId.systemDefault()).toInstant());

        //Saturday
        LocalDateTime previousSaturdayStart = today.with(TemporalAdjusters.previous(DayOfWeek.SATURDAY)).atTime(0,0,0);
        LocalDateTime previousSaturdayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.SATURDAY)).atTime(23,59,59);
        Date SaturdayStart = Date.from(previousSaturdayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date SaturdayEnd = Date.from(previousSaturdayEnd.atZone(ZoneId.systemDefault()).toInstant());

        //Sunday
        LocalDateTime previousSundayStart = today.with(TemporalAdjusters.previous(DayOfWeek.SUNDAY)).atTime(0,0,0);
        LocalDateTime previousSundayEnd = today.with(TemporalAdjusters.previous(DayOfWeek.SUNDAY)).atTime(23,59,59);
        Date SundayStart = Date.from(previousSundayStart.atZone(ZoneId.systemDefault()).toInstant());
        Date SundayEnd = Date.from(previousSundayEnd.atZone(ZoneId.systemDefault()).toInstant());

        lastWeekUsedRequestRes.setMonday(requestRepository.countAllByStatusAndStartDateBetween(usedState, MondayStart, MondayEnd));
        lastWeekUsedRequestRes.setTuesday(requestRepository.countAllByStatusAndStartDateBetween(usedState, TuesdayStart, TuesdayEnd));
        lastWeekUsedRequestRes.setWednesday(requestRepository.countAllByStatusAndStartDateBetween(usedState, WednesdayStart, WednesdayEnd));
        lastWeekUsedRequestRes.setThursday(requestRepository.countAllByStatusAndStartDateBetween(usedState, ThursdayStart, ThursdayEnd));
        lastWeekUsedRequestRes.setFriday(requestRepository.countAllByStatusAndStartDateBetween(usedState, FridayStart, FridayEnd));
        lastWeekUsedRequestRes.setSaturday(requestRepository.countAllByStatusAndStartDateBetween(usedState, SaturdayStart, SaturdayEnd));
        lastWeekUsedRequestRes.setSunday(requestRepository.countAllByStatusAndStartDateBetween(usedState, SundayStart, SundayEnd));

        return lastWeekUsedRequestRes;
    }
}
