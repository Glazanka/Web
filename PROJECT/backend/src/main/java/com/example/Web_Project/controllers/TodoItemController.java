package com.example.Web_Project.controllers;

import com.example.Web_Project.dtos.TodoItemDto;
import com.example.Web_Project.services.TodoItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todoitems")
public class TodoItemController {

    private final TodoItemService todoItemService;

    public TodoItemController(TodoItemService todoItemService) {
        this.todoItemService = todoItemService;
    }

    @GetMapping
    public ResponseEntity<List<TodoItemDto>> getAllTodoItems() {
        return ResponseEntity.ok(todoItemService.getAllTodoItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoItemDto> getTodoItemById(@PathVariable Long id) {
        return ResponseEntity.ok(todoItemService.getTodoItemById(id));
    }

    @PostMapping
    public ResponseEntity<TodoItemDto> createTodoItem(@RequestBody TodoItemDto todoItemDto) {
        TodoItemDto createdItem = todoItemService.createTodoItem(todoItemDto);
        return ResponseEntity.ok(createdItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoItemDto> updateTodoItem(@PathVariable Long id, @RequestBody TodoItemDto todoItemDto) {
        TodoItemDto updatedItem = todoItemService.updateTodoItem(id, todoItemDto);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoItem(@PathVariable Long id) {
        todoItemService.deleteTodoItem(id);
        return ResponseEntity.noContent().build();
    }
}