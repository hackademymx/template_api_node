"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class saucers extends Model {
    static associate(models) {
      saucers.hasMany(models.orders);
    }
  }
  saucers.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "saucers",
    }
  );
  return saucers;
};
