package com.smart.gym.smartgym.model;

public enum Specialty {
    FITNESS("fitness"),
    PISCINA("piscina"),
    CICLISMO("ciclismo"),
    HIIT("hiit"),
    CORE("core"),
    BAILE("baile"),
    BODYCARE("bodycore"),
    CARDIO("cardio");

    final String nombre;

    Specialty(String nombre){
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return this.nombre;
    }
}
