package com.example.Web_Project.services;

import com.example.Web_Project.dtos.TodoItemDto;
import com.example.Web_Project.mappers.TodoItemMapper;
import com.example.Web_Project.models.Todo;
import com.example.Web_Project.models.TodoItem;
import com.example.Web_Project.repos.TodoItemRepository;
import com.example.Web_Project.repos.TodoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoItemService {

    private final TodoItemRepository todoItemRepository;
    private final TodoRepository todoRepository;
    private final TodoItemMapper todoItemMapper;

    public List<TodoItemDto> getAllTodoItems() {
        return todoItemRepository.findAll()
                .stream()
                .map(todoItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public TodoItemDto getTodoItemById(Long id) {
        TodoItem todoItem = todoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TodoItem not found"));
        return todoItemMapper.toDto(todoItem);
    }

    public TodoItemDto createTodoItem(TodoItemDto todoItemDto) {
        Todo todo = todoRepository.findById(todoItemDto.getTodoId())
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        TodoItem todoItem = todoItemMapper.toEntity(todoItemDto);
        todoItem.setTodo(todo);

        TodoItem saved = todoItemRepository.save(todoItem);
        return todoItemMapper.toDto(saved);
    }

    public TodoItemDto updateTodoItem(Long id, TodoItemDto todoItemDto) {
        TodoItem existingTodoItem = todoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TodoItem not found"));

        if (todoItemDto.getTodoId() != null && !todoItemDto.getTodoId().equals(existingTodoItem.getTodo().getId())) {
            Todo todo = todoRepository.findById(todoItemDto.getTodoId())
                    .orElseThrow(() -> new RuntimeException("Todo not found"));
            existingTodoItem.setTodo(todo);
        }

        existingTodoItem.setText(todoItemDto.getText());
        existingTodoItem.setCompleted(todoItemDto.getCompleted());

        TodoItem updated = todoItemRepository.save(existingTodoItem);
        return todoItemMapper.toDto(updated);
    }

    public void deleteTodoItem(Long id) {
        todoItemRepository.deleteById(id);
    }
}