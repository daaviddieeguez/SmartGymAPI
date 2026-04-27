package com.smart.gym.smartgym.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "monitor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Monitor extends Person {

    @Column(nullable = false)
    private Double salary;
}