package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.RequestRepository;
import org.galactic.flowhood.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
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
