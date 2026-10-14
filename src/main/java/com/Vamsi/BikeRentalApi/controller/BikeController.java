package com.Vamsi.BikeRentalApi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Vamsi.BikeRentalApi.model.Bike;
import com.Vamsi.BikeRentalApi.model.service.BikeService;

@CrossOrigin(origins = {
		"http://localhost:5173"
	})
@RestController
@RequestMapping("/bikes")
public class BikeController {

    @Autowired
    private BikeService bikeService;

    // Add a bike
    @PostMapping("/Post")
    public ResponseEntity<Bike> addBike(@RequestBody Bike bike) {
        return new ResponseEntity<>(
                bikeService.addBike(bike), HttpStatus.CREATED);
    }

    // Get all bike
    @GetMapping("/Get")
    public ResponseEntity<List<Bike>> getAllBikes() {
        return ResponseEntity.ok(bikeService.getAllBikes());
    }

    // Get bike by ID
    @GetMapping("/{bikeId}")
    public ResponseEntity<Bike> getBikeById(
            @PathVariable Integer bikeId) {

        Bike bike = bikeService.getBikeById(bikeId);

        if (bike == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(bike);
    }

    // Update bike
    @PutMapping("Update/{bikeId}")
    public ResponseEntity<Bike> updateBike(
            @PathVariable Integer bikeId,
            @RequestBody Bike bike) {

        Bike updatedBike = bikeService.updateBike(bikeId, bike);

        if (updatedBike == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedBike);
    }

    // Delete bike
    @DeleteMapping("Delete/{bikeId}")
    public ResponseEntity<Void> deleteBike(
            @PathVariable Integer bikeId) {

        bikeService.deleteBike(bikeId);
        return ResponseEntity.noContent().build();
    }

    // Get available bikes
    @GetMapping("/available")
    public ResponseEntity<List<Bike>> getAvailableBikes() {
        return ResponseEntity.ok(bikeService.getAvailableBikes());
    }
}