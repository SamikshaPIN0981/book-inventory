package com.pinnacle.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pinnacle.login.service.DashboardService;
import com.pinnacle.login.userdto.DashboardData;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/api/dashboard")
    public DashboardData getDashboardData() {
        return dashboardService.getDashboardData();
    }
}