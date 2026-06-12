package com.smart.gym.smartgym.repository;

import com.smart.gym.smartgym.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);

    @Query(value = """
      select token from Token token inner join User user on token.user.id = user.id
      where user.id = :userId and (token.expired = false or token.revoked = false)
      """)
    List<Token> findAllValidTokensByUser(Long userId);
}
