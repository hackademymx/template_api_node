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
