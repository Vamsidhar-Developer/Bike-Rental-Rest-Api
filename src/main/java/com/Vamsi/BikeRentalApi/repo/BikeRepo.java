 package com.Vamsi.BikeRentalApi.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Vamsi.BikeRentalApi.model.Bike;

public interface BikeRepo extends JpaRepository<Bike, Integer> {

    List<Bike> findByAvailability(Boolean availability);
}