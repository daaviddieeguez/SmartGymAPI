package com.smart.gym.smartgym.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends Person {

    @Column(nullable = false)
    private LocalDate registrationDate;

    @Column(nullable = false)
    private LocalDate lastAccessDate;

    @Column(name = "is_active", nullable = false)
    private boolean active;

    @Column(nullable = false)
    private double fee;

    @ManyToMany
    @JoinTable(
            name = "member_activities",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    protected Set<Activity> activities = new HashSet<>();

    @Column(name = "is_premium", nullable = false)
    private boolean premium;
}
