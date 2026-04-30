package com.smart.gym.smartgym.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberResponseDTO extends PersonResponseDTO {
    private boolean active;
    private boolean premium;
}
