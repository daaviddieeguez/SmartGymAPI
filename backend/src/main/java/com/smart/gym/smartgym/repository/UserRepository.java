package com.smart.gym.smartgym.repository;

import com.smart.gym.smartgym.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
