package com.smart.gym.smartgym.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
}