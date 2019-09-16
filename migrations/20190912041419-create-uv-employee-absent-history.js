'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('uv_EmployeeAbsentHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CiID: {
        type: Sequelize.NUMBER
      },
      CiRowStatus: {
        type: Sequelize.NUMBER
      },
      CiCheckTime: {
        type: Sequelize.STRING
      },
      CiAbsentType: {
        type: Sequelize.NUMBER
      },
      CiLong: {
        type: Sequelize.STRING
      },
      CiLat: {
        type: Sequelize.STRING
      },
      CiPhoto: {
        type: Sequelize.STRING
      },
      CiStatus: {
        type: Sequelize.STRING
      },
      CiEmployeeID: {
        type: Sequelize.NUMBER
      },
      CoID: {
        type: Sequelize.NUMBER
      },
      CoRowStatus: {
        type: Sequelize.NUMBER
      },
      CoCheckTime: {
        type: Sequelize.STRING
      },
      CoAbsentType: {
        type: Sequelize.NUMBER
      },
      CoLong: {
        type: Sequelize.STRING
      },
      CoLat: {
        type: Sequelize.STRING
      },
      CoPhoto: {
        type: Sequelize.STRING
      },
      CoStatus: {
        type: Sequelize.STRING
      },
      CoEmployeeID: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('uv_EmployeeAbsentHistories');
  }
};