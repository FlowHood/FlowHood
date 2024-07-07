package org.galactic.flowhood.services.serviceImpl;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.galactic.flowhood.services.MessageService;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

    private final IMqttClient mqttClient;

    public MessageServiceImpl(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    public void publish(final String topic, String data) {
        try {
            MqttMessage message = new MqttMessage();
            message.setPayload(data.getBytes());
            message.setQos(0);
            message.setRetained(false);
            mqttClient.publish(topic, message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
