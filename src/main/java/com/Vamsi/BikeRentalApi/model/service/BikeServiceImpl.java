 package com.Vamsi.BikeRentalApi.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Vamsi.BikeRentalApi.model.Bike;
import com.Vamsi.BikeRentalApi.repo.BikeRepo;

@Service
public class BikeServiceImpl implements BikeService {

    @Autowired
    private BikeRepo bikeRepo;

    @Override
    public Bike addBike(Bike bike) {
        return bikeRepo.save(bike);
    }

    @Override
    public List<Bike> getAllBikes() {
        return bikeRepo.findAll();
    }

    @Override
    public Bike getBikeById(Integer bikeId) {
        return bikeRepo.findById(bikeId).orElse(null);
    }

    @Override
    public Bike updateBike(Integer bikeId, Bike bike) {

        Bike existingBike = bikeRepo.findById(bikeId).orElse(null);

        if (existingBike == null) {
            return null;
        }

        existingBike.setBikeName(bike.getBikeName());
        existingBike.setBrand(bike.getBrand());
        existingBike.setModel(bike.getModel());
        existingBike.setRegistrationNumber(bike.getRegistrationNumber());
        existingBike.setBikeType(bike.getBikeType());
        existingBike.setPricePerHour(bike.getPricePerHour());
        existingBike.setAvailability(bike.getAvailability());
        existingBike.setColor(bike.getColor());
        existingBike.setYear(bike.getYear());

        return bikeRepo.save(existingBike);
    }

    @Override
    public void deleteBike(Integer bikeId) {
        bikeRepo.deleteById(bikeId);
    }

    @Override
    public List<Bike> getAvailableBikes() {
        return bikeRepo.findByAvailability(true);
    }
}