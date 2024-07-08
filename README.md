# Flow Hood

Flow Hood es una innovadora solución tecnológica diseñada para mejorar el control de acceso y la seguridad en comunidades residenciales. Este sistema permite a los residentes y administradores gestionar de manera eficiente la entrada de visitantes, colaborando en la creación de un entorno seguro y organizado. Con características como generación de códigos QR dinámicos, gestión de invitaciones, y monitoreo en tiempo real, Flow Hood ofrece una experiencia integrada y fácil de usar, adaptándose a las necesidades específicas de cada comunidad.

## Tabla de contenidos

- [Flow Hood](#flow-hood)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Guía de instalación](#guía-de-instalación)
    - [Requisitos previos](#requisitos-previos)
    - [Configuración del entorno](#configuración-del-entorno)
    - [Instrucciones para correr la API](#instrucciones-para-correr-la-api)
    - [Correr el cliente web](#correr-el-cliente-web)
    - [Acceso a la API y Cliente Web](#acceso-a-la-api-y-cliente-web)
    - [Base de datos](#base-de-datos)
    - [Configuración de Mosquitto MQTT Broker](#configuración-de-mosquitto-mqtt-broker)
    - [Configuración de la maqueta con Arduino](#configuración-de-la-maqueta-con-arduino)
    - [Configuración del servidor en DigitalOcean](#configuración-del-servidor-en-digitalocean)
  - [Manual de usuario](#manual-de-usuario)
  - [Usuarios de prueba](#usuarios-de-prueba)

## Guía de instalación

Esta guía proporciona instrucciones detalladas para instalar y configurar el entorno necesario para ejecutar Flow Hood. A continuación, se describen los requisitos previos y los pasos necesarios para clonar el repositorio, configurar las variables de entorno, y ejecutar tanto la API como el cliente web.

### Requisitos previos

1. **Java JDK 11+**
2. **Node.js**
3. **IDE**: Recomendamos IntelliJ IDEA para el desarrollo con Spring Boot.
4. **Base de datos**: PostgreSQL.
5. **Arduino IDE**: Para la programación de microcontroladores.
6. **Mosquitto MQTT Broker**: Para la comunicación entre dispositivos.
7. **Cuenta en DigitalOcean**: Para configurar el servidor droplet.

### Configuración del entorno

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/FlowHood/FlowHood.git
    cd FlowHood
    ```

2. **Configurar variables de entorno**

    Crea un archivo `.env` en la raíz del proyecto con las variables necesarias para la base de datos y JWT.

### Instrucciones para correr la API

1. **Instalar dependencias**

    Navega al directorio del proyecto del servicio web y ejecuta:

    ```bash
    ./mvnw clean install
    ```

2. **Correr la API**

    Desde tu IDE (IntelliJ IDEA) o desde la línea de comandos, ejecuta el siguiente comando:

    ```bash
    ./mvnw spring-boot:run
    ```

### Correr el cliente web

1. **Navegar al directorio del cliente web**

    ```bash
    cd client
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    ```

3. **Correr el cliente web**

    ```bash
    npm run dev
    ```

### Acceso a la API y Cliente Web

- **API**: La API estará disponible en `http://167.172.138.241:8080/flowhood/api`.
- **Cliente Web**: El cliente web estará disponible en `http://localhost:3000`.

### Base de datos

Asegúrate de tener PostgreSQL corriendo en tu máquina.


### Configuración de Mosquitto MQTT Broker

1. **Instalar Mosquitto**

    ```bash
    sudo apt-get update
    sudo apt-get install mosquitto mosquitto-clients
    ```

2. **Configurar Mosquitto**

    Edite el archivo de configuración de Mosquitto para asegurar la correcta comunicación entre dispositivos.

    ```bash
    sudo nano /etc/mosquitto/mosquitto.conf
    ```

3. **Iniciar Mosquitto**

    ```bash
    sudo systemctl start mosquitto
    sudo systemctl enable mosquitto
    ```

### Configuración de la maqueta con Arduino

1. **Abrir Arduino IDE**

    Cargar el código fuente ubicado en la carpeta DOORS del repositorio.

2. **Configurar y cargar el código en el microcontrolador**

    Seleccionar la placa correcta y el puerto correspondiente en el Arduino IDE, luego cargar el código en el microcontrolador.

### Configuración del servidor en DigitalOcean

1. **Crear un Droplet en DigitalOcean**

    Sigue las instrucciones de DigitalOcean para crear un nuevo droplet con la configuración deseada.

2. **Configurar el servidor**

    Crear un Droplet en DigitalOcean y configurar el servidor con las dependencias necesarias. Clonar el repositorio, configurar las variables de entorno y correr la API y el cliente web en el servidor.

## Manual de usuario

El manual de usuario de Flow Hood es una guía completa y detallada diseñada para ayudar a los usuarios a familiarizarse con las funcionalidades y características de la aplicación. Este manual proporciona instrucciones claras y paso a paso sobre cómo utilizar cada parte del sistema, desde la generación de códigos QR y la gestión de invitaciones hasta el monitoreo en tiempo real. Además, incluye capturas de pantalla y descripciones detalladas para facilitar la comprensión y el uso efectivo de Flow Hood. A través del siguiente enlace, puedes acceder al manual de usuario completo para obtener toda la información necesaria:

[Manual de usuario](https://www.canva.com/design/DAGKUJscX_g/sAJH3Q9YVpsaDGjgEK6RFw/view?utm_content=DAGKUJscX_g&utm_campaign=designshare&utm_medium=link&utm_source=editor)

## Usuarios de prueba

La lista de usuarios de prueba proporciona las credenciales necesarias para acceder a las diferentes funcionalidades de la aplicación web de Flow Hood en un entorno de desarrollo. Esta lista incluye cuentas de prueba para diversos roles dentro del sistema, tales como administradores, responsables, residentes, visitantes y vigilantes. Estas cuentas están diseñadas para facilitar el proceso de pruebas y desarrollo, permitiendo una evaluación completa y exhaustiva de todas las características y funcionalidades del sistema.  

Accede al documento completo a través del siguiente enlace:

[Lista de usuarios de prueba](https://docs.google.com/document/d/1IfWtDGrIP_p0RbCAxUPHvhbktxYP-ZMw8LlBuFdZJmQ/edit?usp=drive_link)

<!-- # Proyecto N-capas

## Indicaciones de los commits:

- Crear una nueva rama a partir de DEVELOP que tenga el formato de `feature/<lo que van a crear>`, por ejemplo:

  - `feature/components-buttons` Para botones.
  - `feature/components-screen-home` Para las vistas de React.

- Trabajar en esa rama y luego hacer commits descriptivos usando [esta guía](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733)

- Crear un PULL REQUEST y esperar confirmación.

NO PUSHEAR NADA A LA RAMA `DEVELOP` NI A LA RAMA `MAIN`, solo trabajar en ramas llamadas "feature/" pero nunca en develop

## Indicaciones generales

- React se trabaja en la carpeta `Client`
- Arduino se trabaja en la carpeta `Doors`
- Datos falsos de BD se trabaja en la carpeta `Data`
- Spring boot se trabaja en la carpeta `Server`

## Indicaciones del código

- Instalarse la extensión de **Prettier - Code formatter** en VSCode para React.
- Correr el programa con `npm run dev`   -->