package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.dto.*;
import com.smart.gym.smartgym.service.MonitorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/monitors")
@RequiredArgsConstructor
public class MonitorController {

    private final MonitorService monitorService;

    @GetMapping
    public ResponseEntity<Page<MonitorResponseDTO>> getAllMonitors(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<MonitorResponseDTO> monitors = monitorService.getAllMonitors(page, size);
        return new ResponseEntity<>(monitors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public MonitorResponseDTO getMonitorById(@PathVariable Long id) {
        return monitorService.getMonitorById(id);
    }

    @GetMapping("/dni/{dni}")
    public MonitorResponseDTO getMonitorByDni(@PathVariable String dni) {
        return monitorService.getMonitorByDni(dni);
    }

    @GetMapping("/{id}/activities")
    public ResponseEntity<Set<ActivityResponseDTO>> getMonitorActivities(@PathVariable Long id) {
        Set<ActivityResponseDTO> activities = monitorService.getMonitorActivities(id);
        return new ResponseEntity<>(activities, HttpStatus.OK);
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

    @PostMapping("/{id}/activities/{activityId}")
    public ResponseEntity<MonitorResponseDTO> insertMonitorActivity(@PathVariable Long id, @PathVariable Long activityId) {
        MonitorResponseDTO savedActivity = monitorService.insertMonitorActivity(id, activityId);
        return new ResponseEntity<>(savedActivity, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MonitorResponseDTO> updateMonitor(
            @PathVariable Long id,
            @Valid @RequestBody MonitorRequestDTO request) {

        MonitorResponseDTO updatedMonitor = monitorService.updateMonitor(id, request);
        return ResponseEntity.ok(updatedMonitor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonitor(@PathVariable Long id) {
        monitorService.deleteMonitor(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/activities/{activityId}")
    public ResponseEntity<MonitorResponseDTO> removeMonitorActivity(@PathVariable Long id, @PathVariable Long activityId) {
        MonitorResponseDTO updatedMonitor = monitorService.removeMonitorActivity(id, activityId);
        return new ResponseEntity<>(updatedMonitor, HttpStatus.OK);
    }
}
