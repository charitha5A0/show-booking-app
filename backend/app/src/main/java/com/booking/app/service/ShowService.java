package com.booking.app.service;

import com.booking.app.entity.Booking;
import com.booking.app.entity.Show;
import com.booking.app.exception.InsufficientSeatsException;
import com.booking.app.exception.ShowNotFoundException;
import com.booking.app.repository.BookingRepository;
import com.booking.app.repository.ShowRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShowService {

    private final ShowRepository showRepository;
    private final BookingRepository bookingRepository;

    public ShowService(ShowRepository showRepository, BookingRepository bookingRepository) {
        this.showRepository = showRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional(readOnly = true)
    public List<Show> listShows() {
        return showRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Show getShow(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new ShowNotFoundException(id));
    }

    @Transactional
    public Show createShow(Show show) {
        if (show.getTotalSeats() < 1
                || show.getAvailableSeats() < 0
                || show.getAvailableSeats() > show.getTotalSeats()) {
            throw new IllegalArgumentException(
                    "Seat counts must satisfy 0 <= availableSeats <= totalSeats and totalSeats > 0");
        }
        return showRepository.save(show);
    }

    @Transactional
    public Booking bookSeats(Long showId, String customerName, int seatsBooked) {
        if (seatsBooked < 1) {
            throw new IllegalArgumentException("seatsBooked must be greater than zero");
        }
        if (customerName == null || customerName.isBlank()) {
            throw new IllegalArgumentException("customerName must not be blank");
        }

        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new ShowNotFoundException(showId));
        if (seatsBooked > show.getAvailableSeats()) {
            throw new InsufficientSeatsException(seatsBooked, show.getAvailableSeats());
        }

        show.setAvailableSeats(show.getAvailableSeats() - seatsBooked);
        showRepository.save(show);
        return bookingRepository.save(new Booking(show, customerName, seatsBooked));
    }
}
