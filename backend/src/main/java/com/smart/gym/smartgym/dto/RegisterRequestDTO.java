package com.smart.gym.smartgym.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String dni;
    private String name;
    private LocalDate birthdate;
    private String address;
    private String locality;
    private String province;
    private String postCode;
    private String phoneNumber;
}