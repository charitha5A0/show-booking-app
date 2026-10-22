package com.booking.app.config;

import com.booking.app.entity.Show;
import com.booking.app.repository.ShowRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class SampleDataConfig {

    @Bean
    CommandLineRunner seedShows(ShowRepository showRepository) {
        return args -> {
            if (showRepository.count() == 0) {
                LocalDateTime firstShowTime = LocalDateTime.now().plusDays(1).withHour(18).withMinute(0);
                showRepository.save(new Show("The Enchanted Evening", firstShowTime, 120, 120));
                showRepository.save(new Show("A Night of Laughter", firstShowTime.plusDays(1), 100, 100));
                showRepository.save(new Show("The Grand Finale", firstShowTime.plusDays(2), 150, 150));
            }
        };
    }
}
