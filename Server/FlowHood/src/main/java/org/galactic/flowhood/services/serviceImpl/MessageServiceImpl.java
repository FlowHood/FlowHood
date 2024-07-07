package org.galactic.flowhood.services.serviceImpl;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.galactic.flowhood.services.MessageService;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MessageServiceImpl implements MessageService {
    private final IMqttClient mqttClient;

    public MessageServiceImpl(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    public void publish(final String topic, String data, int qos, boolean retained)
            throws MqttPersistenceException, MqttException, IOException, InterruptedException {

        //creating mqtt message
        MqttMessage mqttMessage = new MqttMessage();
        mqttMessage.setPayload(data.getBytes());
        mqttMessage.setQos(1);
        mqttMessage.setRetained(false);

        /* Building the parent span for the publish operation */
        mqttClient.publish(topic, mqttMessage);

    }

}
