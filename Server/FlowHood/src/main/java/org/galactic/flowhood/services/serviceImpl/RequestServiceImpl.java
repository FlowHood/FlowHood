package org.galactic.flowhood.services.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.galactic.flowhood.domain.dto.request.RequestReqDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.RequestRepository;
import org.galactic.flowhood.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@Slf4j
public class RequestServiceImpl implements RequestService {

    final
    RequestRepository requestRepository;

    public RequestServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    @Override
    public Request createRequestHandler(RequestReqDTO req, House house, User resident, User visitor) {
        //TODO
        String patternDate = "yyyy-MM-dd";
        DateTimeFormatter format = DateTimeFormatter.ofPattern(patternDate, Locale.getDefault());
        LocalDateTime _startDate = LocalDateTime.parse(req.getStartDate(), format);
        ZoneId zoneId = ZoneId.of("America/Chicago");
        ZonedDateTime zonedStartDate = _startDate.atZone(zoneId);
        Date startDate = Date.from(zonedStartDate.toInstant());
        Date endDate = null;
        if (req.getEndDate() != null) {
            LocalDateTime _endDate = LocalDateTime.parse(req.getEndDate(), format);
            ZonedDateTime zonedEndDate = _endDate.atZone(zoneId);
            endDate = Date.from(zonedEndDate.toInstant());
        }
        System.out.println("startDate: " + startDate);
        log.error("endDate: " + endDate);

        return new Request();
    }


    @Override
    public void deleteRequest(Request request) {
        requestRepository.delete(request);
    }

    @Override
    public Request findRequestById(UUID id) {
        return requestRepository.findById(id).orElse(null);
    }

    @Override
    public List<Request> findAllRequests() {
        return requestRepository.findAll();
    }

    //TODO: update method to allow non state and state
    @Override
    public List<Request> findAllByUserAndState(User user, String state) {
        return requestRepository.findAllByStatusAndVisitorOrResident(state, user, user);
    }
}
