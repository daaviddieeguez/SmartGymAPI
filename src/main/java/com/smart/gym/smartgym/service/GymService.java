package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GymService {
    private final MemberRepository memberRepository;

    public void saveMember(Member member){
        memberRepository.save(member);
    }

    public List<Member> getMembers() {
        return memberRepository.findAllByActivities();
    }
}
