package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.MonitorRequestDTO;
import com.smart.gym.smartgym.dto.MonitorResponseDTO;
import com.smart.gym.smartgym.mapper.MonitorMapper;
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
    private final MonitorMapper monitorMapper;

    public List<MonitorResponseDTO> getAllMonitors() {
        List<Monitor> monitors = monitorRepository.findAll();

        return monitorMapper.toDTOList(monitors);
    }

    public MonitorResponseDTO getMonitorByDni(String dni) {
        Monitor monitor = monitorRepository.findMonitorByDni(dni).orElseThrow(() -> new IllegalArgumentException("No monitor found with DNI: " + dni));

        return monitorMapper.toDTO(monitor);
    }

    public List<MonitorResponseDTO> getMonitorsByName(String name) {
        List<Monitor> monitors = monitorRepository.findMonitorByName(name);

        return monitorMapper.toDTOList(monitors);
    }

    @Transactional
    public void deleteMonitor(String dni) {
        monitorRepository.deleteMonitorByDni(dni);
    }

    public MonitorResponseDTO saveMonitor(MonitorRequestDTO monitor) {
        Monitor newMonitor = monitorMapper.toEntity(monitor);

        newMonitor.setSalary(1200.0);

        Monitor savedMonitor = monitorRepository.save(newMonitor);

        return monitorMapper.toDTO(savedMonitor);
    }
}
