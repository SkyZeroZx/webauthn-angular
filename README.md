# WebAuthn con Angular y NestJS

## Descripción

Este repositorio es una guía práctica para implementar **WebAuthn** utilizando **Angular** en el frontend y **NestJS** en el backend. El proyecto incluye un ejemplo de arquitectura que utiliza **Redis** como caché distribuido para mejorar la eficiencia de la autenticación y la gestión de sesiones.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Desarollo](#desarollo)

## Requisitos

- Node.js 20+
- Redis v7.0+
- Angular CLI v18+
- NestJS v10+
- Docker Compose ( Opcional)

## Arquitectura del Proyecto

La arquitectura del proyecto está diseñada para ser modular y escalable, utilizando una separación clara entre frontend, backend y almacenamiento en caché. A continuación se muestra un diagrama simplificado:

![Arquitectura](/docs/images/architecture-diagram.jpg)

### Componentes

- **WebAuthn Client (Angular)**:

  - Ofrece la interfaz gráfica para el registro y autenticación de usuarios mediante WebAuthn.
  - Facilita la autenticación sin contraseñas, mejorando la experiencia del usuario.

- **WebAuthn API (NestJS)**:

  - Gestiona la lógica de negocio de la autenticación y el registro de dispositivos.
  - Genera desafíos (challenges) para autenticación y valida las respuestas.

- **Redis Cache**:

  - Almacena temporalmente los desafíos generados durante el proceso de autenticación.
  - Mejora el tiempo de respuesta al reducir la carga en la base de datos principal.

- **Database (PostgreSQL)**:
  - Almacena de forma persistente la información de los usuarios y sus dispositivos autenticadores.
  - Garantiza la integridad y seguridad de los datos registrados.

### Diagrama Base de Datos

![Arquitectura](/docs/images/database-diagram.jpeg)

## Configuración

### Cliente

Configura el endpoint correspondiente en el folder `environments`.

### API

1. Crea un archivo `.env` basado en el template `.env.template` con los siguientes parámetros:

   ```env
   # PORT
   PORT=3000

   # JWT
   JWT_SECRET_TOKEN=NESTJS_SECRET_TOKEN
   JWT_EXPIRE_TIME=200H

   # WEB AUTHN CONFIG
   WEB_AUTHN_RP_ID=localhost
   WEB_AUTHN_RP_NAME=Web Authentication
   WEB_AUTHN_RP_ID_ARRAY=["localhost", "YOUR_DOMAIN"]
   WEB_AUTHN_ORIGIN=["http://localhost:3000", "http://localhost:4200"]
   WEB_AUTHN_NAME=WebAuthn Angular

   # DATABASE CONFIG
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_AUTO_LOAD_ENTITIES=true
   DATABASE_SYNCHRONIZE=true
   DATABASE_LOGGING=false
   DATABASE_SSL=true

   # CACHE CONFIG
   CACHE_HOST=localhost
   CACHE_NAME=default
   CACHE_USERNAME=default
   CACHE_PASSWORD=default
   CACHE_PORT=6379
   CACHE_TTL=60000
   CACHE_TLS=true

   # WINSTON CONFIG
   LOGGER_FORMAT=YYYY-MM-DD hh:mm:ss.SSS A
   LOGGER_APP_NAME=API_WEBAUTHN

   # LOGGER CONFIG
   LOG_FOLDER=LOG
   LOGGER_FILENAME_INFO=APP_INFO-%DATE%.json
   LOGGER_FILENAME_WARN=APP_WARN-%DATE%.json
   LOGGER_FILENAME_ERROR=APP_ERROR-%DATE%.json
   LOGGER_DATE_PATTERN=YYYY-MM-DD
   LOGGER_ZIPPED_ARCHIVE=true
   LOGGER_WATCH_LOG=true
   LOGGER_MAX_SIZE=14d
   LOGGER_MAX_FILES=20m
   ```

## Desarrollo
Para ejecutar el proyecto en un entorno local, sigue los siguientes comandos:

### Levantar el Cliente (Angular)
Inicia el entorno de desarrollo del cliente Angular con el siguiente comando:

```bash
npm run start:webauthn-angular
```

### Levantar el API (NestJS)
Inicia el entorno de desarrollo del API NestJS con el siguiente comando:

```bash
npm run start:webauthn-nestjs
 ```
 
### Generar Build
Para generar la build productiva con el siguiente comando: 

```bash
npm run build
 ```