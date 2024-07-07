package org.galactic.flowhood.services;


public interface MessageService {
    void publish(final String topic, String data);
}
