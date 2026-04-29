package com.smart.gym.smartgym.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotBlank(message = "The name is required")
    @Size(min = 3, max = 50, message = "The name has to contain between 3 and 50 characters")
    @Column(nullable = false)
    private String name;

    @Min(value = 1, message = "The duration must be at least 1 minute")
    @Column(nullable = false)
    private int duration;

    @Min(value = 0, message = "Calories cannot be negative")
    @Column(nullable = false)
    private int calories;

    @NotNull(message = "The category is required")
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
