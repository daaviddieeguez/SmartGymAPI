package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.repository.ActivityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public List<Activity> getActivitiesByPremium(boolean isPremium) {
        return activityRepository.findActivityByPremium(isPremium);
    }

    public Activity saveActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    @Transactional
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}
