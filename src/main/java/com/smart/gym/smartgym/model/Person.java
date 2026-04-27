package com.smart.gym.smartgym.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "The DNI is required")
    @Pattern(regexp = "^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$", message = "The DNI format is incorrect")
    @Column(unique = true, nullable = false)
    private String dni;

    @NotBlank(message = "The name is required")
    @Size(min = 3, max = 50, message = "The name has to contain between 3 and 50 characters")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "The birthdate is required")
    @Column(nullable = false)
    private LocalDate birthdate;

    @NotBlank(message = "The address is required")
    @Column(nullable = false)
    private String address;

    @NotBlank(message = "The locality is required")
    @Column(nullable = false)
    private String locality;

    @NotBlank(message = "The province is required")
    @Column(nullable = false)
    private String province;

    @NotBlank(message = "The post code is required")
    @Pattern(regexp = "^[0-9]{5}$", message = "The post code must be 5 digits")
    @Column(nullable = false)
    private String postCode;

    @NotBlank(message = "The phone number is required")
    @Pattern(regexp = "^[0-9]{9}$", message = "The phone number must be 9 digits")
    @Column(nullable = false)
    private String phoneNumber;

}
