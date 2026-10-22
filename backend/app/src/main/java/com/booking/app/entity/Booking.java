package com.booking.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "show_id", nullable = false)
    private Show show;

    private String customerName;

    private int seatsBooked;

    private LocalDateTime bookingTime;

    protected Booking() {
    }

    public Booking(Show show, String customerName, int seatsBooked) {
        this.show = show;
        this.customerName = customerName;
        this.seatsBooked = seatsBooked;
    }

    @PrePersist
    void setBookingTimeIfMissing() {
        if (bookingTime == null) {
            bookingTime = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public Show getShow() {
        return show;
    }

    public String getCustomerName() {
        return customerName;
    }

    public int getSeatsBooked() {
        return seatsBooked;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }
}
