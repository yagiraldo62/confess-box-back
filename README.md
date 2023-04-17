# Prueba Ingeniero Desarrollo Master

# Descripción
Proyecto BACKEND desarrollado con NestJS, Prisma, Google Auth y JsonWebToken     

# Obtener credenciales para Google Auth :
- Accede a https://console.developers.google.com/
- Haz clic en "Crear proyecto" y sigue las instrucciones.
- Configura las credenciales OAuth2 para tu proyecto:
    - En la sección "Credenciales" de la Consola de Desarrolladores de Google, haz clic en "Crear credenciales" y selecciona "ID de cliente OAuth".
    - Elige "Aplicación web" como tipo de aplicación.
    - Establece las "URI de redireccionamiento autorizadas" a la URL donde deseas que los usuarios sean redirigidos después de la autenticación. Esto generalmente será una URL en tu servidor Node.js que manejará la respuesta de autenticación.
    - Haz clic en "Crear" y copia el ID de cliente y el secreto de cliente que se generan.

## Configurar variables de entorno
Cambia el nombre de `.env.example` a `.env` y llena las propiedades de `GOOGLE_CLIENT_ID` y `GOOGLE_SECRET` con las que obtuviste anteriormente en la consola de Google

```bash
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=

# Puedes usar la DB de prueba que estara disponible por unos dias
DATABASE_URL=[]
```

# Ejecutar la aplicación

### Docker

```bash
$ yarn start-d
```

### Instalación manual
```bash
$ yarn install
```

> Nota: Puedes usar una base de datos local cambiando en el archivo `.env` la variable `DATABASE_URL`
``` DATABASE_URL=postgresql://username:password@localhost:5432/  ```
Y ejecutando el comando `prisma migrate dev --name init` 

## Running the app

```bash
# development
$ yarn dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
