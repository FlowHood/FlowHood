package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.ReadQrReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.QrService;
import org.galactic.flowhood.services.RequestService;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.EncryptUtil;
import org.galactic.flowhood.utils.SystemStates;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin
public class QRController {

    final QrService qrService;
    final RequestService requestService;

    final UserService userService;

    final EncryptUtil encryptUtil;

    @Value("${qr.readable}")
    private int qrReadTime;

    public QRController(QrService qrService, RequestService requestService, UserService userService, EncryptUtil encryptUtil) {
        this.qrService = qrService;
        this.requestService = requestService;
        this.userService = userService;
        this.encryptUtil = encryptUtil;
    }

    //TODO qr generate and update for petition when clicking
    @PostMapping("/refresh/{_requestId}")
    public ResponseEntity<GeneralResponse> refreshQR(@PathVariable("_requestId") String requestId) {
        try {
            Request request = requestService.findRequestById(UUID.fromString(requestId));
            if (request == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("Request not found").getResponse();
            }
            User user = userService.findUserAuthenticated().toEntity();
            if (!requestService.isUserFromRequest(user, request)) {
                return GeneralResponse.builder().status(HttpStatus.FORBIDDEN).message("User not allowed").getResponse();
            }

            QR qr = qrService.findByRequest(request);
            if (qr == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("QR not found").getResponse();
            }
            qr = qrService.refreshQRByRequest(request);

            String data = qr.getId() + "/" + qr.getRequest().getId() + "/" + qr.getLastUpdate();
            return GeneralResponse.builder().data(encryptUtil.encrypt(data)).status(HttpStatus.OK).message("QR generated").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //TODO read qr
    @PostMapping("/read")
    public ResponseEntity<GeneralResponse> readQR(@RequestBody ReadQrReqDTO readQrReqDTO) {
        try {
            String data = encryptUtil.decrypt(readQrReqDTO.getQrCode());
            String[] parts = data.split("/");
            QR qr = qrService.getQRById(UUID.fromString(parts[0]));
            if (qr == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("QR not found").getResponse();
            }
            if (qr.getStatus().equals(SystemStates.INACTIVE.getState()) || qr.getStatus().equals(SystemStates.USED.getState())) {
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("QR not able to be read").getResponse();
            }
            Request request = requestService.findRequestById(UUID.fromString(parts[1]));
            if (request == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("Request not found").getResponse();
            }
            if (!qr.getRequest().getId().equals(request.getId())) {
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("QR not valid").getResponse();
            }
            User user = userService.findUserAuthenticated().toEntity();
            if (!requestService.isUserFromRequest(user, request)) {
                return GeneralResponse.builder().status(HttpStatus.FORBIDDEN).message("User not allowed").getResponse();
            }

            //settings start date with time
            String[] startTime = request.getStartTime().split(":");
            Date startDate = request.getStartDate();
            startDate.setHours(Integer.parseInt(startTime[0]));
            startDate.setMinutes(Integer.parseInt(startTime[1]));

            String[] endTime = request.getStartTime().split(":");
            Date endDate = request.getEndDate();
            endDate.setHours(Integer.parseInt(endTime[0]));
            endDate.setMinutes(Integer.parseInt(endTime[1]));


            if (!Instant.now().isBefore(startDate.toInstant().minusMillis(qrReadTime)) || !Instant.now().isBefore(endDate.toInstant().plusMillis(qrReadTime))) {
                return GeneralResponse.builder().message("QR not able to be read").status(HttpStatus.BAD_REQUEST).getResponse();
            }

            return GeneralResponse.builder().data(true).status(HttpStatus.OK).message("Able to enter").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //all authenticated users
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findQRById(@PathVariable("_id") String id) {
        try {
            QR qr = qrService.getQRById(UUID.fromString(id));
            if (qr == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("QR not found").getResponse();
            }
            return GeneralResponse.builder().data(qr).status(HttpStatus.OK).message("found").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    //admin only
    @PatchMapping("/status/{_id}")
    public ResponseEntity<GeneralResponse> updateQRStatus(@PathVariable("_id") String id, @RequestBody String status) {
        try {
            QR qr = qrService.getQRById(UUID.fromString(id));
            if (qr == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("QR not found").getResponse();
            }
            if (!SystemStates.isValidState(status)) {
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("Invalid status").getResponse();
            }

            qrService.changeQRStatus(qr, status);
            return GeneralResponse.builder().status(HttpStatus.OK).message("QR status updated").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}

