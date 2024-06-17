package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.repository.QrRepository;
import org.galactic.flowhood.services.QrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {

    final
    QrRepository qrRepository;

    public QrServiceImpl(QrRepository qrRepository) {
        this.qrRepository = qrRepository;
    }

    @Override
    public QR generateQRCode(QR qr) {
        return qrRepository.save(qr);
    }

    @Override
    public QR getQRById(UUID id) {
        return qrRepository.findById(id).orElse(null);
    }

    @Override
    public void refreshQR(QR qr) {
        qr.setLastUpdate(Date.from(Instant.now()));
        qrRepository.save(qr);
    }

    @Override
    public void changeQRStatus(QR qr, String status) {
        qr.setStatus(status);
        qrRepository.save(qr);
    }
}
