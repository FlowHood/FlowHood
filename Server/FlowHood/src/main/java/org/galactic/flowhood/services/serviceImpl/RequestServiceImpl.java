package org.galactic.flowhood.services.serviceImpl;

import lombok.extern.slf4j.Slf4j;
import org.galactic.flowhood.domain.dto.request.RequestReqDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.RequestRepository;
import org.galactic.flowhood.services.QrService;
import org.galactic.flowhood.services.RequestService;
import org.galactic.flowhood.utils.SystemRoles;
import org.galactic.flowhood.utils.SystemStates;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Slf4j
public class RequestServiceImpl implements RequestService {

    final
    RequestRepository requestRepository;

    final QrService qrService;

    public RequestServiceImpl(RequestRepository requestRepository, QrService qrService) {
        this.requestRepository = requestRepository;
        this.qrService = qrService;
    }

    @Override
    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    @Override
    public void save(Request request) {
        requestRepository.save(request);
    }

    @Override
    public Request createRequestHandler(RequestReqDTO req, House house, User resident, User visitor, String residentRol) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        Date endDate = null;
        Date startDate = dateFormat.parse(req.getStartDate());
        if (req.getEndDate() != null) {
            endDate = dateFormat.parse(req.getEndDate());
        }
        //creating normal request
        Request newRequest = new Request(
                startDate,
                startDate,
                req.getStartTime(),
                req.getStartTime(),
                resident,
                visitor,
                house
        );

        //validating for periodic request
        if (endDate != null) {
            newRequest.setEndDate(endDate);
        }
        if (req.getEndTime() != null) {
            newRequest.setEndTime(req.getEndTime());
        }

        if (Objects.equals(residentRol, SystemRoles.RESPONSIBLE.getRole()) || Objects.equals(residentRol, SystemRoles.ADMINISTRATOR.getRole())) {
            newRequest.setStatus(SystemStates.ACTIVE.getState());
        }

        Request response = requestRepository.save(newRequest);
        if (Objects.equals(residentRol, SystemRoles.RESPONSIBLE.getRole()) || Objects.equals(residentRol, SystemRoles.ADMINISTRATOR.getRole())) {
            QR newQR = new QR(response);
            newQR.setStatus(SystemStates.ACTIVE.getState());
            qrService.generateQRCode(newQR);
            response.setQr(newQR);
            requestRepository.save(response);
        }
        return response;
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

    @Override
    public boolean isUserFromRequest(User user, Request request) {
        return request.getResident().getId().equals(user.getId()) || request.getVisitor().getId().equals(user.getId()) || request.getHouse().getResponsible().getId().equals(user.getId());
    }
}
