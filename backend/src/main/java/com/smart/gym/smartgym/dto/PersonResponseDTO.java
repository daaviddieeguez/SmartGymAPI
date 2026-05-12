package com.smart.gym.smartgym.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public abstract class PersonResponseDTO {
    private Long id;
    private String dni;
    private String name;
    private LocalDate birthdate;
    private String address;
    private String locality;
    private String province;
    private String postCode;
    private String phoneNumber;
}
