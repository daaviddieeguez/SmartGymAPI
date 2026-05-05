package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.dto.ActivityRequestDTO;
import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Page<ActivityResponseDTO>> getAllActivities(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<ActivityResponseDTO> activities = activityService.getAllActivities(page, size);
        return new ResponseEntity<>(activities, HttpStatus.OK);
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

    @PostMapping("/{id}/votes/{score}")
    public ResponseEntity<ActivityResponseDTO> voteForActivity(@PathVariable Long id, @PathVariable int score) {
        ActivityResponseDTO updatedActivity = activityService.addVote(id, score);
        return new ResponseEntity<>(updatedActivity, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}
