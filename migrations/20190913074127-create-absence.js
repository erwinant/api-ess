'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Absences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.NUMBER
      },
      RowStatus: {
        type: Sequelize.NUMBER
      },
      AbsentDate: {
        type: Sequelize.STRING
      },
      ClockIn: {
        type: Sequelize.STRING
      },
      ClockOut: {
        type: Sequelize.STRING
      },
      Long: {
        type: Sequelize.STRING
      },
      Lat: {
        type: Sequelize.STRING
      },
      Photo: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      EmployeeID: {
        type: Sequelize.NUMBER
      },
      ShiftID: {
        type: Sequelize.NUMBER
      },
      Notes: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Absences');
  }
};