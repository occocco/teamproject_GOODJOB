package com.goodjob.post.repository;

import com.goodjob.company.Company;
import com.goodjob.post.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>, QuerydslPredicateExecutor<Post> {

    // 10.7 기간 종료된 공고 개수 조회 by.OH
    Long countAllByPostEndDateBefore(Date Date);

    // 10.7 By.OH
    List<Post> findAllByPostIdBetweenOrderByPostIdDesc(Long starNum, Long endNum);

    Page<Post> findAllByPostComId(Company company, Pageable pageable );

    @Modifying
    @Query("update Post p set p.count = p.count + 1 where p.postId = :id")
    void increasePostCount(@Param("id") Long id);

}