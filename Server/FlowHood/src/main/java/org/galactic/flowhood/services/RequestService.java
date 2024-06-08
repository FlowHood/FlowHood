package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.Request;

import java.util.List;
import java.util.UUID;

public interface RequestService {

    void createRequest(Request request);

    void deleteRequestById(UUID id);

    Request findRequestById(UUID id);

    List<Request> findAllRequests();

    List<Request> findAllRequestsByUserIdAndState(UUID userId, String state);

}
