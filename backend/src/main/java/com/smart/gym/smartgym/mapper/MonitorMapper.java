package com.smart.gym.smartgym.mapper;

import com.smart.gym.smartgym.dto.MonitorRequestDTO;
import com.smart.gym.smartgym.dto.MonitorResponseDTO;
import com.smart.gym.smartgym.model.Monitor;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MonitorMapper {
    MonitorResponseDTO toDTO(Monitor monitor);

    List<MonitorResponseDTO> toDTOList(List<Monitor> monitors);

    Monitor toEntity(MonitorRequestDTO requestDTO);
}
