package com.example.Web_Project.mappers;

import com.example.Web_Project.dtos.NoteDto;
import com.example.Web_Project.models.Note;
import com.example.Web_Project.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface NoteMapper {

    @Mapping(target = "userId", source = "user.id")
    NoteDto toDto(Note note);

    @Mapping(target = "user", ignore = true)
    Note toEntity(NoteDto dto);

    default Note toEntity(NoteDto dto, User user) {
        Note note = toEntity(dto);
        note.setUser(user);
        return note;
    }
}