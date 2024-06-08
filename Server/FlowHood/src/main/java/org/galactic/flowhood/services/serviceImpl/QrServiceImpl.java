package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.services.QrService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {
    @Override
    public void generateQRCode(QR qr) {

    }

    @Override
    public QR getQRById(UUID id) {
        return null;
    }

    @Override
    public void refreshQR(UUID id) {

    }

    @Override
    public void changeQRStatus(UUID id, String status) {

    }
}
