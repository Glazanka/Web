package com.example.Web_Project.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "items")
@Data
public class TodoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String text;

    @Column
    private Boolean completed;

    @ManyToOne
    @JoinColumn(name = "todo_id", nullable = false)
    private Todo todo;
}
