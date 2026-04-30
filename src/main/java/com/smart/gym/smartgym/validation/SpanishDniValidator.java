package com.smart.gym.smartgym.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SpanishDniValidator implements ConstraintValidator<ValidSpanishDni, String> {
    private static final String DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

    @Override
    public boolean isValid(String dni, ConstraintValidatorContext context) {
        if (dni == null || !dni.matches("^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$")) {
            return true;
        }

        try {
            String numbers = dni.substring(0, 8);
            String providedLetter = dni.substring(8, 9);

            int dniNumber = Integer.parseInt(numbers);
            int position = dniNumber % 23;
            String calculatedLetter = DNI_LETTERS.substring(position, position + 1);

            return calculatedLetter.equals(providedLetter);

        } catch (NumberFormatException e) {
            return false;
        }
    }
}
