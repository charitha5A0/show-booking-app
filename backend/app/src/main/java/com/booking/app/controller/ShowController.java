package com.booking.app.controller;

import com.booking.app.entity.Show;
import com.booking.app.service.ShowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shows")
@Tag(name = "Shows", description = "Browse and manage shows")
public class ShowController {

    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping
    @Operation(summary = "List shows")
    public List<Show> listShows() {
        return showService.listShows();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a show", description = "Returns a show by its ID.")
    @ApiResponse(responseCode = "404", description = "Show not found")
    public Show getShow(@PathVariable Long id) {
        return showService.getShow(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a show")
    @ApiResponse(responseCode = "201", description = "Show created")
    @ApiResponse(responseCode = "400", description = "Invalid show details")
    public Show createShow(@RequestBody Show show) {
        return showService.createShow(show);
    }
}
