package org.galactic.flowhood.services.serviceImpl;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.galactic.flowhood.services.MessageService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

@Service
public class MessageServiceImpl implements MessageService {
    private final IMqttClient mqttClient;

    public MessageServiceImpl(IMqttClient mqttClient) {
        this.mqttClient = mqttClient;
    }

    public void publish(final String topic, String data, int qos, boolean retained)
            throws MqttPersistenceException, MqttException, IOException, InterruptedException {

        /* Filling mapinject with header values */
//        Map<String, String> mapinject = new HashMap<>();

        /* Extracting ids from mapinject and building the payload byte array to be sent */
//        String stid = mapinject.get("x-datadog-trace-id");
//        long ltid = Long.valueOf(stid);
//        ByteBuffer bbftid = ByteBuffer.allocate(Long.BYTES);
//        bbftid.putLong(ltid);
//        byte[] btid = bbftid.array();
//
//
//        String spid = mapinject.get("x-datadog-parent-id");
//        long lpid = Long.valueOf(spid);
//        ByteBuffer bbfpid = ByteBuffer.allocate(Long.BYTES);
//        bbfpid.putLong(lpid);
//        byte[] bpid = bbfpid.array();
//

        String messageSent = "Un autre exemple de messsage";
//        byte[] bmsg = messageSent.getBytes();

        /* Building the payload by merging the above arrays */
//        byte[] payload = new byte[btid.length + bpid.length + bmsg.length];

//        int pos = 0;
//        for (byte element : btid) {
//            payload[pos] = element;
//            pos++;
//        }
//
//        for (byte element : bpid) {
//            payload[pos] = element;
//            pos++;
//        }
//
//        for (byte element : bmsg) {
//            payload[pos] = element;
//            pos++;
//        }
//
        byte[] payload = ByteBuffer.allocate(4).putInt(1).array();
        /* Wrapping the payload in the MqttMessage object */
        MqttMessage mqttMessage = new MqttMessage();
        mqttMessage.setPayload(payload);
        mqttMessage.setQos(1);
        mqttMessage.setRetained(false);

        /* Building the parent span for the publish operation */
        mqttClient.publish(topic, mqttMessage);

    }

}
