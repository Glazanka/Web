package com.example.Web_Project.mappers;
import com.example.Web_Project.dtos.UserDto;

import com.example.Web_Project.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Component;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
@Component
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto dto);
}