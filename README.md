# API RESTAURANTE

_Este es un esqueleto básico de una REST API que crea servicios CRUD para clientes, platillos y órdenes de un restaurante_

## STACK

- Node js
- Postgresql con el ORM sequelize
- Express
- Otros paquetes (ver en el archivo package.json)

## PASOS PARA EJECUTAR EL PROYECTO 🚀

### Crear una base de datos con postgres

_Una vez que se crea una base de datos, los datos de nombre de la BD, user, password, sustituirlos en el archivo config en la propiedad DB_

### Crear un archivo .env en la raiz del proyecto

_En el archivo .env se agregan variables de entorno, ejemplo:_

```
DB_HOST="localhost"
DB_NAME="restaurant"
DB_USER="postgres"
DB_PASSWORD="password"
```

### Instalar las dependencias

```
npm install
```

### Ejecutar el proyecto

_Podemos ejecutar el script que ejecuta el proyecto con nodemon_

```
npm run dev
```

### Ejecutar las migraciones

_Para ejecutar las migraciones necesitamos tener ya creada la base de datos, sustituir el user, password,host(localhost) para desarrollo, puerto(por default maneja el 5432), nombre de la base de datos en la siguiente línea_

```
npx sequelize db:migrate --url "postgres://user:password@localhost:5432/bd_name"
```

### MANEJO DE DOCKER

_Para trabajar el contenedor de docker necesitamos tener los archivos de Dockerfile y docker-compose.yml_

### Construir el contenedor

```
docker-compose -f docker-compose.yml up --build
```

_Una vez se construiye, solo tendriamos que estar levantando el mismo de la siguiente manera_

```
docker-compose -f docker-compose.yml up
```

### Ejecutar migraciones en el contenedor

_Cuando se trabaja con contenedores las migraciones se tendrán que ejecutar desde el root del contendor, para ello tendríamos que entrar a root_

```
docker exec -ti -u root [container id] /bin/bash
```

_Una vez que estamos en root del contenedor ejecutamos las migraciones_

```
npx sequelize db:migrate --url "postgres://user:password@postgres:5432/bd_name"
```
