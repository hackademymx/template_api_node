"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    static associate(models) {
      orders.belongsTo(models.clients);
      orders.belongsTo(models.saucers);
    }
  }
  orders.init(
    {
      date: DataTypes.DATE,
      quantity: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      clientId: DataTypes.INTEGER,
      saucerId: DataTypes.INTEGER,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
