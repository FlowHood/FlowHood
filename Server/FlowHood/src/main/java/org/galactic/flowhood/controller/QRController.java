package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.request.HouseReqDTO;
import org.galactic.flowhood.domain.dto.request.QRReqDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
public class QRController {
    @GetMapping("/{_id}")
    public ResponseEntity<GeneralResponse> findQRById(@PathVariable("_id") String id) {
        try {
            return GeneralResponse.builder().status(HttpStatus.OK).message("found").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @PostMapping("/")
    public ResponseEntity<GeneralResponse> generateQRCode(@RequestBody QRReqDTO req) {
        try {
            return GeneralResponse.builder().status(HttpStatus.OK).message("QR created").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }

    @PatchMapping("/status/{_id}")
    public ResponseEntity<GeneralResponse> updateQRStatus(@PathVariable("_id") String id) {
        try {
            return GeneralResponse.builder().status(HttpStatus.OK).message("QR created").getResponse();

        } catch (Exception e) {
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}

