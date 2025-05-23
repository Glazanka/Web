package com.example.notesincloud.model.repository;

import com.example.notesincloud.model.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}
