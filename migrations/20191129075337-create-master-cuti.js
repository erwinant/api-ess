'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MasterCutis', {
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
      City: {
        type: Sequelize.STRING
      },
      Quota: {
        type: Sequelize.NUMBER
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
    return queryInterface.dropTable('MasterCutis');
  }
};