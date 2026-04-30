package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.mapper.ActivityMapper;
import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.repository.ActivityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ActivityServiceTest {

    @Mock
    private ActivityRepository activityRepository;

    @Mock
    private ActivityMapper activityMapper;

    @InjectMocks
    private ActivityService activityService;

    @Test
    void shouldThrowExceptionWhenScoreIsTooHigh() {
        Long activityId = 1L;
        int badScore = 6;

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> activityService.addVote(activityId, badScore));

        assertEquals("Vote score must be between 1 and 5", exception.getMessage());
    }

    @Test
    void shouldAddVoteSuccessfully() {
        Long activityId = 1L;
        int goodScore = 3;

        Activity fakeActivity = new Activity();
        fakeActivity.setId(activityId);
        fakeActivity.setVotes(new ArrayList<>());

        ActivityResponseDTO fakeDTO = new ActivityResponseDTO();

        when(activityRepository.findById(activityId)).thenReturn(Optional.of(fakeActivity));

        when(activityRepository.save(any(Activity.class))).thenReturn(fakeActivity);

        when(activityMapper.toDTO(fakeActivity)).thenReturn(fakeDTO);

        ActivityResponseDTO result = activityService.addVote(activityId, goodScore);

        assertNotNull(result);

        assertTrue(fakeActivity.getVotes().contains(goodScore));

        verify(activityRepository, times(1)).save(fakeActivity);
    }
}