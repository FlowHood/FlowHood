package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface RequestService {

    Request createRequest(Request request);

    void deleteRequest(Request request);

    Request findRequestById(UUID id);

    List<Request> findAllRequests();

    List<Request> findAllByUserAndState(User user, String state);

}
