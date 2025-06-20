package com.example.Web_Project.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class TodoDto {
    private Long id;
    private Long userId;
    private Date createdAt;
}