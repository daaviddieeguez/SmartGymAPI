package com.smart.gym.smartgym.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class PersonResponseDTO {
    private String dni;
    private String name;
    private String locality;
}
