package com.example.Web_Project.repos;


import com.example.Web_Project.models.Todo;
import com.example.Web_Project.models.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
    List<TodoItem> findByTodo(Todo todo);
    List<TodoItem> findByTodoId(Long todoId);
}
