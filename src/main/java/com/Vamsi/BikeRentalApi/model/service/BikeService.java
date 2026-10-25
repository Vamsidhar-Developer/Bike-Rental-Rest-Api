package com.Vamsi.BikeRentalApi.model.service;

import java.util.List;

import com.Vamsi.BikeRentalApi.model.Bike;

public interface BikeService {
	
	
	    Bike addBike(Bike bike);

	    List<Bike> getAllBikes();

	    Bike getBikeById(Integer bikeId);

	    Bike updateBike(Integer bikeId, Bike bike);

	    void deleteBike(Integer bikeId);

	    List<Bike> getAvailableBikes();
	

}
