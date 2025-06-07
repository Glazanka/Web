package com.example.Web_Project.repos;

import com.example.Web_Project.models.Todo;
import com.example.Web_Project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user);
    List<Todo> findByUserId(Long userId);
}