'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MasterClaims', {
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
      Type: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      Amount: {
        type: Sequelize.NUMBER
      },
      ValidFrom: {
        type: Sequelize.STRING
      },
      ValidTo: {
        type: Sequelize.STRING
      },
      CreateDate: {
        type: Sequelize.DATE
      },
      CreateBy: {
        type: Sequelize.STRING
      },
      UpdateDate: {
        type: Sequelize.DATE
      },
      UpdateBy: {
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
    return queryInterface.dropTable('MasterClaims');
  }
};