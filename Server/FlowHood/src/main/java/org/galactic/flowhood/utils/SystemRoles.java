package org.galactic.flowhood.utils;


import lombok.Getter;

@Getter
public enum SystemRoles {
    ADMINISTRATOR("ADM"), VISITOR("VST"), VIGILANT("VGT"), RESIDENT("RST"), RESPONSIBLE("ECG");

    private final String role;

    private SystemRoles(String role) {
        this.role = role;
    }
}