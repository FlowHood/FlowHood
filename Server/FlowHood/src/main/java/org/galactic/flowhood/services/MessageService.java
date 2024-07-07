package org.galactic.flowhood.services;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;

import java.io.IOException;

public interface MessageService {
    void publish(final String topic, String data)
            throws MqttPersistenceException, MqttException, IOException, InterruptedException;
}
