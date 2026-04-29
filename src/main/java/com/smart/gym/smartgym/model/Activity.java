package com.smart.gym.smartgym.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "activity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private int calories;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Specialty category;

    @Column(name = "is_premium", nullable = false)
    private boolean premium;

    @ElementCollection
    @CollectionTable(name = "activity_votes", joinColumns = @JoinColumn(name = "activity_id"))
    @Column(name = "vote")
    private List<Integer> votes;
}
