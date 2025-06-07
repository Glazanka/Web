package com.example.Web_Project;

import com.example.Web_Project.dtos.NoteDto;
import com.example.Web_Project.dtos.TodoDto;
import com.example.Web_Project.dtos.TodoItemDto;
import com.example.Web_Project.dtos.UserDto;
import com.example.Web_Project.services.NoteService;
import com.example.Web_Project.services.TodoItemService;
import com.example.Web_Project.services.TodoService;
import com.example.Web_Project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    private final UserService userService;
    private final NoteService noteService;
    private final TodoService todoService;
    private final TodoItemService todoItemService;

    @Override
    public void run(ApplicationArguments args) {
        try {
            logger.info("Data Initialization Started");

            // Create some users
            List<UserDto> users = List.of(
                    new UserDto(null, "alice", "alice@example.com", "hashedPassword1", LocalDateTime.now()),
                    new UserDto(null, "bob", "bob@example.com", "hashedPassword2", LocalDateTime.now())
            );

            List<UserDto> savedUsers = new ArrayList<>();
            for (UserDto user : users) {
                savedUsers.add(userService.createUser(user));
            }

            // Create notes for user alice
            UserDto alice = savedUsers.get(0);

            List<NoteDto> notes = List.of(
                    new NoteDto(null, alice.getId(), "Shopping List", "Buy milk, eggs, bread", Instant.now(), null),
                    new NoteDto(null, alice.getId(), "Meeting Notes", "Discuss project timeline", Instant.now(), Instant.now().plusSeconds(3600))
            );

            for (NoteDto note : notes) {
                noteService.createNote(note);
            }

            // Create todos for user bob
            UserDto bob = savedUsers.get(1);

            List<TodoDto> todos = List.of(
                    new TodoDto(null, bob.getId(), java.util.Date.from(Instant.now())),
                    new TodoDto(null, bob.getId(), java.util.Date.from(Instant.now()))
            );

            List<TodoDto> savedTodos = new ArrayList<>();
            for (TodoDto todo : todos) {
                savedTodos.add(todoService.createTodo(todo));
            }

            // Create todo items for the first todo
            TodoDto firstTodo = savedTodos.get(0);

            List<TodoItemDto> todoItems = List.of(
                    new TodoItemDto(null, "Finish report", false, firstTodo.getId()),
                    new TodoItemDto(null, "Call client", true, firstTodo.getId())
            );

            for (TodoItemDto item : todoItems) {
                todoItemService.createTodoItem(item);
            }

            logger.info("Data Initialization Completed");
        } catch (Exception e) {
            logger.error("Data Initialization Failed", e);
            throw e;
        }
    }
}