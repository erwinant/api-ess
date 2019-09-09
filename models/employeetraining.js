'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeTraining = sequelize.define('EmployeeTraining', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Code: DataTypes.STRING,
    Text: DataTypes.STRING,
    Value: DataTypes.STRING,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeTraining.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeTraining;
};