package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.ActivityRequestDTO;
import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.mapper.ActivityMapper;
import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityMapper activityMapper;

    public List<ActivityResponseDTO> getAllActivities() {
        List<Activity> activities = activityRepository.findAll();

        return activityMapper.toDTOList(activities);
    }

    public List<ActivityResponseDTO> getActivitiesByPremium(boolean isPremium) {
        List<Activity> activities = activityRepository.findActivityByPremium(isPremium);

        return activityMapper.toDTOList(activities);
    }

    public ActivityResponseDTO saveActivity(ActivityRequestDTO activity) {
        Activity newActivity = activityMapper.toEntity(activity);

        newActivity.setVotes(new ArrayList<>());

        Activity savedActivity = activityRepository.save(newActivity);

        return activityMapper.toDTO(savedActivity);
    }

    @Transactional
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
