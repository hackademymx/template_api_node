"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "clients",
          key: "id",
        },
      },
      saucerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "saucers",
          key: "id",
        },
      },
      statusDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
