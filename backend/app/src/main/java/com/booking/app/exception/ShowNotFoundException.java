package com.booking.app.exception;

public class ShowNotFoundException extends RuntimeException {

    public ShowNotFoundException(Long showId) {
        super("Show with id " + showId + " was not found");
    }
}
