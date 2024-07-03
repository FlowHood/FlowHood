package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.entities.QR;

import java.util.List;
import java.util.UUID;

public interface QrService {
    QR generateQRCode(QR qr);

    List<QR> generateManyQRCode(List<QR> qrList);

    QR getQRById(UUID id);
    void refreshQR(QR qr);

    void changeQRStatus(QR qr, String status);
}
