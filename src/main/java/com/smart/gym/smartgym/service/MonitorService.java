package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.model.Monitor;
import com.smart.gym.smartgym.repository.MonitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitorService {

    private final MonitorRepository monitorRepository;

    public List<Monitor> getAllMonitors() {
        return monitorRepository.findAll();
    }

    public Monitor getMonitorByDni(String dni) {
        return monitorRepository.findMonitorByDni(dni).orElseThrow(() -> new IllegalArgumentException("No monitor found with DNI: " + dni));
    }

    public List<Monitor> getMonitorsByName(String name) {
        return monitorRepository.findMonitorByName(name);
    }

    @Transactional
    public void deleteMonitor(String dni) {
        monitorRepository.deleteMonitorByDni(dni);
    }

    public Monitor saveMonitor(Monitor monitor) {
        return monitorRepository.save(monitor);
    }
}
