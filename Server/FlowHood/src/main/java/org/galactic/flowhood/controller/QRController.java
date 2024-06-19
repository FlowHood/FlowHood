package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.HouseReqDTO;
import org.galactic.flowhood.domain.dto.request.QRReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.services.QrService;
import org.galactic.flowhood.services.RequestService;
import org.galactic.flowhood.utils.SystemStates;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin
public class QRController {

    final QrService qrService;
    final RequestService requestService;

    public QRController(QrService qrService, RequestService requestService) {
        this.qrService = qrService;
        this.requestService = requestService;
    }

    //all authenticated users
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findQRById(@PathVariable("_id") String id) {
        try {
            QR qr = qrService.getQRById(UUID.fromString(id));
            if(qr == null){
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("QR not found").getResponse();
            }
            return GeneralResponse.builder().data(qr).status(HttpStatus.OK).message("found").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //admin only
    @PatchMapping("/status/{_id}")
    public ResponseEntity<GeneralResponse> updateQRStatus(@PathVariable("_id") String id , @RequestBody String status) {
        try {
            QR qr = qrService.getQRById(UUID.fromString(id));
            if(qr == null){
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("QR not found").getResponse();
            }
            if(!SystemStates.isValidState(status)) {
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("Invalid status").getResponse();
            }

            qrService.changeQRStatus(qr, status);
            return GeneralResponse.builder().status(HttpStatus.OK).message("QR status updated").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}

