package org.galactic.flowhood.utils;


import lombok.Getter;

@Getter
public enum SystemStates {
    ACTIVE("ACT"), PENDING("PEN"), USED("USD"), INACTIVE("INC");

    private final String state;

    private SystemStates(String state) {
        this.state = state;
    }
}