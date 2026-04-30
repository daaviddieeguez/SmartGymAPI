package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.ActivityRequestDTO;
import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.mapper.ActivityMapper;
import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityMapper activityMapper;

    public Page<ActivityResponseDTO> getAllActivities(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Activity> activityPage = activityRepository.findAll(pageable);

        return activityPage.map(activityMapper::toDTO);
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

    public ActivityResponseDTO addVote(Long id, int score) {
        if (score < 1 || score > 5) {
            throw new IllegalArgumentException("Vote score must be between 1 and 5");
        }

        Activity activity = activityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No activity found with ID: " + id));

        activity.getVotes().add(score);

        Activity savedActivity = activityRepository.save(activity);

        return activityMapper.toDTO(savedActivity);
    }

    @Transactional
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
