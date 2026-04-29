package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.dto.ActivityRequestDTO;
import com.smart.gym.smartgym.dto.ActivityResponseDTO;
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
    public List<ActivityResponseDTO> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/premium")
    public List<ActivityResponseDTO> getPremiumActivities() {
        return activityService.getActivitiesByPremium(true);
    }

    @GetMapping("/normal")
    public List<ActivityResponseDTO> getNormalActivities() {
        return activityService.getActivitiesByPremium(false);
    }

    @PostMapping
    public ResponseEntity<ActivityResponseDTO> createActivity(@Valid @RequestBody ActivityRequestDTO activity) {
        ActivityResponseDTO savedActivity = activityService.saveActivity(activity);
        return new ResponseEntity<>(savedActivity, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
