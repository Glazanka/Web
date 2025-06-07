package com.example.Web_Project.mappers;

import com.example.Web_Project.dtos.TodoItemDto;
import com.example.Web_Project.models.TodoItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TodoItemMapper {
    @Mapping(target = "todoId", source = "todo.id")
    TodoItemDto toDto(TodoItem item);
    @Mapping(target = "todo", ignore = true)
    TodoItem toEntity(TodoItemDto dto);
}