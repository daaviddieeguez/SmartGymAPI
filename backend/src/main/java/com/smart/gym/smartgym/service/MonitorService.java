package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.*;
import com.smart.gym.smartgym.mapper.ActivityMapper;
import com.smart.gym.smartgym.mapper.MonitorMapper;
import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.model.Monitor;
import com.smart.gym.smartgym.repository.ActivityRepository;
import com.smart.gym.smartgym.repository.MonitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MonitorService {

    private final MonitorRepository monitorRepository;
    private final ActivityRepository activityRepository;
    private final MonitorMapper monitorMapper;
    private final ActivityMapper activityMapper;

    public Page<MonitorResponseDTO> getAllMonitors(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Monitor> monitorPage = monitorRepository.findAll(pageable);

        return monitorPage.map(monitorMapper::toDTO);
    }

    public Set<ActivityResponseDTO> getMonitorActivities(Long id) {
        Monitor monitor = monitorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No monitor found with ID: " + id));

        return monitor.getActivities().stream().map(activityMapper::toDTO).collect(Collectors.toSet());
    }

    public MonitorResponseDTO getMonitorById(long id) {
        Monitor monitor = monitorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No monitor found with ID: " + id));
        return monitorMapper.toDTO(monitor);
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
    public void deleteMonitor(Long id) {
        monitorRepository.deleteById(id);
    }

    public MonitorResponseDTO saveMonitor(MonitorRequestDTO monitor) {
        Monitor newMonitor = monitorMapper.toEntity(monitor);

        newMonitor.setSalary(1200.0);

        Monitor savedMonitor = monitorRepository.save(newMonitor);

        return monitorMapper.toDTO(savedMonitor);
    }

    public MonitorResponseDTO insertMonitorActivity(Long id, Long idActivity) {
        Monitor monitor = monitorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No monitor found with ID: " + id));

        Activity activity = activityRepository.findById(idActivity).orElseThrow(() -> new IllegalArgumentException("No activity found with ID: " + idActivity));

        monitor.getActivities().add(activity);

        Monitor savedMonitor = monitorRepository.save(monitor);

        return monitorMapper.toDTO(savedMonitor);
    }

    public MonitorResponseDTO removeMonitorActivity(Long id, Long idActivity) {
        Monitor monitor = monitorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No monitor found with ID: " + id));

        Activity activity = activityRepository.findById(idActivity).orElseThrow(() -> new IllegalArgumentException("No activity found with ID: " + idActivity));

        monitor.getActivities().remove(activity);

        Monitor savedMonitor = monitorRepository.save(monitor);

        return monitorMapper.toDTO(savedMonitor);
    }

    @Transactional
    public MonitorResponseDTO updateMonitor(Long id, MonitorRequestDTO request) {
        Monitor monitor = monitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Monitor not found with id: " + id));

        monitor.setName(request.getName());
        monitor.setBirthdate(request.getBirthdate());
        monitor.setAddress(request.getAddress());
        monitor.setLocality(request.getLocality());
        monitor.setProvince(request.getProvince());
        monitor.setPostCode(request.getPostCode());
        monitor.setPhoneNumber(request.getPhoneNumber());
        monitor.setSalary(request.getSalary());

        Monitor updatedMonitor = monitorRepository.save(monitor);

        return monitorMapper.toDTO(updatedMonitor);
    }
}
