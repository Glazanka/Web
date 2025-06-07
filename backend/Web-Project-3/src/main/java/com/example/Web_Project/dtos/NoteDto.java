package com.example.Web_Project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;


@AllArgsConstructor
@Data
public class NoteDto {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private Instant creationDate;
    private Instant notificationDate;
}
