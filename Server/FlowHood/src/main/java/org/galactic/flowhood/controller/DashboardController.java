package org.galactic.flowhood.controller;

import org.galactic.flowhood.domain.dto.response.DashboardResDTO;
import org.galactic.flowhood.domain.dto.response.GeneralResponse;
import org.galactic.flowhood.services.DashboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/")
    public ResponseEntity<GeneralResponse> getAnalysis() {
        try {
            DashboardResDTO dashboardResDTO = dashboardService.getCompleteAnalysis();
            return GeneralResponse.builder().status(HttpStatus.OK).data(dashboardResDTO).message("found").getResponse();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return GeneralResponse.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).getResponse();
        }
    }
}
