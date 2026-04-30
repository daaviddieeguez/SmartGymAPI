package com.smart.gym.smartgym.service;

import com.smart.gym.smartgym.validation.SpanishDniValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SpanishDniValidatorTest {

    private SpanishDniValidator validator;

    @BeforeEach
    void setUp() {
        validator = new SpanishDniValidator();
    }

    @Test
    void shouldReturnTrueForValidDni() {
        assertTrue(validator.isValid("º12345678Z", null));
    }

    @Test
    void shouldReturnFalseForIncorrectLetter() {
        assertFalse(validator.isValid("12345678A", null));
    }

    @Test
    void shouldReturnTrueForNullOrEmpty() {
        assertTrue(validator.isValid(null, null));
        assertTrue(validator.isValid("", null));
    }
}
