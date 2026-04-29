package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.dto.MonitorRequestDTO;
import com.smart.gym.smartgym.dto.MonitorResponseDTO;
import com.smart.gym.smartgym.service.MonitorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monitors")
@RequiredArgsConstructor
public class MonitorController {

    private final MonitorService monitorService;

    @GetMapping
    public List<MonitorResponseDTO> getAllMonitors() {
        return monitorService.getAllMonitors();
    }

    @GetMapping("/{dni}")
    public MonitorResponseDTO getMonitorByDni(@PathVariable String dni) {
        return monitorService.getMonitorByDni(dni);
    }

    @GetMapping("/name/{name}")
    public List<MonitorResponseDTO> getMonitorByName(@PathVariable String name) {
        return monitorService.getMonitorsByName(name);
    }

    @PostMapping
    public ResponseEntity<MonitorResponseDTO> createMonitor(@Valid @RequestBody MonitorRequestDTO requestDTO) {
        MonitorResponseDTO saveMonitor = monitorService.saveMonitor(requestDTO);
        return new ResponseEntity<>(saveMonitor, HttpStatus.CREATED);
    }

    @PostMapping("/{dni}/activities/{activityId}")
    public ResponseEntity<MonitorResponseDTO> insertMonitorActivity(@PathVariable String dni, @PathVariable Long activityId) {
        MonitorResponseDTO savedActivity = monitorService.insertMonitorActivity(dni, activityId);
        return new ResponseEntity<>(savedActivity, HttpStatus.OK);
    }

    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> deleteMonitor(@PathVariable String dni) {
        monitorService.deleteMonitor(dni);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{dni}/activities/{activityId}")
    public ResponseEntity<MonitorResponseDTO> removeMonitorActivity(@PathVariable String dni, @PathVariable Long activityId) {
        MonitorResponseDTO updatedMonitor = monitorService.removeMonitorActivity(dni, activityId);
        return new ResponseEntity<>(updatedMonitor, HttpStatus.OK);
    }
}
