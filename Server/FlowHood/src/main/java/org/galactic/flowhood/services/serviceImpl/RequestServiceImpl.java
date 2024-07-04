package org.galactic.flowhood.services.serviceImpl;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.galactic.flowhood.domain.dto.request.RequestReqDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.RequestRepository;
import org.galactic.flowhood.services.QrService;
import org.galactic.flowhood.services.RequestService;
import org.galactic.flowhood.utils.SystemRoles;
import org.galactic.flowhood.utils.SystemStates;
import org.springframework.scheduling.annotation.Async;
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
    @Async
    @Transactional
    public void createRequestHandler(RequestReqDTO req, House house, User resident, User visitor, String residentRol) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
        List<Request> requests = new ArrayList<>();
        //Iterate over the days between the start and end date
        for(String date : req.getDates()) {
            //creating normal request
            Request newRequest = new Request(
                    dateFormat.parse(date),
                    dateFormat.parse(date),
                    req.getStartTime(),
                    req.getStartTime(),
                    resident,
                    visitor,
                    house
            );

            if (req.getEndTime() != null) {
                newRequest.setEndTime(req.getEndTime());
            }

            if (Objects.equals(residentRol, SystemRoles.RESPONSIBLE.getRole()) || Objects.equals(residentRol, SystemRoles.ADMINISTRATOR.getRole())) {
                newRequest.setStatus(SystemStates.ACTIVE.getState());
            }
            requests.add(newRequest);
        }
        requestRepository.saveAll(requests);
//
//        List<QR> qrs = new ArrayList<>();
//        for (Request _req : requestsSaved) {
//            QR newQr = new QR(_req);
//            newQr.setStatus(SystemStates.ACTIVE.getState());
//            qrs.add(newQr);
//        }
//        List<QR> qrSaved = qrService.generateManyQRCode(qrs);
//
//        requestsSaved.forEach(request -> {
//            request.setQr(qrSaved.stream().filter(qr -> qr.getRequest().getId().equals(request.getId())).findFirst().orElse(null));
//            requestRepository.save(request);
//        });

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

    @Override
    public List<Request> findRequestsByHouse(House house) {
        return requestRepository.findAllByHouse(house);
    }

    @Override
    public List<Request> findAllRequestsByHouses(List<House> houses) {
        return requestRepository.findAllByHouseIn(houses);
    }

    @Override
    public List<Request> findRequestsByVisitor(User visitor) {
        return requestRepository.findAllByVisitor(visitor);
    }

    @Override
    public List<Request> findRequestsByHouseOrAdminHouses(House house, List<House> admHouses) {
        return requestRepository.findAllByHouseOrHouseIn(house, admHouses);
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

    @Override
    public void changeRequestStatus(Request request, String state) {
        request.setStatus(state);
        requestRepository.save(request);
    }
}
