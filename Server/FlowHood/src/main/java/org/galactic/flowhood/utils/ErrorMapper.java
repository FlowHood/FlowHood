package org.galactic.flowhood.utils;

import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ErrorMapper {
    public Map<String, List<String>> map (List<FieldError> errors) {
        Map<String, List<String>> map = new HashMap<>();

        errors.forEach(error -> {
            List<String> _errors =
                    map.getOrDefault(error.getField(), new ArrayList<>());

            _errors.add(error.getDefaultMessage());
            map.put(error.getField(), _errors);
        });

        return map;
    }
}
