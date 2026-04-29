package com.smart.gym.smartgym.mapper;

import com.smart.gym.smartgym.dto.ActivityRequestDTO;
import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.model.Activity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ActivityMapper {
    ActivityResponseDTO toDTO(Activity activity);

    List<ActivityResponseDTO> toDTOList(List<Activity> activities);

    Activity toEntity(ActivityRequestDTO requestDTO);
}
