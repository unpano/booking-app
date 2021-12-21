package ftn.booking.Models;


import ftn.booking.model.enums.NavigationEquipment;

import javax.persistence.*;

import java.util.List;

@Entity
public class Boat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String description;

    private String rules;

    private  Long length;

    private Integer numOfMotors;

    private Long motorPower;

    private Long maxSpeed;

    ///pictures


    private int maxNumOfPersons;

    private NavigationEquipment navigationEquipment;

    public Boat() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public Long getLength() {
        return length;
    }

    public void setLength(Long length) {
        this.length = length;
    }

    public int getNumOfMotors() {
        return numOfMotors;
    }

    public void setNumOfMotors(int numOfMotors) {
        this.numOfMotors = numOfMotors;
    }

    public Long getMotorPower() {
        return motorPower;
    }

    public void setMotorPower(Long motorPower) {
        this.motorPower = motorPower;
    }

    public Long getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(Long maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public int getMaxNumOfPersons() {
        return maxNumOfPersons;
    }

    public void setMaxNumOfPersons(int maxNumOfPersons) {
        this.maxNumOfPersons = maxNumOfPersons;
    }

    public NavigationEquipment getNavigationEquipment() {
        return navigationEquipment;
    }

    public void setNavigationEquipment(NavigationEquipment navigationEquipment) {
        this.navigationEquipment = navigationEquipment;
    }
}
