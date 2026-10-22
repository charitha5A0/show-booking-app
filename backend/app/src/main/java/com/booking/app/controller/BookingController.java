package com.booking.app.controller;

import com.booking.app.dto.CreateBookingRequest;
import com.booking.app.entity.Booking;
import com.booking.app.service.ShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "Book seats for shows")
public class BookingController {

    private final ShowService showService;

    public BookingController(ShowService showService) {
        this.showService = showService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a booking")
    @ApiResponse(responseCode = "201", description = "Booking created")
    @ApiResponse(responseCode = "400", description = "Invalid request or insufficient seats")
    @ApiResponse(responseCode = "404", description = "Show not found")
    public Booking createBooking(@RequestBody CreateBookingRequest request) {
        return showService.bookSeats(
                request.showId(),
                request.customerName(),
                request.seatsBooked());
    }
}
