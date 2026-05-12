package com.smart.gym.smartgym.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "activity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("is_archived = false")
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

    @ManyToMany(mappedBy = "activities")
    private Set<Monitor> monitors = new HashSet<>();

    @Column(name = "is_archived", nullable = false)
    private boolean archived = false;
}
