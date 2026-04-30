package com.smart.gym.smartgym.dto;

import com.smart.gym.smartgym.model.Specialty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ActivityRequestDTO {

    @NotBlank(message = "The name is required")
    @Size(min = 3, max = 50, message = "The name has to contain between 3 and 50 characters")
    private String name;

    @Min(value = 1, message = "The duration must be at least 1 minute")
    private int duration;

    @Min(value = 0, message = "Calories cannot be negative")
    private int calories;

    @NotNull(message = "The category is required")
    private Specialty category;

    private boolean premium;
}
