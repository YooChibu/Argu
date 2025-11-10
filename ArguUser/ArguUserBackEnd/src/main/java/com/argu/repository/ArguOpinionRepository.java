package com.argu.repository;

import com.argu.entity.Argu;
import com.argu.entity.ArguOpinion;
import com.argu.entity.ArguOpinion.OpinionSide;
import com.argu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArguOpinionRepository extends JpaRepository<ArguOpinion, Long> {
    Optional<ArguOpinion> findByArguAndUser(Argu argu, User user);
    boolean existsByArguAndUser(Argu argu, User user);
    List<ArguOpinion> findByArgu(Argu argu);
    List<ArguOpinion> findByArguAndSide(Argu argu, OpinionSide side);
    long countByArguAndSide(Argu argu, OpinionSide side);
    List<ArguOpinion> findByUser(User user);
}


