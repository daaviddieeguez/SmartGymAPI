package com.smart.gym.smartgym.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonitorRequestDTO extends PersonRequestDTO {
    @NotNull(message = "The salary is required")
    @Positive(message = "The salary must be greater than 0")
    private Double salary;
}
