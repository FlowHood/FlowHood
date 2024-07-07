#include <ESP8266WiFi.h>
#include <Servo.h>

// Pines del ESP8266
#define SERVO_PIN D1
#define LED_R_PIN D2
#define LED_G_PIN D3
#define LED_B_PIN D4

// Configuración del servo motor
Servo myservo;

// Estados del sistema
bool qrScanned = false;

void setup() {
  // Inicialización de los pines
  pinMode(LED_R_PIN, OUTPUT);
  pinMode(LED_G_PIN, OUTPUT);
  pinMode(LED_B_PIN, OUTPUT);

  // Configuración del servo
  myservo.attach(SERVO_PIN);

  // Configuración inicial del LED (rojo)
  setLEDColor(255, 0, 0);

  // Inicialización de la comunicación serial
  Serial.begin(115200);

  // Conexión WiFi
  WiFi.begin("tuSSID", "tuPASSWORD");

  // Esperar la conexión WiFi
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");
}

void loop() {
  // Verifica si hay datos disponibles desde el serial (emulando recepción desde el QR escaneado)
  if (Serial.available() > 0) {
    String receivedData = Serial.readString();

    if (receivedData == "QR_OK") {
      qrScanned = true;
      // Levantar la pluma
      myservo.write(90); // Ajusta el ángulo según sea necesario
      // Cambiar LED a verde
      setLEDColor(0, 255, 0);
    } else {
      qrScanned = false;
      // Bajar la pluma
      myservo.write(0); // Ajusta el ángulo según sea necesario
      // Cambiar LED a rojo
      setLEDColor(255, 0, 0);
    }
  }
}

// Función para configurar el color del LED RGB
void setLEDColor(int red, int green, int blue) {
  analogWrite(LED_R_PIN, red);
  analogWrite(LED_G_PIN, green);
  analogWrite(LED_B_PIN, blue);
}

