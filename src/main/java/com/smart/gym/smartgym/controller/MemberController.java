package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.service.GymService;
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

    private final GymService gymService;

    @GetMapping
    public List<Member> getAllMembers() {
        return gymService.getMembers();
    }

    @GetMapping("/{dni}")
    public Member getMemberByDni(@PathVariable String dni) {
        return gymService.getMemberByDni(dni);
    }

    @GetMapping("/active")
    public List<Member> getActiveMembers() {
        return gymService.getActiveMembers(true);
    }

    @GetMapping("/inactive")
    public List<Member> getInactiveMembers() {
        return gymService.getActiveMembers(false);
    }

    @PostMapping
    public ResponseEntity<?> createMember(@Valid @RequestBody Member member) {
        Member savedMember = gymService.saveMember(member);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> deleteMember(@PathVariable String dni) {
        gymService.deleteMember(dni);
        return ResponseEntity.noContent().build();
    }
}
