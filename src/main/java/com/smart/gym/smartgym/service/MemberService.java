package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.dto.MemberRequestDTO;
import com.smart.gym.smartgym.dto.MemberResponseDTO;
import com.smart.gym.smartgym.mapper.ActivityMapper;
import com.smart.gym.smartgym.mapper.MemberMapper;
import com.smart.gym.smartgym.model.Activity;
import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.repository.ActivityRepository;
import com.smart.gym.smartgym.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final ActivityRepository activityRepository;
    private final MemberMapper memberMapper;
    private final ActivityMapper activityMapper;

    public MemberResponseDTO saveMember(MemberRequestDTO requestDTO){
        Member newMember = memberMapper.toEntity(requestDTO);

        newMember.setActive(true);
        newMember.setPremium(false);
        newMember.setFee(30.0);
        newMember.setRegistrationDate(LocalDate.now());
        newMember.setLastAccessDate(LocalDate.now());

        Member savedMember = memberRepository.save(newMember);

        return memberMapper.toDTO(savedMember);
    }

    public Set<ActivityResponseDTO> getMemberActivities(String dni) {
        Member member = memberRepository.findMemberByDni(dni)
                .orElseThrow(() -> new IllegalArgumentException("No member found with DNI: " + dni));

        return member.getActivities().stream().map(activityMapper::toDTO).collect(Collectors.toSet());
    }

    public Page<MemberResponseDTO> getAllMembers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Member> memberPage = memberRepository.findAll(pageable);

        return memberPage.map(memberMapper::toDTO);
    }

    public List<MemberResponseDTO> getActiveMembers(boolean isActive) {
        List<Member> members = memberRepository.findMemberByActive(isActive);

        return memberMapper.toDTOList(members);
    }

    @Transactional
    public void deleteMember(String dni) {
        memberRepository.deleteMemberByDni(dni);
    }


    public MemberResponseDTO getMemberByDni(String dni) {
        Member member = memberRepository.findMemberByDni(dni).orElseThrow(() -> new IllegalArgumentException("No member found with DNI: " + dni));

        return memberMapper.toDTO(member);
    }

    public MemberResponseDTO insertMemberActivity(String dni, Long idActivity) {
        Member member = memberRepository.findMemberByDni(dni).orElseThrow(() -> new IllegalArgumentException("No member found with DNI: " + dni));

        Activity activity = activityRepository.findById(idActivity).orElseThrow(() -> new IllegalArgumentException("No activity found with ID: " + idActivity));

        if(activity.isPremium() && !member.isPremium()){
            throw new IllegalArgumentException("Standard members cannot enroll in premium activities. Please upgrade your membership.");
        }

        member.getActivities().add(activity);

        Member savedMember = memberRepository.save(member);

        return memberMapper.toDTO(savedMember);
    }

    public MemberResponseDTO removeMemberActivity(String dni, Long idActivity) {
        Member member = memberRepository.findMemberByDni(dni).orElseThrow(() -> new IllegalArgumentException("No member found with DNI: " + dni));

        Activity activity = activityRepository.findById(idActivity).orElseThrow(() -> new IllegalArgumentException("No activity found with ID: " + idActivity));

        member.getActivities().remove(activity);

        Member savedMember = memberRepository.save(member);

        return memberMapper.toDTO(savedMember);
    }
}
