package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.QR;

import java.util.UUID;

public interface QrService {
    QR generateQRCode(QR qr);
    QR getQRById(UUID id);
    void refreshQR(QR qr);

    void changeQRStatus(QR qr, String status);
}
