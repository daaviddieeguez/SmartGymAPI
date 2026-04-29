package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.model.Member;
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
    public List<Member> getAllMembers() {
        return memberService.getMembers();
    }

    @GetMapping("/{dni}")
    public Member getMemberByDni(@PathVariable String dni) {
        return memberService.getMemberByDni(dni);
    }

    @GetMapping("/active")
    public List<Member> getActiveMembers() {
        return memberService.getActiveMembers(true);
    }

    @GetMapping("/inactive")
    public List<Member> getInactiveMembers() {
        return memberService.getActiveMembers(false);
    }

    @PostMapping
    public ResponseEntity<?> createMember(@Valid @RequestBody Member member) {
        Member savedMember = memberService.saveMember(member);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> deleteMember(@PathVariable String dni) {
        memberService.deleteMember(dni);
        return ResponseEntity.noContent().build();
    }
}
