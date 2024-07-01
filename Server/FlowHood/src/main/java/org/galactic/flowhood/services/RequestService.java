package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.dto.request.RequestReqDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

public interface RequestService {

    Request createRequest(Request request);

    Request createRequestHandler(RequestReqDTO req, House house, User resident, User visitor, String residentRol) throws ParseException;

    void deleteRequest(Request request);

    Request findRequestById(UUID id);

    List<Request> findAllRequests();

    List<Request> findAllByUserAndState(User user, String state);

}
