package com.smart.gym.smartgym.dto;

import com.smart.gym.smartgym.model.Specialty;
import lombok.Data;

@Data
public class ActivityResponseDTO {
    private String name;
    private int duration;
    private int calories;
    private Specialty category;
    private boolean premium;
}
