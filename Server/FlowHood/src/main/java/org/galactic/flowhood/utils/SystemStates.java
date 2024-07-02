package org.galactic.flowhood.utils;


import lombok.Getter;

@Getter
public enum SystemStates {
    ACTIVE("ACT"), PENDING("PEN"), USED("USD"), INACTIVE("INC");

    private final String state;

    public static boolean isValidState(String state) {
        for (SystemStates s : SystemStates.values()) {
            if (s.getState().equals(state)) {
                return true;
            }
        }
        return false;
    }
    private SystemStates(String state) {
        this.state = state;
    }
}