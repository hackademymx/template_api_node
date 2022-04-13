require("dotenv").config(); // Módulo que carga variables de entorno desde un archivo .env a process.env

//Sustituir valores de host, user, name, password con los process.env una vez que tengamos el archivo .env con los valores a sustituir
module.exports = {
  PORT: process.env.PORT || 5000,
  DB: {
    PORT: process.env.DB_PORT || 5432,
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER,
    NAME: process.env.DB_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    DIALECT: "postgres",
    ENV: process.env.ENV || "development",
  },
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRESS_ACCESS_TOKEN: process.env.EXPIRESS_ACCESS_TOKEN,
  EXPIRESS_REFRESH_TOKEN: process.env.EXPIRESS_REFRESH_TOKEN,
};
