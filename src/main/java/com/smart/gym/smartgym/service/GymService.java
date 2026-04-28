package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GymService {
    private final MemberRepository memberRepository;

    public Member saveMember(Member member){
        return memberRepository.save(member);
    }

    public List<Member> getMembers() {
        return memberRepository.findAllByActivities();
    }

    public List<Member> getActiveMembers(boolean isActive) {
        return memberRepository.findMemberByIsActive(isActive);
    }

    @Transactional
    public void deleteMember(String dni) {
        memberRepository.deleteMemberByDni(dni);
    }

    public Member getMemberByDni(String dni) {
        return memberRepository.findMemberByDni(dni).orElseThrow(() -> new IllegalArgumentException("No member found with DNI: " + dni));
    }
}
