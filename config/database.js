const { DB } = require("./config");

const { Sequelize } = require("sequelize");

const db = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { db };
