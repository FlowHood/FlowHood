package org.galactic.flowhood.utils;


public enum SystemRoles {
    ADMINISTRATOR("ADM"), VISITOR("VST"), VIGILANT("VGT"), RESIDENT("RST"), RESPONSIBLE("ECG");

    private String role;

    public String getRole() {
        return this.role;
    }

    private SystemRoles(String role) {
        this.role = role;
    }
}