package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.dto.MemberRequestDTO;
import com.smart.gym.smartgym.dto.MemberResponseDTO;
import com.smart.gym.smartgym.mapper.MemberMapper;
import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

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

    public List<MemberResponseDTO> getMembers() {
        List<Member> members = memberRepository.findAllByActivities();
        return memberMapper.toDTOList(members);
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
}
