"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sessions extends Model {
    static associate(models) {
      sessions.belongsTo(models.users);
    }
  }
  sessions.init(
    {
      refreshToken: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sessions",
    }
  );
  return sessions;
};
