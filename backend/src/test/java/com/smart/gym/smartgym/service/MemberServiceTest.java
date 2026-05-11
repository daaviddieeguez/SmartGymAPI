package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.MemberResponseDTO;
import com.smart.gym.smartgym.mapper.MemberMapper;
import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.repository.ActivityRepository;
import com.smart.gym.smartgym.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private ActivityRepository activityRepository;

    @Mock
    private MemberMapper memberMapper;

    @InjectMocks
    private MemberService memberService;

    @Test
    void shouldThrowExceptionWhenMemberIsNotPremiumAndRegisterInPremiumActivity() {
        Long activityId = 1L;
        Long memberId = 1L;

        Member fakeMember = new Member();
        fakeMember.setId(memberId);
        fakeMember.setDni("12345678Z");
        fakeMember.setPremium(false);
        fakeMember.setActivities(new HashSet<>());

        Activity fakeActivity = new Activity();
        fakeActivity.setId(activityId);
        fakeActivity.setPremium(true);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(fakeMember));
        when(activityRepository.findById(activityId)).thenReturn(Optional.of(fakeActivity));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> memberService.insertMemberActivity(fakeMember.getId(), fakeActivity.getId()));

        assertEquals("Standard members cannot enroll in premium activities. Please upgrade your membership.", exception.getMessage());
    }

    @Test
    void shouldRegisterPremiumMemberInPremiumActivity() {
        Long activityId = 1L;
        Long memberId = 1L;

        Member fakeMember = new Member();
        fakeMember.setId(memberId);
        fakeMember.setDni("12345678Z");
        fakeMember.setPremium(true);
        fakeMember.setActivities(new HashSet<>());

        Activity fakeActivity = new Activity();
        fakeActivity.setId(activityId);
        fakeActivity.setPremium(true);

        MemberResponseDTO fakeDTO = new MemberResponseDTO();

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(fakeMember));
        when(activityRepository.findById(activityId)).thenReturn(Optional.of(fakeActivity));
        when(memberRepository.save(any(Member.class))).thenReturn(fakeMember);
        when(memberMapper.toDTO(fakeMember)).thenReturn(fakeDTO);

        MemberResponseDTO result = memberService.insertMemberActivity(memberId, activityId);

        assertNotNull(result);
        assertEquals(fakeDTO, result);

        assertTrue(fakeMember.getActivities().contains(fakeActivity));

        verify(memberRepository, times(1)).save(fakeMember);
    }

    @Test
    void shouldThrowExceptionWhenDniLetterIsWrong() {
        Member fakeMember = new Member();

        fakeMember.setId(1L);

    }

    @Test
    void shouldThrowExceptionWhenMemberDoesNotExist() {
        Long nonExistentId = 1L;
        Long activityId = 1L;

        when(memberRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> memberService.insertMemberActivity(nonExistentId, activityId));

        assertEquals("No member found with ID: " + nonExistentId, exception.getMessage());

        verify(activityRepository, never()).findById(anyLong());
    }
}
