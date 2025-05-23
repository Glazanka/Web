package com.example.notesincloud.service;

import com.example.notesincloud.model.entity.Note;
import com.example.notesincloud.model.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> getById(Long id) {
        return noteRepository.findById(id);
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(Note note) {
        Optional<Note> existingNote = noteRepository.findById(note.getId());
        if(existingNote.isPresent()) {
            Note note1 = existingNote.get();
            note1.setTitle(note.getTitle());
            note1.setDescription(note.getDescription());
            note1.setUserId(note.getUserId());
            note1.setCreationDate(note.getCreationDate());
            note1.setNotificationDate(note.getNotificationDate());
            note1.setTodoListId(note.getTodoListId());
            return noteRepository.save(note1);
        }
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}