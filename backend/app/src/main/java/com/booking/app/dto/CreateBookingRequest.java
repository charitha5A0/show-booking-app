package com.booking.app.dto;

public record CreateBookingRequest(Long showId, String customerName, int seatsBooked) {
}
