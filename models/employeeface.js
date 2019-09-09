'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeFace = sequelize.define('EmployeeFace', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    Filename: DataTypes.STRING,
    EmployeeID: DataTypes.NUMBER,
    CreateDate: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    UpdateDate: DataTypes.STRING,
    UpdateBy: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  EmployeeFace.associate = function (models) {
    // associations can be defined here
  };
  return EmployeeFace;
};