"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clients extends Model {
    static associate(models) {
      clients.hasMany(models.orders);
    }
  }
  clients.init(
    {
      phone: DataTypes.STRING,
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "clients",
    }
  );
  return clients;
};
