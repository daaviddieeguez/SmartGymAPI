package com.smart.gym.smartgym.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = SpanishDniValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidSpanishDni {
    String message() default "The DNI letter is incorrect";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
