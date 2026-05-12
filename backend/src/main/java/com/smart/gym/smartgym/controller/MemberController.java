package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.dto.ActivityResponseDTO;
import com.smart.gym.smartgym.dto.MemberRequestDTO;
import com.smart.gym.smartgym.dto.MemberResponseDTO;
import com.smart.gym.smartgym.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<Page<MemberResponseDTO>> getAllMembers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Page<MemberResponseDTO> members = memberService.getAllMembers(page, size);
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

   @GetMapping("/{id}")
   public ResponseEntity<MemberResponseDTO> getMemberById(@PathVariable Long id) {
        return new ResponseEntity<>(memberService.getMemberById(id), HttpStatus.OK);
   }

    @GetMapping("/dni/{dni}")
    public MemberResponseDTO getMemberByDni(@PathVariable String dni) {
        return memberService.getMemberByDni(dni);
    }

    @GetMapping("/{id}/activities")
    public ResponseEntity<Set<ActivityResponseDTO>> getMemberActivities(@PathVariable Long id) {
        Set<ActivityResponseDTO> activities = memberService.getMemberActivities(id);
        return new ResponseEntity<>(activities, HttpStatus.OK);
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

    @PostMapping("/{id}/activities/{activityId}")
    public ResponseEntity<MemberResponseDTO> insertMemberActivity(@PathVariable Long id, @PathVariable Long activityId) {
        MemberResponseDTO savedActivity = memberService.insertMemberActivity(id, activityId);
        return new ResponseEntity<>(savedActivity, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberResponseDTO> updateMember(
            @PathVariable Long id,
            @Valid @RequestBody MemberRequestDTO request) {
        MemberResponseDTO updatedMember = memberService.updateMember(id, request);
        return ResponseEntity.ok(updatedMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/activities/{activityId}")
    public ResponseEntity<MemberResponseDTO> removeMemberActivity(@PathVariable Long id, @PathVariable Long activityId) {
        MemberResponseDTO updatedMember = memberService.removeMemberActivity(id, activityId);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }
}
