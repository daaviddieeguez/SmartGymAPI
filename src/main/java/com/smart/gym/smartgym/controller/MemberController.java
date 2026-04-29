package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.dto.MemberRequestDTO;
import com.smart.gym.smartgym.dto.MemberResponseDTO;
import com.smart.gym.smartgym.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public List<MemberResponseDTO> getAllMembers() {
        return memberService.getMembers();
    }

    @GetMapping("/{dni}")
    public MemberResponseDTO getMemberByDni(@PathVariable String dni) {
        return memberService.getMemberByDni(dni);
    }

    @GetMapping("/active")
    public List<MemberResponseDTO> getActiveMembers() {
        return memberService.getActiveMembers(true);
    }

    @GetMapping("/inactive")
    public List<MemberResponseDTO> getInactiveMembers() {
        return memberService.getActiveMembers(false);
    }

    @PostMapping
    public ResponseEntity<MemberResponseDTO> createMember(@Valid @RequestBody MemberRequestDTO requestDTO) {
        MemberResponseDTO savedMember = memberService.saveMember(requestDTO);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @PostMapping("/{dni}/activities/{activityId}")
    public ResponseEntity<MemberResponseDTO> insertMemberActivity(@PathVariable String dni, @PathVariable Long activityId) {
        MemberResponseDTO savedActivity = memberService.insertMemberActivity(dni, activityId);
        return new ResponseEntity<>(savedActivity, HttpStatus.OK);
    }

    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> deleteMember(@PathVariable String dni) {
        memberService.deleteMember(dni);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{dni}/activities/{activityId}")
    public ResponseEntity<MemberResponseDTO> removeMemberActivity(@PathVariable String dni, @PathVariable Long activityId) {
        MemberResponseDTO updatedMember = memberService.removeMemberActivity(dni, activityId);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }
}
