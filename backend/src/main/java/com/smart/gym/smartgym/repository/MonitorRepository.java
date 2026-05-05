package com.smart.gym.smartgym.repository;

import com.smart.gym.smartgym.model.Monitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonitorRepository extends JpaRepository<Monitor, Long> {
    Optional<Monitor> findMonitorByDni(String dni);

    List<Monitor> findMonitorByName(String name);

    void deleteMonitorByDni(String dni);
}
