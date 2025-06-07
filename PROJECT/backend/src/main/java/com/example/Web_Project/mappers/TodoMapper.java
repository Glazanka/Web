package com.example.Web_Project.mappers;

import com.example.Web_Project.dtos.TodoDto;
import com.example.Web_Project.models.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TodoMapper {

    @Mapping(target = "userId", source = "user.id")
    TodoDto toDto(Todo todo);

    @Mapping(target = "user", ignore = true)
    Todo toEntity(TodoDto dto);
}
