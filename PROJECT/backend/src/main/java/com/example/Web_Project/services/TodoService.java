package com.example.Web_Project.services;

import com.example.Web_Project.dtos.TodoDto;
import com.example.Web_Project.mappers.TodoMapper;
import com.example.Web_Project.models.Todo;
import com.example.Web_Project.models.User;
import com.example.Web_Project.repos.TodoRepository;
import com.example.Web_Project.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    private final TodoMapper todoMapper;
    public TodoService(TodoRepository todoRepository, UserRepository userRepository, TodoMapper todoMapper) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
        this.todoMapper = todoMapper;
    }

    public List<TodoDto> getAllTodos() {
        return todoRepository.findAll()
                .stream()
                .map(todoMapper::toDto)
                .collect(Collectors.toList());
    }

    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
        return todoMapper.toDto(todo);
    }

    public TodoDto createTodo(TodoDto todoDto) {
        User user = userRepository.findById(todoDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Todo todo = todoMapper.toEntity(todoDto);
        todo.setUser(user);

        Todo saved = todoRepository.save(todo);
        return todoMapper.toDto(saved);
    }

    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        if (todoDto.getUserId() != null && !todoDto.getUserId().equals(existingTodo.getUser().getId())) {
            User user = userRepository.findById(todoDto.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            existingTodo.setUser(user);
        }

        // update other fields if you have more
        // For now, only createdAt exists, usually immutable

        Todo updated = todoRepository.save(existingTodo);
        return todoMapper.toDto(updated);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
