package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.ReadQrReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.services.*;
import org.galactic.flowhood.utils.EncryptUtil;
import org.galactic.flowhood.utils.SystemRoles;
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

    final HouseService houseService;

    final MessageService messageService;

    public QRController(QrService qrService, RequestService requestService, UserService userService, EncryptUtil encryptUtil, HouseService houseService, HouseService houseService1, MessageService messageService) {
        this.qrService = qrService;
        this.requestService = requestService;
        this.userService = userService;
        this.encryptUtil = encryptUtil;
        this.houseService = houseService1;
        this.messageService = messageService;
    }

    @PostMapping(value = {"/request/{_houseId}", "/request-qr/{_requestId}"})
    public ResponseEntity<GeneralResponse> refreshQR(@PathVariable(value = "_requestId", required = false) String requestId, @PathVariable(value = "_houseId", required = false) String houseId){
        try {
            User user = userService.findUserAuthenticated().toEntity();
            Request request;

            if (requestId == null && houseId != null &&
                    (userService.hasUserRole(user, SystemRoles.ADMINISTRATOR.getRole()) ||
                            userService.hasUserRole(user, SystemRoles.RESIDENT.getRole()) ||
                            userService.hasUserRole(user, SystemRoles.RESPONSIBLE.getRole()))) {

                Date current = Date.from(Instant.now());
                String time = current.getHours() + ":" + current.getMinutes();

                House house = houseService.getHouseById(UUID.fromString(houseId));
                if (house == null) {
                    return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("House not found").getResponse();
                }

                Request newRequest = new Request(
                        current,
                        current,
                        time,
                        time,
                        SystemStates.ACTIVE.getState(),
                        user,
                        user,
                        house
                );
                request = requestService.createRequest(newRequest);
            } else {
                assert requestId != null;
                request = requestService.findRequestById(UUID.fromString(requestId));
            }
            if (request == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("Request not found").getResponse();
            }

            if (qrService.validateTimePeriod(request)) {
                return GeneralResponse.builder().message("QR not able to be read").status(HttpStatus.BAD_REQUEST).getResponse();
            }

            if (!requestService.isUserFromRequest(user, request)) {
                return GeneralResponse.builder().status(HttpStatus.FORBIDDEN).message("User not allowed").getResponse();
            }

            if(!request.getStatus().equals(SystemStates.ACTIVE.getState())){
                return GeneralResponse.builder().status(HttpStatus.BAD_REQUEST).message("Request is not active").getResponse();
            }

            QR qr = qrService.findByRequest(request);
            if (qr == null) {
                QR newQr = new QR(request);
                qr = qrService.generateQRCode(newQr);
                request.setQr(qr);
                requestService.save(request);
            } else qr = qrService.refreshQRByRequest(request);

            String data = qr.getId() + "/" + qr.getRequest().getId() + "/" + qr.getLastUpdate() + "/" + user.getId();
            return GeneralResponse.builder().data(encryptUtil.encrypt(data)).status(HttpStatus.OK).message("QR generated").getResponse();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

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
            if(user == null || !userService.hasUserRole(user, SystemRoles.VIGILANT.getRole())) return GeneralResponse.builder().status(HttpStatus.UNAUTHORIZED).message("User not found").getResponse();

            User visitor = userService.findUserById(UUID.fromString(parts[3]));
            if (visitor == null) {
                return GeneralResponse.builder().status(HttpStatus.NOT_FOUND).message("Visitor not found").getResponse();
            }

            if (!requestService.isUserFromRequest(visitor, request)) {
                return GeneralResponse.builder().status(HttpStatus.FORBIDDEN).message("User not allowed").getResponse();
            }
            //todo
            System.out.println(request.getStartDate());
            if (qrService.validateTimePeriod(request)) {
                return GeneralResponse.builder().message("QR not able to be read").status(HttpStatus.BAD_REQUEST).getResponse();
            }

            requestService.changeRequestStatus(request, SystemStates.USED.getState());
            qrService.changeQRStatus(qr, SystemStates.USED.getState());

            //sent message to mqtt server
            messageService.publish("read/qr", "1", 1, true);


            return GeneralResponse.builder().data(true).status(HttpStatus.OK).message("Able to enter").getResponse();

        } catch (Exception e) {
            System.out.println(e.getMessage());
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

