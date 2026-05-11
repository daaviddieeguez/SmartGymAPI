package com.smart.gym.smartgym.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRequestDTO extends PersonRequestDTO {
    @NotNull(message = "The premium status is required")
    private Boolean premium;

    @NotNull(message = "The active status is required")
    private Boolean active;
}
