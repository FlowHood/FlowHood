package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.HouseReqDTO;
import org.galactic.flowhood.domain.dto.request.RequestStateReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    final
    RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping("/")
    public ResponseEntity<GeneralResponse> findAllRequest(){
        try{

            List<Request> requests = requestService.findAllRequests();
            return GeneralResponse.builder().status(HttpStatus.OK).data(requests).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findRequestById(@PathVariable("_id") String id){
        try{
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();
            return GeneralResponse.builder().status(HttpStatus.OK).data(request).message("found").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //TODO: think here
    @PostMapping("/")
    public ResponseEntity<GeneralResponse> createRequest(@RequestBody HouseReqDTO req){
        //validate if role is vigilant or responsible then request must be automatically approved else it should be pending
        try{
            return GeneralResponse.builder().status(HttpStatus.OK).message("role created").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @DeleteMapping("/{_id}")
    public ResponseEntity<GeneralResponse> deleteRequest(@PathVariable("_id") String id){
        try{
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();
            requestService.deleteRequest(request);
            return GeneralResponse.builder().status(HttpStatus.OK).message("deleted!").getResponse();

        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
    @PatchMapping("/{_id}") //getting user validation and status of current request
    public ResponseEntity<GeneralResponse> changeStatus(@PathVariable("_id") String id, @RequestBody RequestStateReqDTO req){
        try{
            UUID _id = UUID.fromString(id);
            Request request = requestService.findRequestById(_id);
            if (request == null)
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("not found").getResponse();

            request.setStatus(req.getStatus());
            return GeneralResponse.builder().status(HttpStatus.OK).message("status updated").getResponse();
        }
        catch (Exception e){
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
