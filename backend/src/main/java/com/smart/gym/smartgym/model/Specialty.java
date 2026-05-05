package com.smart.gym.smartgym.model;

public enum Specialty {
    FITNESS("fitness"),
    POOL("pool"),
    CYCLING("cycling"),
    HIIT("hiit"),
    CORE("core"),
    DANCE("dance"),
    BODYCARE("bodycore"),
    CARDIO("cardio");

    final String name;

    Specialty(String name){
        this.name = name;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
