package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/premium")
    public List<Activity> getPremiumActivities() {
        return activityService.getActivitiesByPremium(true);
    }

    @GetMapping("/normal")
    public List<Activity> getNormalActivities() {
        return activityService.getActivitiesByPremium(false);
    }

    @PostMapping
    public ResponseEntity<?> createActivity(@Valid @RequestBody Activity activity) {
        Activity savedActivity = activityService.saveActivity(activity);
        return new ResponseEntity<>(savedActivity, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
