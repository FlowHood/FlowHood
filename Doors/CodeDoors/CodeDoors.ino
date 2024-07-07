#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>

/********* WiFi Access Point ***********/
#define WLAN_SSID       "AllenIphone"
#define WLAN_PASS       "12345678"

/********* MQTT Setup ***********/
#define MQTT_SERVER     "137.184.8.57"
#define MQTT_PORT       1883
#define MQTT_TOPIC      "read/qr"

WiFiClient espClient;
PubSubClient client(espClient);
Servo servoMotor;
const int servoPin = D1; // Pin donde está conectado el servo

// Definición de pines para el LED RGB
const int redPin = D3;
const int greenPin = D4;
const int bluePin = D5; // No se usa, pero se define para posibles expansiones

const int openPosition = 0; // Ángulo para abrir la pluma
const int closedPosition = 90; // Ángulo para cerrar la pluma

void setup() {
  Serial.begin(115200);
  servoMotor.attach(servoPin);

  // Configuración de pines del LED RGB como salida
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT); // No se usa, pero se configura por completitud
 
  // Inicialmente, cerramos la pluma y ponemos el LED en rojo
  servoMotor.write(closedPosition);
  setLEDColor(255, 0, 0);

  connectToWiFi();
  client.setServer(MQTT_SERVER, MQTT_PORT);
  client.setCallback(callback);
  reconnect();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String message;
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);

  // Actuar según el mensaje recibido
  if (message == "1") {
    abrirPluma();
    delay(10000); // Mantener la pluma abierta por 10 segundos
    cerrarPluma();
  }
}

void abrirPluma() {
  Serial.println("Abriendo pluma...");
  servoMotor.write(openPosition);
  setLEDColor(0, 255, 0); // LED en verde
}

void cerrarPluma() {
  Serial.println("Cerrando pluma...");
  servoMotor.write(closedPosition);
  setLEDColor(255, 0, 0); // LED en rojo
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Intentar conectar sin autenticación
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");
      // Suscribirse al tema después de conectarse
      client.subscribe(MQTT_TOPIC);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void connectToWiFi() {
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setLEDColor(int red, int green, int blue) {
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue); // Este pin no se usa pero se incluye por completitud
}
