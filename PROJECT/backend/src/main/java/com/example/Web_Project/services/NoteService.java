package com.example.Web_Project.services;

import com.example.Web_Project.dtos.NoteDto;
import com.example.Web_Project.mappers.NoteMapper;
import com.example.Web_Project.models.Note;
import com.example.Web_Project.models.User;
import com.example.Web_Project.repos.NoteRepository;
import com.example.Web_Project.repos.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final NoteMapper noteMapper;

    public List<NoteDto> getAllNotes() {
        return noteRepository.findAll()
                .stream()
                .map(noteMapper::toDto)
                .collect(Collectors.toList());
    }

    public NoteDto getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        return noteMapper.toDto(note);
    }

    public NoteDto createNote(NoteDto noteDto) {
        User user = userRepository.findById(noteDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteMapper.toEntity(noteDto);
        note.setUser(user);

        Note saved = noteRepository.save(note);
        return noteMapper.toDto(saved);
    }

    public NoteDto updateNote(Long id, NoteDto noteDto) {
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        if (noteDto.getUserId() != null && !noteDto.getUserId().equals(existingNote.getUser().getId())) {
            User user = userRepository.findById(noteDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            existingNote.setUser(user);
        }

        existingNote.setTitle(noteDto.getTitle());
        existingNote.setDescription(noteDto.getDescription());
        existingNote.setCreationDate(noteDto.getCreationDate());
        existingNote.setNotificationDate(noteDto.getNotificationDate());

        Note updated = noteRepository.save(existingNote);
        return noteMapper.toDto(updated);
    }
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}