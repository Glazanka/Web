package com.example.Web_Project.repos;


import com.example.Web_Project.models.Note;
import com.example.Web_Project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUser(User user);
    List<Note> findByUserId(Long userId);
}