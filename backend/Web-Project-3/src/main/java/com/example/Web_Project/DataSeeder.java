package com.example.Web_Project;

import com.example.Web_Project.dtos.RegisterDto;
import com.example.Web_Project.services.UserService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
//@Profile("dev") // Можеш да активираш това, ако искаш да се пуска само в dev среда
public class DataSeeder implements ApplicationRunner {

    private final UserService userService;

    public DataSeeder(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(org.springframework.boot.ApplicationArguments args) {
        System.out.println("🟢 Data Initialization Started");

        List<RegisterDto> initialUsers = List.of(
                new RegisterDto("admin", "admin123", "admin@example.com"),
                new RegisterDto("justRado", "rado123", "rado@example.com")
        );

        for (RegisterDto user : initialUsers) {
            try {
                userService.register(user);
                System.out.println("✅ Създаден потребител: " + user.getUsername());
            } catch (RuntimeException e) {
                System.out.println("❗ Потребител с това име вече съществува, пропускам: " + user.getUsername());
            }
        }

        System.out.println("✅ Data Initialization Completed");
    }
}
