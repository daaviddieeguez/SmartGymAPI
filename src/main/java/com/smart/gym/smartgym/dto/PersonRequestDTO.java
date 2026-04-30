package com.smart.gym.smartgym.dto;

import com.smart.gym.smartgym.validation.ValidSpanishDni;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public abstract class PersonRequestDTO {

    @NotBlank(message = "The DNI is required")
    @Pattern(regexp = "^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$", message = "The DNI format is incorrect")
    @ValidSpanishDni
    private String dni;

    @NotBlank(message = "The name is required")
    @Size(min = 3, max = 50, message = "The name has to contain between 3 and 50 characters")
    private String name;

    @NotNull(message = "The birthdate is required")
    private LocalDate birthdate;

    @NotBlank(message = "The address is required")
    private String address;

    @NotBlank(message = "The locality is required")
    private String locality;

    @NotBlank(message = "The province is required")
    private String province;

    @NotBlank(message = "The post code is required")
    @Pattern(regexp = "^[0-9]{5}$", message = "The post code must be 5 digits")
    private String postCode;

    @NotBlank(message = "The phone number is required")
    @Pattern(regexp = "^[0-9]{9}$", message = "The phone number must be 9 digits")
    private String phoneNumber;
}
