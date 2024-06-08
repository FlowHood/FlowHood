package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.services.RequestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RequestServiceImpl implements RequestService {
    @Override
    public void createRequest(Request request) {

    }

    @Override
    public void deleteRequestById(UUID id) {

    }

    @Override
    public Request findRequestById(UUID id) {
        return null;
    }

    @Override
    public List<Request> findAllRequests() {
        return null;
    }

    @Override
    public List<Request> findAllRequestsByUserIdAndState(UUID userId, String state) {
        return null;
    }
}
