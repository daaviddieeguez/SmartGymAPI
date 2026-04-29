package com.smart.gym.smartgym.dto;

import lombok.Data;

@Data
public class MemberResponseDTO {
    private String dni;
    private String name;
    private String locality;
    private boolean active;
    private boolean premium;
}
