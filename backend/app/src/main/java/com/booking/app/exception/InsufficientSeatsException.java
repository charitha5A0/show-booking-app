package com.booking.app.exception;

public class InsufficientSeatsException extends RuntimeException {

    public InsufficientSeatsException(int requested, int available) {
        super("Cannot book " + requested + " seats; only " + available + " seats are available");
    }
}
