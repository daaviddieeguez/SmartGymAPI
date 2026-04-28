package com.smart.gym.smartgym.repository;

import com.smart.gym.smartgym.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findActivityByIsPremium(boolean isPremium);
    
    void deleteActivityById(Long id);
}
