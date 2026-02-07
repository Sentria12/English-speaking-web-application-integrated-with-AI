package com.aesp.backend.config;

import com.aesp.backend.entity.Availability;
import com.aesp.backend.repository.AvailabilityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalTime;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(AvailabilityRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("Đang tạo dữ liệu mẫu cho lịch rảnh Mentor...");
                repository.saveAll(List.of(
                        createSlot(1, 2, "09:00", "10:00"),
                        createSlot(1, 3, "14:00", "15:00"),
                        createSlot(1, 4, "19:00", "20:00")));
            }
        };
    }

    private Availability createSlot(Integer mentorId, Integer day, String start, String end) {
        Availability a = new Availability();
        a.setMentorId(mentorId);
        a.setDayOfWeek(day);
        a.setStartTime(LocalTime.parse(start));
        a.setEndTime(LocalTime.parse(end));
        return a;
    }
}