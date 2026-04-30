package com.smart.gym.smartgym.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "monitor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Monitor extends Person {

    @Column(nullable = false)
    private Double salary;

    @ManyToMany
    @JoinTable(
            name = "monitor_activities",
            joinColumns = @JoinColumn(name = "monitor_id"),
            inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    private Set<Activity> activities = new HashSet<>();
}