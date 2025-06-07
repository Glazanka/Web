package com.example.Web_Project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TodoItemDto {
    private Long id;
    private String text;
    private Boolean completed;
    private Long todoId;
}
