package org.galactic.flowhood.services.serviceImpl;

import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.domain.entities.QR;
import org.galactic.flowhood.domain.entities.Request;
import org.galactic.flowhood.repository.QrRepository;
import org.galactic.flowhood.services.QrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {

    @Value("${qr.refresh}")
    private String qrRefreshTime;

    @Value("${qr.readable}")
    private String qrReadTime;
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
    public List<QR> generateManyQRCode(List<QR> qrList) {
        return qrRepository.saveAll(qrList);
    }

    @Override
    public QR getQRById(UUID id) {
        return qrRepository.findById(id).orElse(null);
    }

    @Override
    public QR refreshQRByRequest(Request request) {
        QR qr = findByRequest(request);
        if (qr == null) {
            return null;
        }
        if (
                qr.getLastUpdate().toInstant().minusMillis(Long.parseLong(qrRefreshTime)).isBefore(Instant.now()) &&
                        qr.getLastUpdate().toInstant().plusMillis(Long.parseLong(qrRefreshTime)).isAfter(Instant.now())
        ) {
            qr.setLastUpdate(Date.from(Instant.now()));
        }
        return qrRepository.save(qr);
    }

    @Override
    public QR findByRequest(Request request) {
        return qrRepository.findByRequest(request).orElse(null);
    }

    @Override
    public boolean validateTimePeriod(Request request) {
        //settings start date with time
        String[] startTime = request.getStartTime().split(":");
        Date startDate = request.getStartDate();
        startDate.setHours(Integer.parseInt(startTime[0]));
        startDate.setMinutes(Integer.parseInt(startTime[1]));

        String[] endTime = request.getStartTime().split(":");
        Date endDate = request.getEndDate();
        endDate.setHours(Integer.parseInt(endTime[0]));
        endDate.setMinutes(Integer.parseInt(endTime[1]));

        Date actualDate = Date.from(Instant.now());
        System.out.println("1" + startDate);
        System.out.println("2" + endDate);
        System.out.println("3" + Instant.now());
        System.out.println("4" + startDate.toInstant().minusMillis(Long.parseLong(qrReadTime)));
        System.out.println("5" + endDate.toInstant().plusMillis(Long.parseLong(qrReadTime)));

        if (!Instant.now().isBefore(startDate.toInstant().minusMillis(Long.parseLong(qrReadTime))) || !Instant.now().isAfter(endDate.toInstant().plusMillis(Long.parseLong(qrReadTime)))) {
            return false;
        }
        return true;
    }

    @Override
    public void changeQRStatus(QR qr, String status) {
        qr.setStatus(status);
        qrRepository.save(qr);
    }
}
