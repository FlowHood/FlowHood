package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.QR;

import java.util.UUID;

public interface QrService {
    void generateQRCode(QR qr);
    QR getQRById(UUID id);
    void refreshQR(UUID id);

    void changeQRStatus(UUID id, String status);
}
