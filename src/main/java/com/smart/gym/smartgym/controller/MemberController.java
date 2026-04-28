package com.smart.gym.smartgym.controller;

import com.smart.gym.smartgym.model.Member;
import com.smart.gym.smartgym.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
