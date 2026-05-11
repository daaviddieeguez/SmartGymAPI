package com.smart.gym.smartgym.repository;

import com.smart.gym.smartgym.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findMemberByDni(String dni);

    List<Member> findMemberByActive(boolean active);
}
