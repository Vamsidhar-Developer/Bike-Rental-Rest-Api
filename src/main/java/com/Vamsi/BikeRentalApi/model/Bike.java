package com.Vamsi.BikeRentalApi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="BikeRentalDetails")
@Setter
@Getter

public class Bike {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	Integer bikeId;
	String bikeName;
	String brand;
	String model;
	String registrationNumber;
	String bikeType;
	Double pricePerHour;
	Boolean availability;
	String color;
	Integer year;

}
