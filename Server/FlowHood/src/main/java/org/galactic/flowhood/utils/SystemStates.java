package org.galactic.flowhood.utils;


public enum SystemStates {
    ACTIVE("ACT"), PENDING("PEN"), USED("USD");

    private String state;

    public String getState() {
        return this.state;
    }

    private SystemStates(String state) {
        this.state = state;
    }
}